import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import NotFound from '@/components/NotFound';
import { v4 as uuidv4 } from 'uuid';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function PurchasePage() {
    const router = useRouter();
    const { productId } = router.query; // Fetch productId from query string
    const [product, setProduct] = useState(null);
    const [businessCard, setBusinessCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trackingId, setTrackingId] = useState('');

    useEffect(() => {
        if (productId) {
            // Fetch product data based on productId
            fetch(`/api/backed/products/${productId}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        setProduct(data.product);
                        // Generate tracking ID
                        const generatedTrackingId = uuidv4();
                        setTrackingId(generatedTrackingId);

                        // Fetch business card using business_card_id from product
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
    }, [productId]); // Ensure useEffect runs when productId changes

    if (loading) {
        return <Spinner />;
    }

    if (!product) {
        return <NotFound />;
    }

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

                            {/* Call to Action Buttons */}
                            <button className="w-full border bg-green-500/60 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold mt-4 hover:bg-gray-100 shadow-md">
                                Complete Purchase
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
