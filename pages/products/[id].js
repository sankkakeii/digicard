import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/legacy/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import NotFound from '@/components/NotFound';

export default function ProductDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedPackage, setSelectedPackage] = useState('Basic');

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "gray" }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "gray" }}
                onClick={onClick}
            />
        );
    }

    useEffect(() => {
        if (id) {
            fetch(`/api/backed/products/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        // Assuming data.product.images contains the base64 images
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
    }, [id]);

    if (loading) {
        return <Spinner />;
    }

    if (!product) {
        return <NotFound />;
    }

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        vertical: true,
    };

    return (
        <div className="min-h-screen">
            <section className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
                <div className="flex justify-between items-center mb-6 bg-gray-800 rounded-lg hover:shadow-xl text-white z-50 p-6">
                    <h1 className="text-3xl font-semibold">{product.name}</h1>
                    <ul className="flex gap-2 items-center justify-center">
                        <li className="hover:text-green-500"><Link href={'/'}>Home</Link></li>
                        <li className="hover:text-green-500"><Link href={'/directories/products'}>Products</Link></li>
                        <li className="hover:text-green-500"><Link href={'/directories/business-cards'}>Cards</Link></li>
                    </ul>
                </div>

                <div className="container mx-auto p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Carousel */}
                        <div>
                            <Slider {...sliderSettings}>
                                {product.images.map((image, index) => (
                                    <div key={index} className="border rounded-lg">
                                        <Image
                                            src={`${image}`}
                                            width={500}
                                            height={500}
                                            alt={product.name}
                                            className="w-full rounded-lg mb-4"
                                        />
                                    </div>
                                ))}
                            </Slider>

                            {/* Thumbnails */}
                            <div className="grid grid-cols-5 gap-2 mt-10">
                                {product.images.map((image, index) => (
                                    <Image
                                        key={index}
                                        src={`${image}`}
                                        width={100}
                                        height={100}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full rounded"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex justify-between mb-4">
                                    {['Basic', 'Standard', 'Premium'].map((pkg) => (
                                        <button
                                            key={pkg}
                                            className={`px-4 py-2 rounded ${selectedPackage === pkg ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
                                            onClick={() => setSelectedPackage(pkg)}
                                        >
                                            {pkg}
                                        </button>
                                    ))}
                                </div>

                                <h3 className="text-2xl font-bold mb-2">₦ {product.amount}</h3>
                                <p className="text-sm text-gray-600 mb-4">Save up to 10% with Subscribe to Save</p>

                                <h4 className="font-semibold mb-2">{selectedPackage} Package</h4>
                                <ul className="space-y-2 mb-4">
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        7-day delivery
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        1 concept
                                    </li>
                                </ul>

                                <button className="w-full bg-black text-white py-3 rounded-lg font-semibold mb-4">
                                    BUY NOW
                                </button>

                                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold">
                                    Contact me
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">About this product</h2>
                        <p className="text-gray-700 mb-4">{product.description}</p>
                        <ul className="list-disc pl-5 text-gray-700 mb-4">
                            <li>You are free to choose the colors, background, and posture of the character(s)</li>
                            <li>JPEG + PNG files (+background)</li>
                            <li>Source file (Premium package)</li>
                            <li>100% Hand drawn digital illustration</li>
                            <li>High quality image 3000 x 4000 pixels 300 dpi</li>
                            <li>Easy & fast communication</li>
                        </ul>
                        <p className="text-gray-700 font-semibold">
                            Please send me a message before placing an order!
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
