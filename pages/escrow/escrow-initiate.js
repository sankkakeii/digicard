import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import HeaderComponent from '@/components/HeaderComponent';
import Spinner from '@/components/Spinner';
import NotFound from '@/components/NotFound';

const EscrowPurchasePage = () => {
    const router = useRouter();
    const { productId } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [transactionType, setTransactionType] = useState('physical'); // Default transaction type
    const [escrowInitiated, setEscrowInitiated] = useState(false); // To check if escrow was initiated

    // New state for buyer's name and phone number
    const [buyerEmail, setBuyerEmail] = useState('');
    const [buyerPhone, setBuyerPhone] = useState('');
    const [sellerEmail, setSellerEmail] = useState('');

    const [userId, setUserId] = useState(null);

    // get user data from local storage
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('osunUserData'));
        if (userData) {
            setUserId(userData.id);
        }
    }, []);

    useEffect(() => {
        if (productId) {
            // Fetch product details
            fetch(`/api/backed/products/${productId}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        console.log(data.product)
                        setProduct(data.product);
                    } else {
                        setProduct(null);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching product data:', error);
                    setProduct(null);
                    setLoading(false);
                });
        }

        // fetch seller email from local storage
        const sellerEmail = JSON.parse(localStorage.getItem('osunUserData')).email;
        setSellerEmail(sellerEmail);
    }, [productId]);

    const initiateEscrow = () => {
        // Convert amount string to number
        let amountConverted;
        const amountArray = product.amount.split(',');
        if (amountArray.length === 3) {
            amountConverted = Number(amountArray[0] + amountArray[1] + amountArray[2]);
        }


        // Create the transaction payload with buyer name and phone number
        const transactionPayload = {
            buyerEmail, // Added buyer email
            buyerPhone, // Added buyer phone
            sellerId: product.creator_id,
            sellerEmail,
            buyerId: buyerEmail,
            product: {
                name: product.name,
                description: product.description,
                category: product.category,
            },
            amount: Number(product.amount),
            currency: 'NGN', // Assuming default currency is NGN
            transactionType,
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
                } else {
                    console.error('Error initiating escrow:', data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleRedirect = () => {
        router.push(`/escrow/view-escrow`);
    };

    if (loading) {
        return <Spinner />;
    }

    if (!product) {
        return <NotFound />;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto mt-8">
                <HeaderComponent title="Escrow System" />
                <Card className="shadow-lg border border-gray-200 transition duration-300 hover:shadow-xl">
                    <CardHeader>
                        <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
                        <p className="text-gray-600">Price: ₦{product.amount}</p>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4 mb-6">
                            <Image
                                src={product.images[0]}
                                width={120}
                                height={120}
                                alt={product.name}
                                className="rounded-lg shadow-md"
                            />
                            <div>
                                <p className="text-sm text-gray-600">{product.description}</p>
                                <p className="text-sm font-semibold mt-2 text-gray-700">Category: {product.category}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Select Transaction Type</h3>
                            <select
                                value={transactionType}
                                onChange={(e) => setTransactionType(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            >
                                <option value="physical">Physical Product</option>
                                <option value="service">Service</option>
                                <option value="digital">Digital Product</option>
                                <option value="subscription">Subscription</option>
                            </select>
                        </div>

                        {/* Buyer Email and Phone Number Input Fields */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Buyer Information</h3>
                            <p className="text-gray-600 mb-2">
                                Please provide your email and phone number to receive notifications regarding your escrow transaction.
                            </p>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={buyerEmail}
                                onChange={(e) => setBuyerEmail(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 w-full mb-4"
                                required
                            />
                            <input
                                type="phone"
                                placeholder="Enter your phone number"
                                value={buyerPhone}
                                onChange={(e) => setBuyerPhone(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 w-full"
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center">
                        {!escrowInitiated ? (
                            <Button onClick={initiateEscrow} className="w-full mb-4 bg-blue-600 hover:bg-blue-700 transition duration-200">
                                Initiate Escrow Payment (₦{product.amount})
                            </Button>
                        ) : (
                            <p className="text-green-600 font-semibold mb-4">
                                Escrow transaction initiated successfully!
                            </p>
                        )}
                        <Button onClick={handleRedirect} className="w-full bg-gray-800 text-white hover:bg-gray-700 transition duration-200">
                            View Transaction
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default EscrowPurchasePage;
