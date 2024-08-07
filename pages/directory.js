import NotFound from '@/components/NotFound';
import Spinner from '@/components/Spinner';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const { limit } = router.query;

    const ITEMS_PER_PAGE = parseInt(limit) || 10;

    useEffect(() => {
        fetch('/api/backed/products/get-all')
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setProducts(data.products);
                    setFilteredProducts(data.products);
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

    useEffect(() => {
        setFilteredProducts(
            products.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, products]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const displayedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    if (loading) {
        return <Spinner />;
    }

    if (filteredProducts.length === 0) {
        return <NotFound />;
    }

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

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
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-1/2 p-2 mb-6 border rounded"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {displayedProducts.map((product) => (
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
                                        <p className="text-md mb-2">{product.description}</p>
                                        <p className="text-gray-600">${product.price}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 mx-1 bg-gray-300 rounded"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 mx-1 bg-gray-300 rounded"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
