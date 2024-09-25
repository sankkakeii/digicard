import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import NotFound from '@/components/NotFound';
import { v4 as uuidv4 } from 'uuid';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Copy } from 'lucide-react';

export default function PurchasePage() {
    const router = useRouter();
    const { productId } = router.query;
    const [product, setProduct] = useState(null);
    const [businessCard, setBusinessCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trackingId, setTrackingId] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [sendingMessage, setSendingMessage] = useState(false);

    useEffect(() => {
        if (productId) {
            fetch(`/api/backed/products/${productId}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        setProduct(data.product);
                        setTrackingId(uuidv4());

                        if (data.product.business_card_id) {
                            fetch(`/api/backed/cards/get-card?card_id=${data.product.business_card_id}`)
                                .then((response) => response.json())
                                .then((cardData) => {
                                    if (cardData.success) {
                                        setBusinessCard(cardData.businessCard);
                                    } else {
                                        setBusinessCard(null);
                                    }
                                })
                                .catch((error) => {
                                    console.error('Error fetching business card:', error);
                                    setBusinessCard(null);
                                });
                        }
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

    const sendMessage = () => {
        if (!message.trim()) return;
        setSendingMessage(true);

        fetch('/api/backed/messaging/create-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
                productId,
                productUrl: window.location.href,  // Current product URL
                businessCreatorId: businessCard.creator_id,  // Assuming product contains this info
                trackingId: trackingId  // Tracking ID as the sender identifier
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setMessages([...messages, { text: message, timestamp: new Date().toLocaleString() }]);
                    setMessage('');
                } else {
                    console.error('Failed to send message:', data.message);
                }
                setSendingMessage(false);
            })
            .catch((error) => {
                console.error('Error sending message:', error);
                setSendingMessage(false);
            });
    };



    const handleShare = () => {
        const productURL = `${window.location.origin}/product/${productId}`;
        navigator.clipboard.writeText(productURL)
            .then(() => {
                alert('Product URL copied to clipboard!');
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });
    };

    const getSocialMediaIcon = (platform) => {
        switch (platform) {
            case 'Facebook':
                return <Facebook size={20} />;
            case 'Twitter':
                return <Twitter size={20} />;
            case 'Instagram':
                return <Instagram size={20} />;
            case 'LinkedIn':
                return <Linkedin size={20} />;
            case 'YouTube':
                return <Youtube size={20} />;
            default:
                return null;
        }
    };

    if (loading) {
        return <Spinner />;
    }

    if (!product) {
        return <NotFound />;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <section className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
                <div className="flex justify-between items-center mb-6 bg-gray-900 rounded-lg shadow-md text-white p-6">
                    <h1 className="text-3xl font-semibold">Complete Purchase</h1>
                    <ul className="flex gap-4 items-center">
                        <li className="hover:text-green-400">
                            <Link href="/">Home</Link>
                        </li>
                        <li className="hover:text-green-400">
                            <Link href="/directories/products">Products</Link>
                        </li>
                    </ul>
                </div>

                <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Product Information */}
                        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                            <h2 className="text-2xl font-bold mb-2 text-gray-800">{product.name}</h2>
                            <p className="text-gray-600 mb-4 font-semibold">Price: ₦{product.amount}</p>
                            <p className="text-gray-600 mb-4">Category: {product.category}</p>
                            <p className="text-gray-700">{product.description}</p>
                            <button
                                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mt-4"
                                onClick={handleShare}
                            >
                                <Copy size={20} />
                                Share Product
                            </button>
                        </div>

                        {/* Purchase Info */}
                        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800">Order Details</h3>
                            <p className="text-gray-700 mb-4">
                                Tracking ID: <strong>{trackingId}</strong>
                            </p>

                            {/* Contact Information */}
                            {businessCard && (
                                <>
                                    <h4 className="text-xl font-semibold mb-2 text-gray-800">Contact Seller</h4>
                                    <p className="text-gray-600 mb-2">
                                        Phone: <a href={`tel:${businessCard.phone}`} className="text-blue-500">{businessCard.phone}</a>
                                    </p>
                                    <p className="text-gray-600 mb-4">
                                        Email: <a href={`mailto:${businessCard.email}`} className="text-blue-500">{businessCard.email}</a>
                                    </p>

                                    {/* Social Media */}
                                    <h4 className="text-xl font-semibold mb-2 text-gray-800">Follow on Social Media</h4>
                                    <div className="flex gap-4">
                                        {businessCard.social_media.map((media) => (
                                            <a
                                                key={media.platform}
                                                href={media.url}
                                                className="text-gray-700 hover:text-blue-600 flex items-center gap-2"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {getSocialMediaIcon(media.platform)}
                                                {media.platform}
                                            </a>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Message Seller */}
                            <div className="mt-6">
                                <h4 className="text-xl font-semibold mb-2 text-gray-800">Message the Seller</h4>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    rows="4"
                                    placeholder="Write a message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <button
                                    className={`w-full bg-green-500 text-white py-2 rounded-md mt-2 hover:bg-green-600 transition ${sendingMessage && 'opacity-50 cursor-not-allowed'
                                        }`}
                                    onClick={sendMessage}
                                    disabled={sendingMessage}
                                >
                                    {sendingMessage ? 'Sending...' : 'Send Message'}
                                </button>

                                <div className="mt-4">
                                    <h4 className="text-lg font-semibold text-gray-800">Message History</h4>
                                    {messages.length > 0 ? (
                                        <ul className="mt-2 space-y-2">
                                            {messages.map((msg, index) => (
                                                <li key={index} className="bg-gray-100 p-2 rounded-md">
                                                    <p className="text-gray-700">{msg.text}</p>
                                                    <span className="text-xs text-gray-500">{msg.timestamp}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-600">No messages yet.</p>
                                    )}
                                </div>
                            </div>

                            {/* Call to Action Button */}
                            <button className="w-full bg-green-500/60 text-white py-3 rounded-lg font-semibold mt-4 hover:bg-green-600 shadow-md">
                                Complete Purchase
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
