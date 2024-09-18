import { Link } from 'lucide-react'
import React from 'react'
import { useState, useEffect } from 'react';

export default function Form({
    csrfToken,
    handleSubmit,
    formState,
    handleInputChange,
    handleFileChange,
    addSocialMediaEntry,
    handleSocialMediaChange
}) {
    return (
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
                    {/* <h2 className="text-2xl font-semibold text-gray-700">Products</h2>
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
            </button> */}

                    {/* {userData && (
                <Button
                    variant="default"
                    className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                    onClick={openModal}
                >
                    Add Product
                </Button>
            )} */}
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
    )
}
