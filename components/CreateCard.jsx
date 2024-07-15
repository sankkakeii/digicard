import { useState, useEffect } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode.react';
import CustomModal from './CustomModal';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';


export default function CreateCard({ csrfToken }) {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        jobTitle: '',
        email: '',
        phone: '',
        logo: null,
        profilePicture: null,
        socialMedia: [],
        products: [],
    });

    const [previewData, setPreviewData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        jobTitle: 'Software Engineer',
        email: 'john.doe[at]example[dot]com',
        phone: '+1 (555) 123-4567',
        logo: null,
        profilePicture: null,
        socialMedia: [],
        products: [],
    });

    const iconMap = {
        Facebook: FaFacebook,
        Instagram: FaInstagram,
        Twitter: FaTwitter,
        LinkedIn: FaLinkedin,
    };

    const [cardId, setCardId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState({
        title: '',
        message: '',
        type: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormState((prevState) => ({
                ...prevState,
                [name]: reader.result.split(',')[1], // Get base64 string
            }));
        };
        reader.readAsDataURL(files[0]);
    };

    const addSocialMediaEntry = () => {
        setFormState((prevState) => ({
            ...prevState,
            socialMedia: [...prevState.socialMedia, { platform: '', url: '' }],
        }));
    };

    const removeSocialMediaEntry = (index) => {
        setFormState((prevState) => ({
            ...prevState,
            socialMedia: prevState.socialMedia.filter((_, i) => i !== index),
        }));
    };

    const addProductEntry = () => {
        setFormState((prevState) => ({
            ...prevState,
            products: [...prevState.products, { name: '', description: '', url: '' }],
        }));
    };

    const removeProductEntry = (index) => {
        setFormState((prevState) => ({
            ...prevState,
            products: prevState.products.filter((_, i) => i !== index),
        }));
    };

    const handleSocialMediaChange = (index, field, value) => {
        const newSocialMedia = [...formState.socialMedia];
        newSocialMedia[index][field] = value;
        setFormState((prevState) => ({
            ...prevState,
            socialMedia: newSocialMedia,
        }));
    };

    const handleProductChange = (index, field, value) => {
        const newProducts = [...formState.products];
        newProducts[index][field] = value;
        setFormState((prevState) => ({
            ...prevState,
            products: newProducts,
        }));
    };

    useEffect(() => {
        setPreviewData((prevData) => ({
            ...prevData,
            ...formState,
            email: formState.email.replace('@', '@').replace('.', '.'),
            logo: formState.logo ? `data:image/jpeg;base64,${formState.logo}` : null,
            profilePicture: formState.profilePicture ? `data:image/jpeg;base64,${formState.profilePicture}` : null,
        }));
    }, [formState]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            ...formState,
            csrf_token: csrfToken,
            social_media: JSON.stringify(formState.socialMedia),
        };

        try {
            const response = await fetch('/api/backed/create-card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                const nameSlug = `${formState.firstName}-${formState.lastName}`.toLowerCase().replace(/\s+/g, '-');
                setCardId(nameSlug);

                // Send product information
                for (const product of formState.products) {
                    await fetch('/api/backed/create-product', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...product,
                            businessCardId: data.card_id, // Use the card ID returned from the card creation response
                        }),
                    });
                }

                setModalMessage({
                    title: 'Success',
                    message: `Your Digital Business Card URL: ${window.location.origin}/cards/${nameSlug}`,
                    type: 'success',
                });
                setModalVisible(true);
            } else {
                setModalMessage({
                    title: 'Error',
                    message: data.message,
                    type: 'error',
                });
                setModalVisible(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setModalMessage({
                title: 'Error',
                message: 'An error occurred. Please try again.',
                type: 'error',
            });
            setModalVisible(true);
        }
    };

    const handleCopyLink = () => {
        const link = `${window.location.origin}/cards/${cardId}`;
        navigator.clipboard.writeText(link).then(() => {
            setModalMessage({
                title: 'Success',
                message: 'Link copied to clipboard!',
                type: 'success',
            });
            setModalVisible(true);
        });
    };

    return (
        <>
            <div className="relative container mx-auto p-5 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
                <div className=" -z-30 absolute top-0 rounded-full bg-violet-300 right-12 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className=" -z-30 absolute rounded-full bg-fuchsia-300 -bottom-24 left-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

                <div className=" -z-30 absolute top-80 rounded-full bg-yellow-300 -right-24 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className=" -z-30 absolute rounded-full bg-green-300 top-24 -left-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                {/* Form Section */}
                <div className="flex-1 lg:pr-5 mb-5 lg:mb-0  ">
                    <div className="flex justify-between items-center mb-6 bg-gray-800 rounded-lg hover:shadow-xl text-white z-50 p-6">
                        <h1 className="text-3xl font-semibold">Create Your Digital Business Card</h1>
                        <ul>
                            <li className="hover:text-green-500"><Link href={'/'}>Home</Link> </li>
                        </ul>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input type="hidden" name="csrf_token" value={csrfToken} />
                        {/* Personal Information */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-700">Personal Information</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-gray-600">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        className="w-full p-2 mt-2 border rounded"
                                        value={formState.firstName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-gray-600">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        className="w-full p-2 mt-2 border rounded"
                                        value={formState.lastName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="jobTitle" className="block text-gray-600">Job Title</label>
                                <input
                                    type="text"
                                    id="jobTitle"
                                    name="jobTitle"
                                    className="w-full p-2 mt-2 border rounded"
                                    value={formState.jobTitle}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="email" className="block text-gray-600">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full p-2 mt-2 border rounded"
                                        value={formState.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-gray-600">Phone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="w-full p-2 mt-2 border rounded"
                                        value={formState.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Business Logo and Profile Picture */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-700">Business Logo and Profile Picture</h2>
                            <div>
                                <label htmlFor="logo" className="block text-gray-600">Business Logo</label>
                                <input
                                    type="file"
                                    id="logo"
                                    name="logo"
                                    className="w-full p-2 mt-2 border rounded"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="profilePicture" className="block text-gray-600">Profile Picture</label>
                                <input
                                    type="file"
                                    id="profilePicture"
                                    name="profilePicture"
                                    className="w-full p-2 mt-2 border rounded"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        {/* Social Media */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-700">Social Media</h2>
                            <div className="space-y-4">
                                {formState.socialMedia.map((entry, index) => (
                                    <div key={index} className="border p-4 rounded-lg bg-white shadow">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <select
                                                value={entry.platform}
                                                className="w-full p-2 mt-2 border rounded"
                                                onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
                                            >
                                                <option value="Facebook">Facebook</option>
                                                <option value="Instagram">Instagram</option>
                                                <option value="Twitter">Twitter</option>
                                                <option value="LinkedIn">LinkedIn</option>
                                            </select>
                                            <input
                                                type="url"
                                                className="w-full p-2 mt-2 border rounded"
                                                placeholder="Profile URL"
                                                value={entry.url}
                                                onChange={(e) => handleSocialMediaChange(index, 'url', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="mt-2 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                                            onClick={() => removeSocialMediaEntry(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                                onClick={addSocialMediaEntry}
                            >
                                Add Social Media
                            </button>
                        </div>
                        {/* Products */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-700">Products</h2>
                            <div className="space-y-4">
                                {formState.products.map((entry, index) => (
                                    <div key={index} className="border p-4 rounded-lg bg-white shadow">
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-2 border rounded"
                                            placeholder="Product Name"
                                            value={entry.name}
                                            onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                                            required
                                        />
                                        <textarea
                                            className="w-full p-2 mt-2 border rounded"
                                            placeholder="Product Description"
                                            value={entry.description}
                                            onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                                            required
                                        />
                                        <input
                                            type="url"
                                            className="w-full p-2 mt-2 border rounded"
                                            placeholder="Product URL"
                                            value={entry.url}
                                            onChange={(e) => handleProductChange(index, 'url', e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="mt-2 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                                            onClick={() => removeProductEntry(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                                onClick={addProductEntry}
                            >
                                Add Product
                            </button>
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 mt-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                        >
                            Create Digital Business Card
                        </button>
                    </form>
                </div>
                {/* Preview Section */}
                <div className="flex-1 lg:border-l-2 lg:pl-5">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Preview</h2>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">{previewData.firstName} {previewData.lastName}</h3>
                                <p className="text-gray-600">{previewData.jobTitle}</p>
                            </div>
                            <div className="w-16 h-16">
                                {previewData.profilePicture ? (
                                    <Image
                                        src={previewData.profilePicture}
                                        alt={`${previewData.firstName}'s Profile Picture`}
                                        layout="responsive"
                                        width={64}
                                        height={64}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <Image src="/digicard-profile.png" alt="Profile Placeholder" width={64} height={64} />
                                )}
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="mb-4">
                            {previewData.logo ? (
                                <div className="w-full mb-4">
                                    <Image
                                        src={previewData.logo}
                                        alt="Business Logo"
                                        layout="responsive"
                                        width={200}
                                        height={100}
                                        className="object-contain"
                                    />
                                </div>
                            ) : (
                                <Image src="/digicard-business.png" alt="Logo Placeholder" width={600} height={600} />
                            )}
                            <div>
                                <p className="text-gray-700 mb-2">
                                    <strong>Email:</strong> {previewData.email}
                                </p>
                                <p className="text-gray-700 mb-2">
                                    <strong>Phone:</strong> {previewData.phone}
                                </p>

                                {previewData.socialMedia.length > 0 && (
                                    <>
                                        <p className="text-gray-700 mb-2"><strong>Social Media:</strong></p>
                                        <ul className="flex space-x-4 mb-2">
                                            {previewData.socialMedia.map((entry, index) => {
                                                let Icon;
                                                switch (entry.platform) {
                                                    case 'Facebook':
                                                        Icon = FaFacebook;
                                                        break;
                                                    case 'Instagram':
                                                        Icon = FaInstagram;
                                                        break;
                                                    case 'Twitter':
                                                        Icon = FaTwitter;
                                                        break;
                                                    case 'LinkedIn':
                                                        Icon = FaLinkedin;
                                                        break;
                                                    default:
                                                        Icon = null;
                                                }
                                                return (
                                                    <li key={index} className="text-blue-500">
                                                        <a href={entry.url} target="_blank" rel="noopener noreferrer">
                                                            {Icon && <Icon size={24} />}
                                                        </a>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </>
                                )}


                                {previewData.products.length > 0 && (
                                    <>
                                        <p className="text-gray-700 mb-2"><strong>Products:</strong></p>
                                        <ul className="mb-2">
                                            {previewData.products.map((entry, index) => (
                                                <li key={index} className="text-blue-500 mb-1">
                                                    <a href={entry.url} target="_blank" rel="noopener noreferrer">
                                                        {entry.name}
                                                    </a>
                                                    <p className="text-gray-600">{entry.description}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            {cardId && (
                                <div className="flex gap-5 items-center">
                                    <QRCode value={`${window.location.origin}/cards/${cardId}`} />
                                    <button
                                        onClick={handleCopyLink}
                                        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                                    >
                                        Copy Link
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <CustomModal
                visible={modalVisible}
                title={modalMessage.title}
                message={modalMessage.message}
                type={modalMessage.type}
                onClose={() => setModalVisible(false)}
            />

        </>
    );
}
