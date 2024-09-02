import Image from "next/legacy/image";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [darkMode, setDarkMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        title: "",
        email: "",
        phone: "",
        logo: null,
        cover: null,
    });
    const [previewData, setPreviewData] = useState({
        name: "John Doe",
        title: "Software Engineer",
        email: "[email protected]",
        phone: "+1 (555) 123-4567",
        logo: null,
        cover: null,
    });
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    useEffect(() => {
        setPreviewData((prevData) => ({
            ...prevData,
            ...formData,
            email: formData.email.replace("@", "[at]").replace(".", "[dot]"),
            logo: formData.logo ? URL.createObjectURL(formData.logo) : null,
            cover: formData.cover ? URL.createObjectURL(formData.cover) : null,
        }));
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        const response = await fetch('/api/saveCard', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        if (result.id) {
            router.push(`/card/${result.id}`);
        }
    };

    return (
        <main className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
            <div className="flex  mx-auto gap-6">
                <div className="flex flex-col items-start mt-12 mb-16 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0">
                    <h2 className="mb-8 text-4xl font-bold leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-5xl">Create Your Digital Business Card</h2>
                    <form id="cardForm" onSubmit={handleSubmit} className="w-full">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" id="name" name="name" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
                            <input type="text" id="title" name="title" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" name="email" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                            <input type="text" id="phone" name="phone" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Logo</label>
                            <input type="file" id="logo" name="logo" accept="image/*" onChange={handleChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cover" className="block text-sm font-medium text-gray-700">Cover Photo</label>
                            <input type="file" id="cover" name="cover" accept="image/*" onChange={handleChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
                        </div>
                        <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save Card</button>
                    </form>
                </div>

                <div className="flex flex-col relative items-start mt-8 mb-10 text-left lg:flex-grow lg:w-1/2 md:mb-0 xl:mt-0 bg-white rounded-3xl shadow-lg">
                    {previewData.cover ? (
                        <div id="previewCover" className="w-full h-72 rounded-t-3xl bg-cover bg-no-repeat" style={{ backgroundImage: `url(${previewData.cover})` }}></div>
                    ) : (
                        <div id="previewCover" className="w-full h-72 rounded-t-3xl bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">Cover Photo Placeholder</span>
                        </div>
                    )}



                    {previewData.logo ? (
                        <div id="previewLogo" className="ml-6 rounded-full right-20 w-20 h-20 bg-cover bg-no-repeat animation-delay-4000" style={{ backgroundImage: `url(${previewData.logo})` }}></div>
                    ) : (
                        <div id="previewLogo" className=" m-6 rounded-full bg-gray-200 -bottom-24 right-20 w-20 h-20 flex items-center justify-center">
                            <span className="text-gray-500">Logo</span>
                        </div>
                    )}

                    <div className="p-5 ml-6">
                        {/* <h2 className="mb-3 text-xl font-bold leading-none tracking-tighter text-neutral-600 md:text-3xl lg:text-xl">Preview</h2> */}
                        <div className="w-full">
                            <div className="w-full">
                            <h2 className="mb-3 text-xl font-bold leading-none tracking-tighter text-neutral-600 md:text-3xl lg:text-xl">{previewData.name}</h2>
                                <div id="previewTitle" className="object-cover object-center mx-auto rounded-lg shadow-2xl">{previewData.title}</div>
                                <div className="flex flex-col w-full">
                                    <div id="previewEmail" className="">{previewData.email}</div>
                                    <div id="previewPhone" className="">{previewData.phone}</div>
                                </div>
                            </div>
                        </div>
                        <h3 className="mb-8 text-xl font-bold leading-none tracking-tighter text-neutral-600 md:text-3xl lg:text-3xl">Share Your Card</h3>
                        <div className="flex flex-wrap w-full mt-2 text-left">
                            <button id="copyLink" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Copy Link</button>
                            <button id="downloadVCF" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Download vCard</button>
                            <button id="generateQR" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Generate QR Code</button>
                        </div>
                        <div id="qrCode" className="relative w-full max-w-lg"></div>
                    </div>

                </div>

                {/* <div className="flex flex-col items-start mt-12 mb-16 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0">
                    <h3 className="mb-8 text-4xl font-bold leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-5xl">Go Green with Digital Business Cards</h3>
                    <p className="mb-8 text-base leading-relaxed text-left text-gray-500">By choosing 3wc_DigiCard, you&apos;re helping reduce paper waste and contributing to a more sustainable future.</p>
                </div> */}
            </div>
        </main>
    );
}