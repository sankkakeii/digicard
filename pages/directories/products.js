import NotFound from '@/components/NotFound';
import Spinner from '@/components/Spinner';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const router = useRouter();
    const { limit } = router.query;

    const ITEMS_PER_PAGE = parseInt(limit) || itemsPerPage;

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

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(1); // Reset to the first page when items per page changes
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
        <div className="min-h-screen bg-gray-100">
            <section className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
                <div className="flex justify-between items-center mb-6 bg-gray-800 rounded-lg shadow-lg text-white p-6">
                    <h1 className="text-3xl font-bold">Products</h1>
                    <ul className="flex gap-2 items-center justify-center">
                        <li className="hover:text-green-500"><Link href={'/'}>Home</Link></li>
                        <li className="hover:text-green-500"><Link href={'/profile/profile'}>Profile</Link></li>
                        <li className="hover:text-green-500"><Link href={'/directories/products'}>Products</Link></li>
                        <li className="hover:text-green-500"><Link href={'/directories/business-cards'}>Cards</Link></li>
                    </ul>
                </div>

                <div className="container mx-auto">
                    {/* Search and Items per page controls */}
                    <div className="flex justify-between items-center mb-6">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-1/3 p-2 border rounded-md"
                        />
                        <div className="flex items-center space-x-2">
                            <label htmlFor="itemsPerPage">Items per page:</label>
                            <select
                                id="itemsPerPage"
                                value={itemsPerPage}
                                onChange={handleItemsPerPageChange}
                                className="border p-2 rounded-md"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                            </select>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {displayedProducts.map((product) => (
                            <div key={product.id} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
                                <Link href={`/products/${product.id}`}>
                                    <div>
                                        {product.images.length > 0 && (
                                            <div className="relative w-full h-64 sm:h-48 md:h-64">
                                                <Image
                                                    src={product.images[0] || '/default.jpg'}
                                                    alt={`${product.name} Thumbnail`}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    className="rounded-md"
                                                />
                                            </div>
                                        )}
                                        <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
                                        <p className="text-md mb-2">{product.description}</p>
                                        <p className="text-gray-600 font-bold">₦ {product.amount}</p>
                                        {/* Optional: Rating */}
                                        {product.rating && (
                                            <div className="flex items-center mt-2">
                                                {[...Array(5)].map((_, index) => (
                                                    <span key={index} className={`text-yellow-500 ${index < product.rating ? 'fas fa-star' : 'far fa-star'}`}></span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 mx-1 bg-gray-300 rounded-md hover:bg-gray-400"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 mx-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 mx-1 bg-gray-300 rounded-md hover:bg-gray-400"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
