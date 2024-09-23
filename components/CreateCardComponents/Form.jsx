// import { Link } from 'lucide-react';
// import React, { useState } from 'react';
// import { Button } from '../ui/button';

// export default function Form({
//     csrfToken,
//     handleSubmit,
//     formState,
//     handleInputChange,
//     handleFileChange,
//     addSocialMediaEntry,
//     handleSocialMediaChange
// }) {
//     const [errorMessage, setErrorMessage] = useState('');

//     // Function to check image size
//     const checkImageSize = (file) => {
//         const maxSize = 2 * 1024 * 1024; // 2MB in bytes
//         if (file.size > maxSize) {
//             setErrorMessage('File size should not exceed 2MB');
//             return false;
//         }
//         setErrorMessage('');
//         return true;
//     };

//     const handleFileInput = (e) => {
//         const file = e.target.files[0];
//         if (file && checkImageSize(file)) {
//             handleFileChange(e);
//         }
//     };

//     return (
//         <div className="flex-1 lg:pr-5 mb-5 lg:mb-0">
//             <div className="flex justify-between items-center mb-6 bg-gray-800 rounded-lg hover:shadow-xl text-white z-50 p-6">
//                 <h1 className="text-3xl font-semibold">Create Your Digital Business Card</h1>
//                 <ul className="flex gap-2 items-center justify-center">
//                     {/* <li className="hover:text-green-500"><Link href={'/'}>Home</Link></li>
//                     <li className="hover:text-green-500"><Link href={'/profile/profile'}>Profile</Link></li>
//                     <li className="hover:text-green-500"><Link href={'/directories/products'}>Products</Link></li>
//                     <li className="hover:text-green-500"><Link href={'/directories/business-cards'}>Cards</Link></li> */}
//                 </ul>
//             </div>
//             <form onSubmit={handleSubmit} className="space-y-6">
//                 <input type="hidden" name="csrf_token" value={csrfToken} />

//                 {/* Personal Information */}
//                 <div className="space-y-4">
//                     <h2 className="text-2xl font-semibold text-gray-700">Personal Information</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div>
//                             <label htmlFor="firstName" className="block text-gray-600">First Name</label>
//                             <input
//                                 type="text"
//                                 id="firstName"
//                                 name="firstName"
//                                 className="w-full p-2 mt-2 border rounded"
//                                 value={formState.firstName}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="lastName" className="block text-gray-600">Last Name</label>
//                             <input
//                                 type="text"
//                                 id="lastName"
//                                 name="lastName"
//                                 className="w-full p-2 mt-2 border rounded"
//                                 value={formState.lastName}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <div>
//                         <label htmlFor="jobTitle" className="block text-gray-600">Job Title</label>
//                         <input
//                             type="text"
//                             id="jobTitle"
//                             name="jobTitle"
//                             className="w-full p-2 mt-2 border rounded"
//                             value={formState.jobTitle}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div>
//                             <label htmlFor="email" className="block text-gray-600">Email</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 className="w-full p-2 mt-2 border rounded"
//                                 value={formState.email}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="phone" className="block text-gray-600">Phone</label>
//                             <input
//                                 type="tel"
//                                 id="phone"
//                                 name="phone"
//                                 className="w-full p-2 mt-2 border rounded"
//                                 value={formState.phone}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Business Logo and Profile Picture */}
//                 <div className="space-y-4">
//                     <h2 className="text-2xl font-semibold text-gray-700">Business Logo and Profile Picture</h2>
//                     {errorMessage && (
//                         <p className="text-red-500">{errorMessage}</p>
//                     )}
//                     <div>
//                         <label htmlFor="logo" className="block text-gray-600">Business Logo</label>
//                         <input
//                             type="file"
//                             id="logo"
//                             name="logo"
//                             className="w-full p-2 mt-2 border rounded"
//                             accept="image/*"
//                             onChange={handleFileInput}
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="profilePicture" className="block text-gray-600">Profile Picture</label>
//                         <input
//                             type="file"
//                             id="profilePicture"
//                             name="profilePicture"
//                             className="w-full p-2 mt-2 border rounded"
//                             accept="image/*"
//                             onChange={handleFileInput}
//                         />
//                     </div>
//                 </div>

//                 {/* Social Media */}
//                 <div className="space-y-4">
//                     <h2 className="text-2xl font-semibold text-gray-700">Social Media</h2>
//                     <div className="space-y-4">
//                         {formState.socialMedia.map((entry, index) => (
//                             <div key={index} className="border p-4 rounded-lg bg-white shadow">
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                     <select
//                                         value={entry.platform}
//                                         className="w-full p-2 mt-2 border rounded"
//                                         onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
//                                     >
//                                         <option value="Facebook">Facebook</option>
//                                         <option value="Instagram">Instagram</option>
//                                         <option value="Twitter">Twitter</option>
//                                         <option value="LinkedIn">LinkedIn</option>
//                                     </select>
//                                     <input
//                                         type="url"
//                                         className="w-full p-2 mt-2 border rounded"
//                                         placeholder="Profile URL"
//                                         value={entry.url}
//                                         onChange={(e) => handleSocialMediaChange(index, 'url', e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <button
//                                     type="button"
//                                     className="mt-2 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
//                                     onClick={() => removeSocialMediaEntry(index)}
//                                 >
//                                     Remove
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                     <Button
//                         type="button"
//                         className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
//                         onClick={addSocialMediaEntry}
//                     >
//                         Add Social Media
//                     </Button>
//                 </div>

//                 {/* Submit Button */}
//                 <Button
//                     type="submit"
//                     className="w-full py-3 mt-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
//                 >
//                     Create Digital Business Card
//                 </Button>
//             </form>
//         </div>
//     );
// }







import { Link } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';

export default function Form({
    csrfToken,
    handleSubmit,
    formState,
    handleInputChange,
    handleFileChange,
    addSocialMediaEntry,
    handleSocialMediaChange,
    removeSocialMediaEntry
}) {
    const [errorMessage, setErrorMessage] = useState('');

    // Function to check image size
    const checkImageSize = (file) => {
        const maxSize = 2 * 1024 * 1024; // 2MB in bytes
        if (file.size > maxSize) {
            setErrorMessage('File size should not exceed 2MB');
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file && checkImageSize(file)) {
            handleFileChange(e);
        }
    };

    return (
        <div className="flex-1 lg:pr-5 mb-5 lg:mb-0">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg text-white z-50 p-6">
                <h1 className="text-4xl font-bold">Create Your Digital Business Card</h1>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 shadow-md rounded-xl">
                <input type="hidden" name="csrf_token" value={csrfToken} />

                {/* Personal Information */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="firstName" className="block text-gray-600">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={formState.jobTitle}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="email" className="block text-gray-600">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={formState.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* File Upload Section */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Business Logo and Profile Picture</h2>
                    {errorMessage && (
                        <p className="text-red-500">{errorMessage}</p>
                    )}
                    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
                        <div className="flex flex-col items-center border-dashed border-2 border-gray-400 p-4 rounded-lg transition hover:border-green-500 cursor-pointer">
                            <label htmlFor="logo" className="text-gray-600">Business Logo</label>
                            <input
                                type="file"
                                id="logo"
                                name="logo"
                                className="opacity-0 absolute"
                                accept="image/*"
                                onChange={handleFileInput}
                            />
                            <div className="flex flex-col items-center space-y-2">
                                <span className="text-sm text-gray-500">Click to upload</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4v8z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-col items-center border-dashed border-2 border-gray-400 p-4 rounded-lg transition hover:border-green-500 cursor-pointer">
                            <label htmlFor="profilePicture" className="text-gray-600">Profile Picture</label>
                            <input
                                type="file"
                                id="profilePicture"
                                name="profilePicture"
                                className="opacity-0 absolute"
                                accept="image/*"
                                onChange={handleFileInput}
                            />
                            <div className="flex flex-col items-center space-y-2">
                                <span className="text-sm text-gray-500">Click to upload</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4v8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media Section */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Social Media</h2>
                    <div className="space-y-4">
                        {formState.socialMedia.map((entry, index) => (
                            <div key={index} className="border border-gray-300 p-4 rounded-lg bg-gray-50 shadow-sm">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <select
                                        value={entry.platform}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
                                    >
                                        <option value="Facebook">Facebook</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="Twitter">Twitter</option>
                                        <option value="LinkedIn">LinkedIn</option>
                                    </select>
                                    <input
                                        type="url"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Profile URL"
                                        value={entry.url}
                                        onChange={(e) => handleSocialMediaChange(index, 'url', e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="mt-4 py-2 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                                    onClick={() => removeSocialMediaEntry(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <Button
                        type="button"
                        className="mt-6 py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                        onClick={addSocialMediaEntry}
                    >
                        Add Social Media
                    </Button>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full py-3 mt-8 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                >
                    Create Digital Business Card
                </Button>
            </form>
        </div>
    );
}
