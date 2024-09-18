// import NotFound from '@/components/NotFound';
// import Spinner from '@/components/Spinner';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// export default function BusinessCards() {
//     const [businessCards, setBusinessCards] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetch('/api/backed/cards/get-all')
//             .then((response) => response.json())
//             .then((data) => {
//                 if (data.success) {
//                     setBusinessCards(data.businessCards);
//                 } else {
//                     console.log(data.message);
//                 }
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error('Error fetching business cards:', error);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) {
//         return <Spinner />;
//     }

//     if (businessCards.length === 0) {
//         return <NotFound />;
//     }

//     return (
//         <div className="min-h-screen">
//             <section className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
//                 <div className="flex justify-between items-center mb-6 bg-gray-800 rounded-lg hover:shadow-xl text-white z-50 p-6">
//                     <h1 className="text-3xl font-semibold">Business Cards</h1>
//                     <ul>
//                         <li className="hover:text-green-500"><Link href={'/'}>Home</Link></li>
//                     </ul>
//                 </div>

//                 <div className="container mx-auto p-4">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                         {businessCards.map((card) => (
//                             <div key={card.id} className="bg-white rounded-lg shadow p-4">
//                                 <Link href={`/cards/${card.card_url}`}>
//                                     <div>
//                                         <Image
//                                             src={'/bgp.jpg'} // Replace with card.image if available
//                                             width={300}
//                                             height={300}
//                                             alt={card.name}
//                                             className="w-full rounded-lg mb-4"
//                                         />
//                                         <h2 className="font-semibold text-lg mb-2">{card.first_name} {card.last_name}</h2>
//                                         <p className="text-gray-600 mb-2">{card.job_title}</p>
//                                         <p className="text-gray-600">{card.description}</p>
//                                     </div>
//                                 </Link>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }






















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
    const router = useRouter();
    const { limit } = router.query;

    const ITEMS_PER_PAGE = parseInt(limit) || 10;

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

    const displayedBusinessCards = filteredBusinessCards.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    if (loading) {
        return <Spinner />;
    }

    if (filteredBusinessCards.length === 0) {
        return <NotFound />;
    }

    const totalPages = Math.ceil(filteredBusinessCards.length / ITEMS_PER_PAGE);

    return (
        <div className="min-h-screen">
            <section className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
                <div className="flex justify-between items-center mb-6 bg-gray-800 rounded-lg hover:shadow-xl text-white z-50 p-6">
                    <h1 className="text-3xl font-semibold">Business Cards</h1>
                    <ul>
                        <li className="hover:text-green-500"><Link href={'/'}>Home</Link></li>
                    </ul>
                </div>

                <div className="container mx-auto p-4">
                    <input
                        type="text"
                        placeholder="Search business cards..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-1/2 p-2 mb-6 border rounded"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {displayedBusinessCards.map((card) => (
                            <div key={card.id} className="bg-white rounded-lg shadow p-4">
                                <Link href={`/cards/${card.card_url}`}>
                                    <div>
                                        <Image
                                            src={'/bgp.jpg'} // Replace with card.image if available
                                            width={300}
                                            height={300}
                                            alt={card.first_name + ' ' + card.last_name}
                                            className="w-full rounded-lg mb-4"
                                        />
                                        <h2 className="font-semibold text-lg mb-2">{card.first_name} {card.last_name}</h2>
                                        <p className="text-gray-600 mb-2">{card.job_title}</p>
                                        <p className="text-gray-600">{card.description}</p>
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
