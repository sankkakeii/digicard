import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Check, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import HeaderComponent from '@/components/HeaderComponent';
import Spinner from '@/components/Spinner';
import NotFound from '@/components/NotFound';

const EscrowPurchasePage = () => {
    const router = useRouter();
    const { productId } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [escrowStatus, setEscrowStatus] = useState('pending');
    const [milestones, setMilestones] = useState([
        { id: 1, name: 'Payment Received', completed: false },
        { id: 2, name: 'Product Shipped', completed: false },
        { id: 3, name: 'Product Received', completed: false },
        { id: 4, name: 'Buyer Confirms Satisfaction', completed: false },
    ]);

    useEffect(() => {
        if (productId) {
            // Fetch product details
            fetch(`/api/backed/products/${productId}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
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
    }, [productId]);

    const initiateEscrow = () => {
        // Simulating escrow initiation
        setEscrowStatus('active');
        updateMilestone(1);
    };

    const updateMilestone = (milestoneId) => {
        setMilestones(prevMilestones =>
            prevMilestones.map(milestone =>
                milestone.id === milestoneId ? { ...milestone, completed: true } : milestone
            )
        );

        // Check if all milestones are completed
        const allCompleted = milestones.every(milestone => milestone.completed);
        if (allCompleted) {
            setEscrowStatus('completed');
        }
    };

    const calculateProgress = () => {
        const completedMilestones = milestones.filter(m => m.completed).length;
        return (completedMilestones / milestones.length) * 100;
    };

    if (loading) {
        return <Spinner />;
    }

    if (!product) {
        return <NotFound />;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto mt-8">
            <HeaderComponent title="Escrow System" />
                <Card>
                    <CardHeader>
                        <h2 className="text-2xl font-bold">{product.name}</h2>
                        <p className="text-gray-600">Price: ₦{product.amount}</p>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4 mb-6">
                            <Image
                                src={product.images[0]}
                                width={100}
                                height={100}
                                alt={product.name}
                                className="rounded-lg"
                            />
                            <div>
                                <p className="text-sm text-gray-600">{product.description}</p>
                                <p className="text-sm font-semibold mt-2">Category: {product.category}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Escrow Status</h3>
                            <div className="flex items-center space-x-2">
                                {escrowStatus === 'pending' && <AlertCircle className="text-yellow-500" />}
                                {escrowStatus === 'active' && <Check className="text-blue-500" />}
                                {escrowStatus === 'completed' && <Check className="text-green-500" />}
                                <span className="capitalize">{escrowStatus}</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Milestones</h3>
                            <Progress value={calculateProgress()} className="mb-2" />
                            <ul className="space-y-2">
                                {milestones.map((milestone) => (
                                    <li key={milestone.id} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={milestone.completed}
                                            onChange={() => updateMilestone(milestone.id)}
                                            disabled={escrowStatus !== 'active'}
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                        />
                                        <span className={milestone.completed ? 'line-through' : ''}>{milestone.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter>
                        {escrowStatus === 'pending' && (
                            <Button onClick={initiateEscrow} className="w-full">
                                Initiate Escrow Payment (₦{product.amount})
                            </Button>
                        )}
                        {escrowStatus === 'active' && (
                            <p className="text-sm text-gray-600">
                                Escrow is active. Complete the milestones to release the funds.
                            </p>
                        )}
                        {escrowStatus === 'completed' && (
                            <p className="text-green-600 font-semibold">
                                Transaction completed successfully!
                            </p>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default EscrowPurchasePage;