import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import HeaderComponent from '@/components/HeaderComponent';
import Spinner from '@/components/Spinner';
import NotFound from '@/components/NotFound';

const ViewEscrowPage = () => {
    const router = useRouter();
    const [buyerId, setBuyerId] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchTransactionData = async () => {
        if (!buyerId) return; // Do not proceed if no buyerId is provided

        setLoading(true);
        setError('');
        try {
            const response = await fetch('/api/escrow/get-by-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: buyerId }), // Send buyerId as payload
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
            setError('Error fetching transaction data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleViewTransactions = () => {
        fetchTransactionData();
    };

    const handleApproveMilestone = async (transactionId, milestoneId, actor) => {
        // Ensure the buyer can only approve buyer milestones
        if (actor !== 'buyer') {
            alert("You are not authorized to approve this milestone.");
            return;
        }

        try {
            const response = await fetch('/api/escrow/update-milestone', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    transactionId,
                    milestoneId,
                    status: 'completed',
                    action: 'approved',
                }),
            });

            const data = await response.json();
            if (data.success) {
                // Update the transactions state to reflect the change
                setTransactions((prevTransactions) =>
                    prevTransactions.map((transaction) =>
                        transaction._id === transactionId
                            ? {
                                ...transaction,
                                milestones: transaction.milestones.map((milestone) =>
                                    milestone._id === milestoneId ? { ...milestone, status: 'completed' } : milestone
                                ),
                            }
                            : transaction
                    )
                );
            } else {
                console.error('Failed to approve milestone:', data.message);
            }
        } catch (error) {
            console.error('Error approving milestone:', error);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto mt-8">
                <HeaderComponent title="View Escrow Transactions" />

                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Enter Buyer ID"
                        value={buyerId}
                        onChange={(e) => setBuyerId(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full mb-4"
                    />
                    <Button
                        onClick={handleViewTransactions}
                        className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200"
                    >
                        View Transactions
                    </Button>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                {transactions.length === 0 && !error && <NotFound />}

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
                                    <p className="text-sm mt-2 text-gray-600">Status: {transaction.status}</p>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold mt-4">Milestones</h3>
                            {transaction.milestones.length === 0 ? (
                                <p className="text-gray-500">No milestones available for this transaction.</p>
                            ) : (
                                transaction.milestones.map((milestone) => (
                                    <div
                                        key={milestone._id}
                                        className={`border border-gray-300 rounded-md p-4 mb-4 ${milestone.status === 'completed' ? 'bg-green-100 border-green-300' : ''
                                            }`}
                                    >
                                        <h4 className="text-md font-bold">
                                            {milestone.title}{' '}
                                            {milestone.status === 'completed' && (
                                                <span className="text-green-600 ml-2">✔️</span>
                                            )}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {milestone.description || 'No description provided.'}
                                        </p>
                                        <p className={`text-sm font-semibold mt-2 ${milestone.status === 'completed' ? 'text-green-700' : 'text-gray-700'}`}>
                                            Status: {milestone.status}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Due Date:{' '}
                                            {milestone.dueDate ? new Date(milestone.dueDate).toLocaleDateString() : 'Not set'}
                                        </p>
                                        {milestone.actor === 'buyer' && milestone.status !== 'completed' && (
                                            <Button
                                                onClick={() =>
                                                    handleApproveMilestone(
                                                        transaction._id,
                                                        milestone._id,
                                                        milestone.actor
                                                    )
                                                }
                                                className="mt-2 bg-green-600 text-white hover:bg-green-700 transition duration-200"
                                            >
                                                Approve
                                            </Button>
                                        )}
                                    </div>
                                ))
                            )}
                        </CardContent>
                        <CardFooter className="flex flex-col items-center">
                            <Button className="w-full mb-4 bg-gray-600 text-white hover:bg-gray-500 transition duration-200">
                                View Details
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ViewEscrowPage;
