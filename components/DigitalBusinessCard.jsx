import Image from "next/legacy/image";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaFileDownload, FaShare, FaEnvelope, FaPhone, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { Button } from './ui/button';
import ProductCreationModal from './ProductCreationModal2';
import QRCode from "qrcode.react";

export default function DigitalBusinessCard({ card }) {
    const [activeSection, setActiveSection] = useState('about');
    const [userData, setUserData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [products, setProducts] = useState([]);
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


    const handleProductsUpdate = (updatedProducts) => {
        setProducts(updatedProducts);
    };

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
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

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('osunUserData'));
        if (!user) {
            // set user data to null
            setUserData(null);
            localStorage.setItem('osunUserData', null);
            return;
        }
        setUserData(user);
    }, []);

    const renderSectionContent = () => {
        switch (activeSection) {
            case 'about':
                return (
                    <div>
                        {card.about_me}
                        <div className="flex w-full justify-evenly p-4 items-center">
                            <div className="w-3/4">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{card.first_name} {card.last_name}</h2>
                                <h2 className="text-lg font-semibold text-gray-600 mb-2">{card.job_title}</h2>
                            </div>
                            <Image
                                src={`data:image/jpeg;base64,${card.profile_picture}`}
                                width={60}
                                height={60}
                                alt="Profile Picture"
                                className="rounded-full object-cover mx-auto"
                            />
                        </div>
                        <div className="w-full bg-blue-500 h-[1.2px] my-2"></div>

                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Skills</h2>

                        <ul>
                            <li>Land Scaping</li>
                            <li>3d Mapping</li>
                            {/* <li>Figma</li>
                            <li>Excel</li> */}
                        </ul>
                    </div>
                );
            case 'products':
                return (
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Products & Services</h2>
                            {userData && card.creator_id === userData.id && (
                                <Button
                                    variant="default"
                                    className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                                    onClick={openModal}
                                >
                                    Add Product
                                </Button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {card.products && card.products.length > 0 ? (
                                card.products.map((product) => (
                                    <div key={product.id} className="border rounded-lg bg-white shadow-md">
                                        {product.images.map((image, index) => (
                                            <div key={index} className="border rounded-lg">
                                                <Image
                                                    src={`${image}`}
                                                    width={500}
                                                    height={500}
                                                    alt={product.name}
                                                    className="object-cover object-center w-full mb-4 rounded-lg"
                                                />
                                            </div>
                                        ))}
                                        <div className="p-4">
                                            <div className="inline-flex justify-between w-full">
                                                <h1 className="mb-2 text-xl font-semibold leading-none tracking-tighter text-neutral-600">{product.name}</h1>
                                                <span>₦ {product.amount || '400'}</span>
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
                                ))
                            ) : (
                                <p>No products available.</p>
                            )}
                        </div>
                    </div>
                );



            case 'contact':
                return (
                    <div className="mb-6">
                        <div className="flex w-full justify-evenly p-4 items-center">
                            <div className="w-3/4">
                                <h2 className="text-lg font-semibold text-gray-600 mb-2">You Can Contact <span className="text-green-500">{card.first_name}</span> Here</h2>
                            </div>
                            <Image
                                src={`data:image/jpeg;base64,${card.profile_picture}`}
                                width={60}
                                height={60}
                                alt="Profile Picture"
                                className="rounded-full object-cover mx-auto"
                            />
                        </div>
                        <div className="w-full bg-blue-500 h-[1.2px] my-2"></div>
                        <div className="flex items-center gap-4 bg-pink-100 p-4 rounded-lg my-4">
                            {card.email && (
                                <p className="flex items-center">
                                    <FaEnvelope className="mr-2" />
                                    <a href={`mailto:${card.email}`} className="text-blue-600">{card.email}</a>
                                </p>
                            )}
                            {card.phone && (
                                <p className="flex items-center">
                                    <FaPhone className="mr-2" />
                                    <a href={`tel:${card.phone}`} className="text-blue-600">{card.phone}</a>
                                </p>
                            )}

                        </div>

                        <div className="flex gap-4 bg-slate-100 p-4 rounded-lg my-4">
                            <ul className="w-full">
                                {card.social_media.map((social) => (
                                    <li key={social.platform} className="flex items-center mb-2">
                                        {social.platform === 'Facebook' && <FaFacebook className="mr-2" />}
                                        {social.platform === 'Twitter' && <FaTwitter className="mr-2" />}
                                        {social.platform === 'LinkedIn' && <FaLinkedin className="mr-2" />}
                                        {social.platform === 'Instagram' && <FaInstagram className="mr-2" />}
                                        {social.platform === 'GitHub' && <FaGithub className="mr-2" />}
                                        <a href={social.url} className="text-blue-600">{social.platform}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );


            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen w-full p-4 flex flex-col items-center lg:px-20">

            <div className="bg-white rounded-xl shadow-lg p-6 text-center mb-8 w-full max-w-4xl">
                <div className="w-full flex justify-between items-center mb-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg hover:shadow-xl text-white z-50 p-6">
                    <h1 className="text-3xl font-semibold">Hi there!, I&apos;m <span className="text-green-400">{card.first_name}</span></h1>
                    <ul className="flex gap-2 items-center justify-center">
                        <li className="hover:text-green-500"><Link href={'/'}>Home</Link></li>
                        <li className="hover:text-green-500"><Link href={'/profile/profile'}>Profile</Link></li>
                        <li className="hover:text-green-500"><Link href={'/directories/products'}>Products</Link></li>
                        <li className="hover:text-green-500"><Link href={'/directories/business-cards'}>Cards</Link></li>
                    </ul>
                </div>
                <div className="mb-6">
                    <div className="relative w-full h-40 rounded-lg bg-white shadow-sm mb-4 mx-auto">
                        {card.logo ? (
                            <Image
                                src={`data:image/jpeg;base64,${card.logo}`}
                                layout="fill"
                                objectFit="cover"
                                alt="Business Logo"
                                className="object-cover rounded-lg w-full"
                            />
                        ) : null}
                    </div>
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
                <div className="flex flex-col items-center justify-center">
                    <QRCode value={window.location.href} size={128} /> {/* QR Code based on the URL */}
                    </div>
                <div className="mt-6 flex flex-col w-full items-center justify-center lg:flex-row gap-4">
                    <div className="flex flex-col items-center justify-center">
                        <button
                            onClick={downloadVCard}
                            className="m-2 p-2 bg-blue-500 text-white rounded transition duration-300 hover:bg-blue-700 flex items-center justify-center"
                        >
                            <FaFileDownload className="mr-2" />
                            Download
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <button
                            onClick={shareCard}
                            className="m-2 p-2 bg-blue-500 text-white rounded transition duration-300 hover:bg-blue-700 flex items-center justify-center"
                        >
                            <FaShare className="mr-2" />
                            Share
                        </button>
                    </div>
                </div>
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

            <ProductCreationModal
                visible={isModalVisible}
                onClose={closeModal}
                onProductsUpdate={handleProductsUpdate}
                card={card}
            />
        </div>
    );
}