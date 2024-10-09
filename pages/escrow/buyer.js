// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import MilestoneUpdateModal from '@/components/MilestoneUpdateModal';

// const BuyerPage = () => {
//     const [milestones, setMilestones] = useState([
//         { description: 'Initial Deposit', dueDate: new Date(), status: 'Pending' },
//         { description: 'Product Shipment', dueDate: new Date(), status: 'Pending' },
//     ]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedMilestone, setSelectedMilestone] = useState(null);

//     const handleMilestoneChange = (index, field, value) => {
//         const updatedMilestones = milestones.map((milestone, i) =>
//             i === index ? { ...milestone, [field]: value } : milestone
//         );
//         setMilestones(updatedMilestones);
//     };

//     const openModal = (milestone) => {
//         setSelectedMilestone(milestone);
//         setIsModalOpen(true);
//     };

//     const handleUpdate = (field, value) => {
//         setSelectedMilestone((prev) => ({ ...prev, [field]: value }));
//     };

//     const closeModal = () => {
//         setMilestones(milestones.map((milestone) => 
//             milestone.description === selectedMilestone.description ? selectedMilestone : milestone
//         ));
//         setIsModalOpen(false);
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-8">
//             <div className="max-w-7xl mx-auto">
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                     className="bg-white shadow-xl rounded-3xl p-8 mb-8"
//                 >
//                     <h1 className="text-3xl font-bold mb-6 text-gray-800">Buyer Project Tracking</h1>
//                     {milestones.map((milestone, index) => (
//                         <div key={index} className="flex flex-col md:flex-row items-center space-x-4 mb-4">
//                             <Button variant="outline" onClick={() => openModal(milestone)}>
//                                 {milestone.description} - {milestone.status}
//                             </Button>
//                         </div>
//                     ))}
//                 </motion.div>
//             </div>

//             {selectedMilestone && (
//                 <MilestoneUpdateModal
//                     isOpen={isModalOpen}
//                     closeModal={closeModal}
//                     milestone={selectedMilestone}
//                     handleUpdate={handleUpdate}
//                 />
//             )}
//         </div>
//     );
// };

// export default BuyerPage;








import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import HeaderComponent from '@/components/HeaderComponent';
import Spinner from '@/components/Spinner';
import NotFound from '@/components/NotFound';

const BuyersPage = () => {
    const router = useRouter();
    const { buyerId } = router.query; // Get buyerId from the URL
    const [transactions, setTransactions] = useState([]); // Use an array to store multiple transactions
    const [loading, setLoading] = useState(true);
    const [escrowInitiated, setEscrowInitiated] = useState(false); // To check if escrow was initiated

    useEffect(() => {
        if (buyerId) {
            // Fetch transaction details when buyerId is available
            fetchTransactionData(buyerId);
        }
    }, [buyerId]);

    const fetchTransactionData = async (id) => {
        try {
            const response = await fetch('/api/escrow/get-by-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }), // Send buyerId as payload
            });
            const data = await response.json();

            console.log('Transaction data:', data);

            if (data.success) {
                setTransactions(data.data); // Set transactions as an array
            } else {
                console.error('Failed to fetch transactions:', data.message);
                setTransactions([]);
            }
        } catch (error) {
            console.error('Error fetching transaction data:', error);
            setTransactions([]);
        } finally {
            setLoading(false);
        }
    };

    const initiateEscrow = (transaction) => {
        const buyerId = JSON.parse(localStorage.getItem('osunUserData')).id; // Get buyerId from localStorage
        const sellerId = transaction.business_card_id; // Get sellerId from transaction

        // Create the transaction payload
        const transactionPayload = {
            buyerId,
            sellerId,
            product: {
                name: transaction.product.name,
                description: transaction.product.description,
                category: transaction.product.category,
            },
            amount: transaction.amount, // Use the amount from the transaction
            currency: 'NGN', // Assuming default currency is NGN
            transactionType: 'physical', // Set a default transaction type
        };

        console.log('transactionPayload', transactionPayload);

        // Make API call to initiate escrow transaction
        fetch('/api/escrow/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transactionPayload),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setEscrowInitiated(true); // Mark escrow as initiated
                    // Optionally, you can provide feedback to the user
                    alert('Escrow transaction initiated successfully!');
                } else {
                    console.error('Error initiating escrow:', data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    if (loading) {
        return <Spinner />;
    }

    if (transactions.length === 0) {
        return <NotFound />;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto mt-8">
                <HeaderComponent title="Escrow System" />
                {transactions.map((transaction, index) => (
                    <Card key={index} className="shadow-lg border border-gray-200 transition duration-300 hover:shadow-xl mb-6">
                        <CardHeader>
                            <h2 className="text-2xl font-bold text-gray-800">{transaction.product.name}</h2>
                            <p className="text-gray-600">Price: ₦{transaction.amount}</p>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-4 mb-6">
                                <div>
                                    <p className="text-sm text-gray-600">{transaction.product.description}</p>
                                    <p className="text-sm font-semibold mt-2 text-gray-700">Category: {transaction.product.category}</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col items-center">
                            <Button onClick={() => initiateEscrow(transaction)} className="w-full mb-4 bg-blue-600 hover:bg-blue-700 transition duration-200">
                                View
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default BuyersPage;
