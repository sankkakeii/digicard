import NotFound from '@/components/NotFound';
import Spinner from '@/components/Spinner';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function BusinessCards() {
    const [businessCards, setBusinessCards] = useState([]);
    const [filteredBusinessCards, setFilteredBusinessCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const router = useRouter();
    const { limit } = router.query;

    const ITEMS_PER_PAGE = parseInt(limit) || itemsPerPage;

    useEffect(() => {
        fetch('/api/backed/cards/get-all')
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setBusinessCards(data.businessCards);
                    setFilteredBusinessCards(data.businessCards);
                } else {
                    console.log(data.message);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching business cards:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setFilteredBusinessCards(
            businessCards.filter((card) =>
                `${card.first_name} ${card.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, businessCards]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(1); // Reset to first page when items per page changes
    };

    const displayedBusinessCards = filteredBusinessCards.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil(filteredBusinessCards.length / ITEMS_PER_PAGE);

    if (loading) {
        return <Spinner />;
    }

    if (filteredBusinessCards.length === 0) {
        return <NotFound />;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <section className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
                <div className="flex justify-between items-center mb-6 bg-gray-800 rounded-lg shadow-lg text-white p-6">
                    <h1 className="text-3xl font-bold">Business Cards Directory</h1>
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
                            placeholder="Search business cards..."
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

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {displayedBusinessCards.map((card) => (
                            <div key={card.id} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
                                <Link href={`/cards/${card.card_url}`}>
                                    <div>
                                        <Image
                                            src={`data:image/jpeg;base64,${card.profile_picture}` || '/default.jpg'}
                                            width={300}
                                            height={300}
                                            alt={`${card.first_name} ${card.last_name}`}
                                            className="w-full h-48 object-cover rounded-lg mb-4" // Added h-48 for height control
                                        />
                                        <h2 className="font-semibold text-lg mb-2">{card.first_name} {card.last_name}</h2>
                                        <p className="text-gray-600 mb-2">{card.job_title}</p>
                                        <p className="text-gray-600 mb-4">{card.description}</p>
                                        <div className="flex justify-between items-center mt-4">
                                            <Link href={`/cards/${card.card_url}`} className="text-blue-600 font-semibold">View Details</Link>
                                            <span className="text-gray-500 text-sm">Last Updated: {card.updated_at}</span>
                                        </div>
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
