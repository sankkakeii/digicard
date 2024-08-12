import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Plus, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import NotFound from '@/components/NotFound';
import Spinner from '@/components/Spinner';
import SubscriptionModal from '@/components/SubscriptionModal';

const ProfilePage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState(null);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        setLoading(true);
        console.log('Router query:', router.query);
        console.log('User ID:', id);

        // Simulate fetching user data
        const fetchUser = async () => {
            setUser({
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '123-456-7890',
                avatar: '/api/placeholder/400/400',
            });
        };

        // Simulate fetching user cards
        const fetchCards = async () => {
            setCards([
                { id: '1', title: 'Business Card 1', type: 'Professional', image: '/digicard-business.png' },
                { id: '2', title: 'Business Card 2', type: 'Personal', image: '/digicard-business.png' },
                { id: '3', title: 'Business Card 3', type: 'Networking', image: '/digicard-business.png' },
            ]);
        };

        fetchUser();
        fetchCards().finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <Spinner />;
    }

    if (!user) {
        return <NotFound />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-xl rounded-3xl p-8 mb-8"
                >
                    <div className="flex items-center space-x-8">
                        <Avatar className="w-32 h-32">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-4xl font-bold mb-4 text-gray-800">{user.name}</h1>
                            <p className="text-gray-600 flex items-center mb-2">
                                <Mail className="mr-2" size={18} /> {user.email}
                            </p>
                            <p className="text-gray-600 flex items-center">
                                <Phone className="mr-2" size={18} /> {user.phone}
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-semibold text-gray-800">My Cards</h2>
                    <div className="flex space-x-4">
                        <Link href={`/create-card?userId=${id}`} passHref>
                            <Button variant="default" className="flex items-center">
                                <Plus className="mr-2" size={18} /> Add New Card
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            onClick={() => setIsModalVisible(true)}
                            className="flex items-center"
                        >
                            <CreditCard className="mr-2" size={18} /> Upgrade Plan
                        </Button>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                                <CardHeader className="p-0">
                                    <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
                                </CardHeader>
                                <CardContent className="p-6">
                                    <CardTitle className="text-xl mb-2">{card.title}</CardTitle>
                                    <p className="text-gray-600 mb-4">Type: {card.type}</p>
                                    <Link href={`/cards/${'nita-lang'}`} passHref>
                                        <Button variant="link" className="p-0">View Details</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <SubscriptionModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
        </div>
    );
};

export default ProfilePage;
