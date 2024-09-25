import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/legacy/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import NotFound from '@/components/NotFound';
import HeaderComponent from '@/components/HeaderComponent';

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
                <HeaderComponent title={product.name} />

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
                                <h3 className="text-2xl font-bold mb-2">₦ {product.amount}</h3>

                                {/* Package selection buttons */}
                                {['Basic', 'Standard', 'Premium'].map((pkg) => (
                                    <button
                                        key={pkg}
                                        className={`px-4 py-2 mr-2 rounded ${selectedPackage === pkg ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
                                        onClick={() => setSelectedPackage(pkg)}
                                    >
                                        {pkg}
                                    </button>
                                ))}

                                {/* Category */}
                                {product.category && (
                                    <div className="mt-4">
                                        <h4 className="font-semibold">Category</h4>
                                        <p className="text-gray-700">{product.category}</p>
                                    </div>
                                )}

                                {/* Tags */}
                                {product.tags && product.tags.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="font-semibold">Tags</h4>
                                        <ul className="flex flex-wrap gap-2">
                                            {product.tags.map((tag, index) => (
                                                <li key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700">
                                                    {tag}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Product Description */}
                                <div className="mt-8">
                                    <h2 className="text-2xl font-bold mb-4">About this product</h2>
                                    <p className="text-gray-700 mb-4">{product.description}</p>
                                    <ul className="list-disc pl-5 text-gray-700 mb-4">
                                        <li>JPEG + PNG files (+background)</li>
                                        <li>Source file (Premium package)</li>
                                        <li>High-quality image 3000 x 4000 pixels 300 dpi</li>
                                    </ul>
                                    <p className="text-gray-700 font-semibold">
                                        Please send me a message before placing an order!
                                    </p>
                                </div>

                                <Link href={`/products/purchase?productId=${product.id}`}><button className="w-full bg-black text-white py-3 rounded-lg font-semibold mt-4">
                                    Proceed to Purchase
                                </button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
