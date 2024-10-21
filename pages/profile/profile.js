import Image from "next/legacy/image";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import HeaderComponent from "@/components/HeaderComponent";
import TransactionModal from "@/components/ProfileTransactionModal";

export default function ProfilePage() {
    const [activeSection, setActiveSection] = useState('cards');
    const [userData, setUserData] = useState(null);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscriptionData, setSubscriptionData] = useState(null);
    const [reference, setReference] = useState(null);
    const [showSubscriptionMessage, setShowSubscriptionMessage] = useState(false);
    const [messages, setMessages] = useState([]);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [loadingTransactions, setLoadingTransactions] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('osunUserData');
        if (!user) {
            setUserData(null);
            return;
        }

        const parsedUser = JSON.parse(user);
        setUserData(parsedUser);
        setIsSubscribed(parsedUser.is_subscribed);

        if (parsedUser && parsedUser.id) {
            fetchCards(parsedUser.id);
            fetchMessages(parsedUser.id);  // Fetch messages for the user
        }
    }, []);

    useEffect(() => {
        if (showSubscriptionMessage) {
            const timer = setTimeout(() => {
                setShowSubscriptionMessage(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showSubscriptionMessage]);

    useEffect(() => {
        if (reference) {
            localStorage.setItem('reference', reference);
        }
    }, [reference]);

    useEffect(() => {
        if (activeSection === 'transactions' && userData?.id) {
            fetchTransactions(userData.id);
        }
    }, [activeSection, userData]);


    const handleViewTransaction = (transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };




    const handleUpdateMilestone = async (transactionId, milestoneId, sellerId) => {
        try {
            const response = await fetch('/api/escrow/seller-update-milestone', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sellerId,
                    transactionId,
                    milestoneId,
                    status: 'completed',
                    action: 'marked by seller',
                }),
            });

            const result = await response.json();
            if (result.success) {
                setSelectedTransaction((prevTransaction) => ({
                    ...prevTransaction,
                    milestones: prevTransaction.milestones.map((milestone) =>
                        milestone._id === milestoneId ? { ...milestone, status: 'completed' } : milestone
                    ),
                }));
            }
        } catch (error) {
            console.error('Error updating milestone:', error);
        }
    };

    const fetchTransactions = async (userId) => {
        setLoadingTransactions(true);
        try {
            const response = await fetch(`/api/escrow/transactions-type-id/${userId}`);
            console.log('here')
            const result = await response.json();

            if (result.success) {
                setTransactions(result.data);
            } else {
                setTransactions([]);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoadingTransactions(false);
        }
    };

    const fetchCards = async (creatorId) => {
        try {
            const response = await fetch(`/api/backed/cards/get-all-byid?creator_id=${creatorId}`);
            const result = await response.json();

            if (result.success) {
                setCards(result.businessCards);
            } else {
                setCards([]);
            }
        } catch (error) {
            console.error('Error fetching cards:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async (creatorId) => {
        setLoadingMessages(true);
        try {
            const response = await fetch(`/api/backed/messaging/get-messages?businessCreatorId=${creatorId}`);
            const result = await response.json();

            if (result.success) {
                setMessages(result.messages);
            } else {
                setMessages([]);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoadingMessages(false);
        }
    };

    const handleAddCard = () => {
        if (cards.length === 0) {
            router.push('/create-card');
        } else {
            if (isSubscribed) {
                router.push('/create-card');
            } else {
                setShowSubscriptionMessage(true);
            }
        }
    };

    const handleSubscribe = async () => {
        const reference = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        setReference(reference);

        try {
            const response = await fetch('/api/backed/subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customer_email: userData.email,
                    customer_phone: userData.phone,
                    amount: 1500,
                    reference: reference,
                    frequency: 'monthly',
                }),
            });

            const result = await response.json();

            if (result.success && result.data.transaction.authorization_url) {
                setSubscriptionData(result);
                router.push(result.data.transaction.authorization_url);
            } else {
                console.error('Subscription failed:', result.message);
            }
        } catch (error) {
            console.error('Error during subscription:', error);
        }
    };

    const renderSectionContent = () => {
        switch (activeSection) {
            case 'cards':
                return (
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">My Cards</h2>
                            <button
                                onClick={handleAddCard}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
                            >
                                Add Card
                            </button>
                        </div>
                        {loading ? (
                            <p>Loading cards...</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {cards.length > 0 ? (
                                    cards.map((card) => (
                                        <div key={card.id} className="border rounded-lg bg-white shadow-md">
                                            <Image
                                                src={`data:image/jpeg;base64,${card.logo}`}
                                                width={300}
                                                height={300}
                                                alt="Card Image"
                                                className="object-cover object-center w-full mb-4 rounded-lg"
                                            />
                                            <div className="p-4">
                                                <h1 className="mb-2 text-xl font-semibold leading-none tracking-tighter text-neutral-600">{card.first_name} {card.last_name}</h1>
                                                <p className="mx-auto text-base font-medium leading-relaxed text-gray-500">{card.job_title}</p>
                                                <a
                                                    onClick={() => router.push(`/cards/${card.card_url}`)}
                                                    className="text-blue-600 cursor-pointer mt-2 block"
                                                >
                                                    View Details
                                                </a>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No cards available.</p>
                                )}
                            </div>
                        )}
                    </div>
                );

            case 'messages':
                return (
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Messages</h2>
                        {loadingMessages ? (
                            <p>Loading messages...</p>
                        ) : (
                            <div>
                                {messages.length > 0 ? (
                                    <ul className="space-y-4">
                                        {messages.map((message) => (
                                            <li key={message.id} className="p-4 border rounded-lg shadow-sm bg-white">
                                                <p className="text-gray-800">{message.message}</p>
                                                <p className="text-sm text-gray-500">Product ID: {message.product_id}</p>
                                                <p className="text-sm text-gray-500">Sent at: {new Date(message.created_at).toLocaleString()}</p>
                                                <Link href={`/products/${message.product_id}`} className="text-blue-600 cursor-pointer mt-2 w-fit block hover:underline">View Product</Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No messages found.</p>
                                )}
                            </div>
                        )}
                    </div>
                );

            case 'others':
                return (
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Other Information</h2>
                        <p className="text-gray-600">Subscription: {isSubscribed ? 'Active' : 'Inactive'}</p>
                    </div>
                );

            case 'transactions':
                return (
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">My Transactions</h2>
                        {loadingTransactions ? (
                            <p>Loading transactions...</p>
                        ) : (
                            <div>
                                {transactions.length > 0 ? (
                                    <ul className="space-y-4">
                                        {transactions.map((transaction) => (
                                            <li key={transaction.id} className="p-4 border rounded-lg shadow-sm bg-white">
                                                <p className="text-gray-800">Product: {transaction.product.name}</p>
                                                <p className="text-sm text-gray-800">Transaction ID: {transaction._id}</p>
                                                <p className="text-sm text-gray-500">Amount: {transaction.amount}</p>
                                                <p className="text-sm text-gray-500">Status: {transaction.status}</p>
                                                <p
                                                    onClick={() => handleViewTransaction(transaction)}
                                                    className="mt-2 text-blue-600 hover:underline hover:cursor-pointer"
                                                >
                                                    View Details
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No transactions found.</p>
                                )}
                            </div>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen w-full p-4 flex flex-col items-center lg:px-20">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center flex flex-col items-center justify-center mb-8 w-full max-w-4xl">
                <HeaderComponent title={`Welcome, `+ userData?.firstname} />
                <div className="mb-6">
                    {userData?.profile_picture ? (
                        <Image
                            src={`data:image/jpeg;base64,${userData?.profile_picture}`}
                            width={100}
                            height={100}
                            alt="Profile Picture"
                            className="rounded-full object-cover mb-4 border-4 border-blue-600 mx-auto"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mb-4 mx-auto">
                            <span className="text-2xl text-white">{userData?.firstname}</span>
                        </div>
                    )}
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{userData?.firstname} {userData?.lastname}</h1>
                <p className="text-lg text-gray-600 mb-4">{userData?.username}</p>
                <button
                    onClick={isSubscribed ? null : handleSubscribe}
                    className={`px-4 py-2 rounded-md ${isSubscribed ? 'bg-green-600 cursor-default' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                >
                    {isSubscribed ? 'Subscribed' : 'Subscribe Now'}
                </button>

                {!isSubscribed && showSubscriptionMessage && (
                    <div className="text-center mt-4 bg-red-100 rounded-lg shadow-lg p-4 w-fit">
                        <p className="text-lg text-red-600">Subscribe to get access to premium features.</p>
                    </div>
                )}
            </div>
            <div className="flex flex-col lg:flex-row w-full max-w-4xl">
                <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg p-6 mb-4 lg:mb-0">
                    <ul className="space-y-4">
                        <li
                            className={`cursor-pointer py-2 px-4 text-lg font-medium ${activeSection === 'cards' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                            onClick={() => setActiveSection('cards')}
                        >
                            My Cards
                        </li>
                        <li
                            className={`cursor-pointer py-2 px-4 text-lg font-medium ${activeSection === 'messages' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                            onClick={() => setActiveSection('messages')}
                        >
                            Messages
                        </li>
                        <li
                            className={`cursor-pointer py-2 px-4 text-lg font-medium ${activeSection === 'transactions' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                            onClick={() => setActiveSection('transactions')}
                        >
                            Transactions
                        </li>
                        <li
                            className={`cursor-pointer py-2 px-4 text-lg font-medium ${activeSection === 'others' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                            onClick={() => setActiveSection('others')}
                        >
                            Others
                        </li>
                    </ul>
                </div>
                <div className="w-full lg:w-3/4 bg-white rounded-xl shadow-lg p-6 lg:ml-4">
                    {renderSectionContent()}
                </div>

                           {/* Render the modal and pass transaction data */}
            {selectedTransaction && (
                <TransactionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    transaction={selectedTransaction}
                    handleUpdateMilestone={handleUpdateMilestone}
                />
            )}
            </div>

        </div>
    );
}
