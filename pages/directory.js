import NotFound from '@/components/NotFound';
import Spinner from '@/components/Spinner';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/backed/products/get-all')
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setProducts(data.products);
                } else {
                    console.log(data.message);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (products.length === 0) {
        return <NotFound />;
    }

    return (
        <div className="min-h-screen">
            <section className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
                <div className="flex justify-between items-center mb-6 bg-gray-800 rounded-lg hover:shadow-xl text-white z-50 p-6">
                    <h1 className="text-3xl font-semibold">Products</h1>
                    <ul>
                        <li className="hover:text-green-500"><Link href={'/'}>Home</Link></li>
                    </ul>
                </div>

                <div className="container mx-auto p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white rounded-lg shadow p-4">
                                <Link href={`/products/${product.id}`}>
                                    <div>
                                        <Image
                                            src={'/digicard-business.png'}
                                            width={300}
                                            height={300}
                                            alt={product.name}
                                            className="w-full rounded-lg mb-4"
                                        />
                                        <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
                                        <h2 className="text-md mb-2">{product.description}</h2>
                                        <p className="text-gray-600">${product.price}</p>

                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
