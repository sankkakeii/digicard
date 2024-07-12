import Image from 'next/image';
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
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 w-full p-4 flex flex-col items-center lg:px-20">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center mb-8 w-full max-w-4xl">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
                <Image
                    src={product.image}
                    width={150}
                    height={150}
                    alt={product.name}
                    className="object-contain mb-4 mx-auto"
                />
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
    );
}
