import NotFound from '@/components/NotFound';
import Spinner from '@/components/Spinner';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ProductDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`/api/backed/products/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        setProduct(data.product);
                    } else {
                        console.log(data.message);
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
        return <NotFound />
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <section className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
            <div className="flex justify-between items-center mb-6 bg-gray-800 rounded-lg hover:shadow-xl text-white z-50 p-6">
                <h1 className="text-3xl font-semibold">Market Your Business Here</h1>
                <ul>
                    <li className="hover:text-green-500"><Link href={'/'}>Home</Link> </li>
                </ul>
            </div>
                <div className="flex flex-wrap items-center mx-auto max-w-7xl">
                    <div className="w-full lg:max-w-lg lg:w-1/2 rounded-xl">
                        <div>
                            <div className="relative w-full max-w-lg">
                                <div className="absolute top-0 rounded-full bg-violet-300 -left-4 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                                <div className="absolute rounded-full bg-fuchsia-300 -bottom-24 right-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                                <div className="relative">
                                    <Image
                                        src={'/bgp.jpg'}
                                        alt="hero"
                                        className="object-cover object-center mx-auto rounded-lg shadow-2xl"
                                        width={400}
                                        height={400}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start mt-12 mb-16 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0">
                        <span className="mb-8 text-xs font-bold tracking-widest text-blue-600 uppercase">Your tagline</span>
                        <h1 className="mb-8 text-4xl font-bold leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-5xl">{product.name}</h1>
                        <p className="mb-8 text-base leading-relaxed text-left text-gray-500">{product.description}</p>
                        <div className="mt-0 lg:mt-6 max-w-7xl sm:flex">
                            <div className="mt-3 rounded-lg sm:mt-0">
                                <button className="items-center block px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Buy Now</button>
                            </div>
                            <div className="mt-3 rounded-lg sm:mt-0 sm:ml-3">
                                <button className="items-center block px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">See features</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="w-full p-4 flex flex-col items-center lg:px-20">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center mb-8 w-full max-w-4xl">
                    <Image
                        // src={product.imageUrl}
                        src={'/bgp.jpg'}
                        width={400}
                        height={400}
                        alt={product.name}
                        className="object-contain mb-4 mx-auto rounded-lg shadow-2xl"
                    />
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
                    <p className="text-gray-600 mb-4">${product.price}</p>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                    >
                        Buy Now
                    </a>
                </div>
            </div>
        </div>
    );
}
