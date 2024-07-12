import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';

export default function DigitalBusinessCard({ card }) {
    const [activeSection, setActiveSection] = useState('about');
    const router = useRouter();

    const downloadVCard = () => {
        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${card.first_name} ${card.last_name}
N:${card.last_name};${card.first_name};;;
TITLE:${card.job_title}
EMAIL:${card.email}
TEL:${card.phone}
${card.logo ? `PHOTO;VALUE=URL:${window.location.origin}/uploads/${card.logo}` : ''}
END:VCARD`;

        const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${card.first_name}_${card.last_name}.vcf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const shareCard = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: `${card.first_name} ${card.last_name} - Digital Business Card`,
                    url: window.location.href,
                })
                .then(() => {
                    console.log('Thanks for sharing!');
                })
                .catch(console.error);
        } else {
            prompt('Copy this link to share the card:', window.location.href);
        }
    };
    const renderSectionContent = () => {
        switch (activeSection) {
            case 'about':
                return <div>{card.about_me}</div>;
            case 'products':
                return (
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Products & Services</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {card.Products.map((product) => (
                                <div key={product.id} className="border rounded-lg bg-white shadow-md">
                                    <Image
                                        src={`/bgp.jpg`}
                                        width={300}
                                        height={300}
                                        alt="Product Image"
                                        className="object-cover object-center w-full mb-4 rounded-lg"
                                    />
                                    <div className="p-4">
                                        <div className="inline-flex justify-between w-full">
                                            <h1 className="mb-2 text-xl font-semibold leading-none tracking-tighter text-neutral-600">{product.name}</h1>
                                            <span>${product.price}</span>
                                        </div>
                                        <p className="mx-auto text-base font-medium leading-relaxed text-gray-500">{product.description}</p>
                                        <a
                                            onClick={() => router.push(`/products/${product.id}`)}
                                            className="text-blue-600 cursor-pointer mt-2 block"
                                        >
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'contact':
                return (
                    <div className="mb-6">
                        {card.email && (
                            <p className="flex items-center mb-2">
                                <i className="fas fa-envelope mr-2"></i>
                                <a href={`mailto:${card.email}`} className="text-blue-600">{card.email}</a>
                            </p>
                        )}
                        {card.phone && (
                            <p className="flex items-center">
                                <i className="fas fa-phone mr-2"></i>
                                <a href={`tel:${card.phone}`} className="text-blue-600">{card.phone}</a>
                            </p>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 w-full p-4 flex flex-col items-center lg:px-20">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center mb-8 w-full max-w-4xl">
                <div className="mb-6">
                    {card.logo ? (
                        <Image
                            src={`data:image/jpeg;base64,${card.logo}`}
                            width={70}
                            height={70}
                            alt="Business Logo"
                            className="object-contain mb-4 mx-auto rounded-full"
                        />
                    ) : null}
                    {card.profile_picture ? (
                        <Image
                            src={`data:image/jpeg;base64,${card.profile_picture}`}
                            width={100}
                            height={100}
                            alt="Profile Picture"
                            className="rounded-full object-cover mb-4 border-4 border-blue-600 mx-auto"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mb-4 mx-auto">
                            <span className="text-2xl text-white">{card.first_name[0]}{card.last_name[0]}</span>
                        </div>
                    )}
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{card.first_name} {card.last_name}</h1>
                <p className="text-lg text-gray-600 mb-4">{card.job_title}</p>
            </div>
            <div className="flex flex-col lg:flex-row w-full max-w-4xl">
                <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg p-6 mb-4 lg:mb-0">
                    <ul className="space-y-4">
                        <li
                            className={`cursor-pointer py-2 px-4 text-lg font-medium ${activeSection === 'about' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                            onClick={() => setActiveSection('about')}
                        >
                            About Me
                        </li>
                        <li
                            className={`cursor-pointer py-2 px-4 text-lg font-medium ${activeSection === 'products' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                            onClick={() => setActiveSection('products')}
                        >
                            {/* Products & Services */}
                            Products
                        </li>
                        <li
                            className={`cursor-pointer py-2 px-4 text-lg font-medium ${activeSection === 'contact' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                            onClick={() => setActiveSection('contact')}
                        >
                            Contact
                        </li>
                    </ul>
                </div>
                <div className="w-full lg:w-3/4 bg-white rounded-xl shadow-lg p-6 lg:ml-4">
                    {renderSectionContent()}
                </div>
            </div>
            <div className="mt-6 flex flex-col lg:flex-row gap-4">
                <button
                    onClick={downloadVCard}
                    className="m-2 p-2 bg-blue-600 text-white rounded transition duration-300 hover:bg-blue-700 flex items-center justify-center"
                >
                    <i className="fas fa-download mr-2"></i>Download vCard
                </button>
                <button
                    onClick={shareCard}
                    className="m-2 p-2 bg-blue-600 text-white rounded transition duration-300 hover:bg-blue-700 flex items-center justify-center"
                >
                    <i className="fas fa-share-alt mr-2"></i>Share
                </button>
            </div>
        </div>
    );
}
