// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import QRCode from 'qrcode.react';

// export default function CreateCard({ csrfToken }) {
//     const [formState, setFormState] = useState({
//         firstName: '',
//         lastName: '',
//         jobTitle: '',
//         email: '',
//         phone: '',
//         logo: null,
//         profilePicture: null,
//         socialMedia: [],
//         products: [],
//     });

//     const [previewData, setPreviewData] = useState({
//         firstName: 'John',
//         lastName: 'Doe',
//         jobTitle: 'Software Engineer',
//         email: 'john.doe[at]example[dot]com',
//         phone: '+1 (555) 123-4567',
//         logo: null,
//         profilePicture: null,
//         socialMedia: [],
//         products: [],
//     });

//     const [cardId, setCardId] = useState(null);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormState((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleFileChange = (e) => {
//         const { name, files } = e.target;
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setFormState((prevState) => ({
//                 ...prevState,
//                 [name]: reader.result.split(',')[1], // Get base64 string
//             }));
//         };
//         reader.readAsDataURL(files[0]);
//     };

//     const addSocialMediaEntry = () => {
//         setFormState((prevState) => ({
//             ...prevState,
//             socialMedia: [...prevState.socialMedia, { platform: '', url: '' }],
//         }));
//     };

//     const removeSocialMediaEntry = (index) => {
//         setFormState((prevState) => ({
//             ...prevState,
//             socialMedia: prevState.socialMedia.filter((_, i) => i !== index),
//         }));
//     };

//     const addProductEntry = () => {
//         setFormState((prevState) => ({
//             ...prevState,
//             products: [...prevState.products, { name: '', description: '', url: '' }],
//         }));
//     };

//     const removeProductEntry = (index) => {
//         setFormState((prevState) => ({
//             ...prevState,
//             products: prevState.products.filter((_, i) => i !== index),
//         }));
//     };

//     const handleSocialMediaChange = (index, field, value) => {
//         const newSocialMedia = [...formState.socialMedia];
//         newSocialMedia[index][field] = value;
//         setFormState((prevState) => ({
//             ...prevState,
//             socialMedia: newSocialMedia,
//         }));
//     };

//     const handleProductChange = (index, field, value) => {
//         const newProducts = [...formState.products];
//         newProducts[index][field] = value;
//         setFormState((prevState) => ({
//             ...prevState,
//             products: newProducts,
//         }));
//     };

//     useEffect(() => {
//         setPreviewData((prevData) => ({
//             ...prevData,
//             ...formState,
//             email: formState.email.replace('@', '[at]').replace('.', '[dot]'),
//             logo: formState.logo ? `data:image/jpeg;base64,${formState.logo}` : null,
//             profilePicture: formState.profilePicture ? `data:image/jpeg;base64,${formState.profilePicture}` : null,
//         }));
//     }, [formState]);


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = {
//             ...formState,
//             csrf_token: csrfToken,
//             social_media: JSON.stringify(formState.socialMedia),
//         };

//         try {
//             const response = await fetch('/api/backed/create-card', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             const data = await response.json();

//             if (data.success) {
//                 setCardId(data.card_url);

//                 // Send product information
//                 for (const product of formState.products) {
//                     await fetch('/api/backed/create-product', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify({
//                             ...product,
//                             businessCardId: data.card_id, // Use the card ID returned from the card creation response
//                         }),
//                     });
//                 }

//                 alert(`Your Digital Business Card URL: ${data.card_url}`);
//             } else {
//                 alert(`Error: ${data.message}`);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('An error occurred. Please try again.');
//         }
//     };



//     const handleCopyLink = () => {
//         const link = `${window.location.origin}/card/${cardId}`;
//         navigator.clipboard.writeText(link).then(() => {
//             alert('Link copied to clipboard!');
//         });
//     };

//     return (
//         <div className="container mx-auto p-5 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
//             <div className="form-section flex-1 lg:pr-5 mb-5 lg:mb-0">
//                 <h1 className="text-3xl mb-6 font-semibold text-gray-700">Create Your Digital Business Card</h1>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <input type="hidden" name="csrf_token" value={csrfToken} />
//                     <div className="space-y-4">
//                         <h2 className="text-2xl font-semibold text-gray-700">Personal Information</h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                             <div>
//                                 <label htmlFor="firstName" className="block text-gray-600">First Name</label>
//                                 <input
//                                     type="text"
//                                     id="firstName"
//                                     name="firstName"
//                                     className="w-full p-2 mt-2 border rounded"
//                                     value={formState.firstName}
//                                     onChange={handleInputChange}
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="lastName" className="block text-gray-600">Last Name</label>
//                                 <input
//                                     type="text"
//                                     id="lastName"
//                                     name="lastName"
//                                     className="w-full p-2 mt-2 border rounded"
//                                     value={formState.lastName}
//                                     onChange={handleInputChange}
//                                     required
//                                 />
//                             </div>
//                         </div>
//                         <div>
//                             <label htmlFor="jobTitle" className="block text-gray-600">Job Title</label>
//                             <input
//                                 type="text"
//                                 id="jobTitle"
//                                 name="jobTitle"
//                                 className="w-full p-2 mt-2 border rounded"
//                                 value={formState.jobTitle}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                             <div>
//                                 <label htmlFor="email" className="block text-gray-600">Email</label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     name="email"
//                                     className="w-full p-2 mt-2 border rounded"
//                                     value={formState.email}
//                                     onChange={handleInputChange}
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="phone" className="block text-gray-600">Phone</label>
//                                 <input
//                                     type="tel"
//                                     id="phone"
//                                     name="phone"
//                                     className="w-full p-2 mt-2 border rounded"
//                                     value={formState.phone}
//                                     onChange={handleInputChange}
//                                     required
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="space-y-4">
//                         <h2 className="text-2xl font-semibold text-gray-700">Business Logo and Profile Picture</h2>
//                         <div>
//                             <label htmlFor="logo" className="block text-gray-600">Business Logo</label>
//                             <input
//                                 type="file"
//                                 id="logo"
//                                 name="logo"
//                                 className="w-full p-2 mt-2 border rounded"
//                                 accept="image/*"
//                                 onChange={handleFileChange}
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="profilePicture" className="block text-gray-600">Profile Picture</label>
//                             <input
//                                 type="file"
//                                 id="profilePicture"
//                                 name="profilePicture"
//                                 className="w-full p-2 mt-2 border rounded"
//                                 accept="image/*"
//                                 onChange={handleFileChange}
//                             />
//                         </div>
//                     </div>

//                     <div className="space-y-4">
//                         <h2 className="text-2xl font-semibold text-gray-700">Social Media</h2>
//                         <div className="space-y-4">
//                             {formState.socialMedia.map((entry, index) => (
//                                 <div key={index} className="border p-4 rounded-lg bg-white shadow">
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                         <select
//                                             value={entry.platform}
//                                             className="w-full p-2 mt-2 border rounded"
//                                             onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
//                                         >
//                                             <option value="Facebook">Facebook</option>
//                                             <option value="Instagram">Instagram</option>
//                                             <option value="Twitter">Twitter</option>
//                                             <option value="LinkedIn">LinkedIn</option>
//                                         </select>
//                                         <input
//                                             type="url"
//                                             className="w-full p-2 mt-2 border rounded"
//                                             placeholder="Profile URL"
//                                             value={entry.url}
//                                             onChange={(e) => handleSocialMediaChange(index, 'url', e.target.value)}
//                                         />
//                                     </div>
//                                     <button
//                                         type="button"
//                                         className="mt-2 text-red-600"
//                                         onClick={() => removeSocialMediaEntry(index)}
//                                     >
//                                         Remove
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                         <button
//                             type="button"
//                             className="mt-4 p-2 bg-blue-600 text-white rounded"
//                             onClick={addSocialMediaEntry}
//                         >
//                             Add Social Media
//                         </button>
//                     </div>

//                     <div className="space-y-4">
//                         <h2 className="text-2xl font-semibold text-gray-700">Products or Services</h2>
//                         <div className="space-y-4">
//                             {formState.products.map((entry, index) => (
//                                 <div key={index} className="border p-4 rounded-lg bg-white shadow">
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                         <input
//                                             type="text"
//                                             className="w-full p-2 mt-2 border rounded"
//                                             placeholder="Product/Service Name"
//                                             value={entry.name}
//                                             onChange={(e) => handleProductChange(index, 'name', e.target.value)}
//                                         />
//                                         <input
//                                             type="url"
//                                             className="w-full p-2 mt-2 border rounded"
//                                             placeholder="URL"
//                                             value={entry.url}
//                                             onChange={(e) => handleProductChange(index, 'url', e.target.value)}
//                                         />
//                                     </div>
//                                     <textarea
//                                         className="w-full p-2 mt-2 border rounded"
//                                         placeholder="Description"
//                                         value={entry.description}
//                                         onChange={(e) => handleProductChange(index, 'description', e.target.value)}
//                                     />
//                                     <button
//                                         type="button"
//                                         className="mt-2 text-red-600"
//                                         onClick={() => removeProductEntry(index)}
//                                     >
//                                         Remove
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                         <button
//                             type="button"
//                             className="mt-4 p-2 bg-blue-600 text-white rounded"
//                             onClick={addProductEntry}
//                         >
//                             Add Product/Service
//                         </button>
//                     </div>

//                     <div className="text-center">
//                         <button
//                             type="submit"
//                             className="mt-6 p-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700"
//                         >
//                             Create Digital Business Card
//                         </button>
//                     </div>
//                 </form>
//             </div>

//             <div className="preview-section flex-1 lg:pl-5">
//                 <h2 className="text-3xl mb-6 font-semibold text-gray-700 text-center">Preview</h2>
//                 <div className="border p-5 rounded-lg bg-white shadow-lg">
//                     <div className="flex flex-col items-center space-y-4">
//                         {previewData.profilePicture && (
//                             <Image
//                                 src={previewData.profilePicture}
//                                 alt="Profile Picture"
//                                 width={150}
//                                 height={150}
//                                 className="rounded-full"
//                             />
//                         )}
//                         <div className="text-center">
//                             <h3 className="text-2xl font-semibold text-gray-700">{`${previewData.firstName} ${previewData.lastName}`}</h3>
//                             <p className="text-lg text-gray-500">{previewData.jobTitle}</p>
//                             <p className="text-lg text-gray-500">{previewData.email}</p>
//                             <p className="text-lg text-gray-500">{previewData.phone}</p>
//                         </div>
//                         {previewData.logo && (
//                             <Image
//                                 src={previewData.logo}
//                                 alt="Logo"
//                                 width={150}
//                                 height={150}
//                                 className="object-contain"
//                             />
//                         )}
//                     </div>

//                     <div className="mt-6">
//                         <h3 className="text-xl font-semibold text-gray-700">Social Media</h3>
//                         <ul className="mt-2 space-y-2">
//                             {previewData.socialMedia.map((entry, index) => (
//                                 <li key={index} className="text-lg text-blue-600 hover:underline">
//                                     <a href={entry.url} target="_blank" rel="noopener noreferrer">
//                                         {entry.platform}
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     <div className="mt-6">
//                         <h3 className="text-xl font-semibold text-gray-700">Products or Services</h3>
//                         <ul className="mt-2 space-y-2">
//                             {previewData.products.map((entry, index) => (
//                                 <li key={index} className="text-lg text-gray-600">
//                                     <p className="font-semibold">{entry.name}</p>
//                                     <p className="text-gray-500">{entry.description}</p>
//                                     <a href={entry.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//                                         Learn more
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     <div className="mt-6 flex justify-center">
//                         {cardId && (
//                             <>
//                                 <QRCode value={`${window.location.origin}/card/${cardId}`} />
//                                 <button
//                                     type="button"
//                                     className="ml-4 p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
//                                     onClick={handleCopyLink}
//                                 >
//                                     Copy Link
//                                 </button>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }














import { useState, useEffect } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode.react';

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

    const [cardId, setCardId] = useState(null);

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
            email: formState.email.replace('@', '[at]').replace('.', '[dot]'),
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
                setCardId(data.card_url);

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

                alert(`Your Digital Business Card URL: ${data.card_url}`);
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleCopyLink = () => {
        const link = `${window.location.origin}/card/${cardId}`;
        navigator.clipboard.writeText(link).then(() => {
            alert('Link copied to clipboard!');
        });
    };

    return (
        <div className="container mx-auto p-5 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
            {/* Form Section */}
            <div className="flex-1 lg:pr-5 mb-5 lg:mb-0">
                <h1 className="text-3xl mb-6 font-semibold text-gray-700">Create Your Digital Business Card</h1>
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
                                <div className="bg-gray-200 w-full h-full rounded-full"></div>
                            )}
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="mb-4">
                        {previewData.logo && (
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
                                    <ul className="mb-2">
                                        {previewData.socialMedia.map((entry, index) => (
                                            <li key={index} className="text-blue-500 mb-1">
                                                <a href={entry.url} target="_blank" rel="noopener noreferrer">
                                                    {entry.platform}
                                                </a>
                                            </li>
                                        ))}
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
                            <button
                                onClick={handleCopyLink}
                                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                            >
                                Copy Link
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
