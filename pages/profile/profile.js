// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import Link from 'next/link';

// export default function ProfilePage() {
//     const [activeSection, setActiveSection] = useState('cards');
//     const [userData, setUserData] = useState(null);
//     const [cards, setCards] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const router = useRouter();

//     useEffect(() => {
//         const user = JSON.parse(localStorage.getItem('osunUserData'));
//         setUserData(user);

//         if (user && user.id) {
//             fetchCards(user.id);
//         }
//     }, []);

//     const fetchCards = async (creatorId) => {
//         try {
//             const response = await fetch(`/api/backed/cards/get-all-byid?creator_id=${creatorId}`);
//             const result = await response.json();

//             if (result.success) {
//                 setCards(result.businessCards);
//             } else {
//                 setCards([]);
//             }
//         } catch (error) {
//             console.error('Error fetching cards:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const renderSectionContent = () => {
//         switch (activeSection) {
//             case 'cards':
//                 return (
//                     <div className="mb-6">
//                         <h2 className="text-2xl font-semibold text-gray-800 mb-2">My Cards</h2>
//                         {loading ? (
//                             <p>Loading cards...</p>
//                         ) : (
//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                                 {cards.length > 0 ? (
//                                     cards.map((card) => (
//                                         <div key={card.id} className="border rounded-lg bg-white shadow-md">
//                                             <Image
//                                                 src={`data:image/jpeg;base64,${card.logo}`}
//                                                 width={300}
//                                                 height={300}
//                                                 alt="Card Image"
//                                                 className="object-cover object-center w-full mb-4 rounded-lg"
//                                             />
//                                             <div className="p-4">
//                                                 <h1 className="mb-2 text-xl font-semibold leading-none tracking-tighter text-neutral-600">{card.first_name} {card.last_name}</h1>
//                                                 <p className="mx-auto text-base font-medium leading-relaxed text-gray-500">{card.job_title}</p>
//                                                 <a
//                                                     onClick={() => router.push(`/cards/${card.card_url}`)}
//                                                     className="text-blue-600 cursor-pointer mt-2 block"
//                                                 >
//                                                     View Details
//                                                 </a>
//                                             </div>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p>No cards available.</p>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 );

//             case 'others':
//                 return (
//                     <div className="mb-6">
//                         <h2 className="text-2xl font-semibold text-gray-800 mb-2">Other Information</h2>
//                         {/* Add other user-related information here */}
//                     </div>
//                 );

//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="min-h-screen w-full p-4 flex flex-col items-center lg:px-20">
//             <div className="bg-white rounded-xl shadow-lg p-6 text-center mb-8 w-full max-w-4xl">
//                 <div className="w-full flex justify-between items-center mb-6 bg-gray-800 rounded-lg hover:shadow-xl text-white z-50 p-6">
//                     <h1 className="text-3xl font-semibold">Welcome, <span className="text-green-500">{userData?.firstname}</span>!</h1>
//                     <ul>
//                         <li className="hover:text-green-500"><Link href={'/'}>Home</Link></li>
//                     </ul>
//                 </div>
//                 <div className="mb-6">
//                     {userData?.profile_picture ? (
//                         <Image
//                             src={`data:image/jpeg;base64,${userData?.profile_picture}`}
//                             width={100}
//                             height={100}
//                             alt="Profile Picture"
//                             className="rounded-full object-cover mb-4 border-4 border-blue-600 mx-auto"
//                         />
//                     ) : (
//                         <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mb-4 mx-auto">
//                             <span className="text-2xl text-white">{userData?.firstname}</span>
//                         </div>
//                     )}
//                 </div>
//                 <h1 className="text-3xl font-bold text-gray-800 mb-2">{userData?.firstname} {userData?.lastname}</h1>
//                 <p className="text-lg text-gray-600 mb-4">{userData?.username}</p>
//             </div>
//             <div className="flex flex-col lg:flex-row w-full max-w-4xl">
//                 <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg p-6 mb-4 lg:mb-0">
//                     <ul className="space-y-4">
//                         <li
//                             className={`cursor-pointer py-2 px-4 text-lg font-medium ${activeSection === 'cards' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
//                             onClick={() => setActiveSection('cards')}
//                         >
//                             My Cards
//                         </li>
//                         <li
//                             className={`cursor-pointer py-2 px-4 text-lg font-medium ${activeSection === 'others' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
//                             onClick={() => setActiveSection('others')}
//                         >
//                             Others
//                         </li>
//                     </ul>
//                 </div>
//                 <div className="w-full lg:w-3/4 bg-white rounded-xl shadow-lg p-6 lg:ml-4">
//                     {renderSectionContent()}
//                 </div>
//             </div>
//         </div>
//     );
// }











import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ProfilePage() {
    const [activeSection, setActiveSection] = useState('cards');
    const [userData, setUserData] = useState(null);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('osunUserData'));
        setUserData(user);

        if (user && user.id) {
            fetchCards(user.id);
        }
    }, []);

    const fetchCards = async (creatorId) => {
        try {
            const response = await fetch(`/api/backed/cards/get-all-byid?creator_id=${creatorId}`);
            const result = await response.json();

            if (result.success) {
                setCards(result.businessCards);
            } else {
                setCards([]);
            }
        } catch (error) {
            console.error('Error fetching cards:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCard = () => {
        router.push('/create-card');
    };

    const renderSectionContent = () => {
        switch (activeSection) {
            case 'cards':
                return (
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">My Cards</h2>
                            <button
                                onClick={handleAddCard}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
                            >
                                Add Card
                            </button>
                        </div>
                        {loading ? (
                            <p>Loading cards...</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {cards.length > 0 ? (
                                    cards.map((card) => (
                                        <div key={card.id} className="border rounded-lg bg-white shadow-md">
                                            <Image
                                                src={`data:image/jpeg;base64,${card.logo}`}
                                                width={300}
                                                height={300}
                                                alt="Card Image"
                                                className="object-cover object-center w-full mb-4 rounded-lg"
                                            />
                                            <div className="p-4">
                                                <h1 className="mb-2 text-xl font-semibold leading-none tracking-tighter text-neutral-600">{card.first_name} {card.last_name}</h1>
                                                <p className="mx-auto text-base font-medium leading-relaxed text-gray-500">{card.job_title}</p>
                                                <a
                                                    onClick={() => router.push(`/cards/${card.card_url}`)}
                                                    className="text-blue-600 cursor-pointer mt-2 block"
                                                >
                                                    View Details
                                                </a>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No cards available.</p>
                                )}
                            </div>
                        )}
                    </div>
                );

            case 'others':
                return (
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Other Information</h2>
                        {/* Add other user-related information here */}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen w-full p-4 flex flex-col items-center lg:px-20">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center mb-8 w-full max-w-4xl">
                <div className="w-full flex justify-between items-center mb-6 bg-gray-800 rounded-lg hover:shadow-xl text-white z-50 p-6">
                    <h1 className="text-3xl font-semibold">Welcome, <span className="text-green-500">{userData?.firstname}</span>!</h1>
                    <ul>
                        <li className="hover:text-green-500"><Link href={'/'}>Home</Link></li>
                    </ul>
                </div>
                <div className="mb-6">
                    {userData?.profile_picture ? (
                        <Image
                            src={`data:image/jpeg;base64,${userData?.profile_picture}`}
                            width={100}
                            height={100}
                            alt="Profile Picture"
                            className="rounded-full object-cover mb-4 border-4 border-blue-600 mx-auto"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mb-4 mx-auto">
                            <span className="text-2xl text-white">{userData?.firstname}</span>
                        </div>
                    )}
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{userData?.firstname} {userData?.lastname}</h1>
                <p className="text-lg text-gray-600 mb-4">{userData?.username}</p>
            </div>
            <div className="flex flex-col lg:flex-row w-full max-w-4xl">
                <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg p-6 mb-4 lg:mb-0">
                    <ul className="space-y-4">
                        <li
                            className={`cursor-pointer py-2 px-4 text-lg font-medium ${activeSection === 'cards' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                            onClick={() => setActiveSection('cards')}
                        >
                            My Cards
                        </li>
                        <li
                            className={`cursor-pointer py-2 px-4 text-lg font-medium ${activeSection === 'others' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                            onClick={() => setActiveSection('others')}
                        >
                            Others
                        </li>
                    </ul>
                </div>
                <div className="w-full lg:w-3/4 bg-white rounded-xl shadow-lg p-6 lg:ml-4">
                    {renderSectionContent()}
                </div>
            </div>
        </div>
    );
}
