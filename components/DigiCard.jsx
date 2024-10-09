import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import CustomModal from './CustomModal';
import Image from 'next/image';

export default function DigiCard({ currentUser, csrfToken }) {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [authPopupVisible, setAuthPopupVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('success');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [authLoading, setAuthLoading] = useState(false);

    const demoData = {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'HkU7t@example.com',
        phone: '123-456-7890',
        logo: 'logo.png',
        profile_picture: 'profile.png',
    };

    useEffect(() => {
        let storedUser = JSON.parse(localStorage.getItem('osunUserData'));
        if (!storedUser) {
            localStorage.setItem('osunUserData', JSON.stringify(demoData));
            setUserData(demoData);
        } else {
            setUserData(storedUser);
        }
    }, []);

    const showAuthPopup = (loginMode) => {
        setIsLoginMode(loginMode);
        setAuthPopupVisible(true);
        setAuthLoading(true);
        setTimeout(() => {
            setAuthLoading(false);
        }, 500);
    };

    const hideAuthPopup = () => setAuthPopupVisible(false);
    const switchAuthMode = () => setIsLoginMode(!isLoginMode);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const url = isLoginMode ? '/api/backed/login' : '/api/backed/register';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify({
                    email: formData.get('email'),
                    password: formData.get('password'),
                    username: !isLoginMode ? formData.get('username') : undefined,
                    firstname: !isLoginMode ? formData.get('firstname') : undefined,
                    lastname: !isLoginMode ? formData.get('lastname') : undefined,
                    phone: !isLoginMode ? formData.get('phone') : undefined,
                    address: !isLoginMode ? formData.get('address') : undefined,
                }),
            });
            const data = await response.json();

            setModalTitle(data.success ? 'Success' : 'Error');
            setModalMessage(data.message);
            setModalType(data.success ? 'success' : 'error');
            setModalVisible(true);

            if (data.success) {
                setUserData(data.data);
                localStorage.setItem('osunUserData', JSON.stringify(data.data));
                if (isLoginMode) {
                    window.location.href = '/profile/profile';
                } else {
                    setIsLoginMode(true);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setModalTitle('Error');
            setModalMessage('An error occurred. Please try again.');
            setModalType('error');
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <Navbar currentUser={currentUser} showAuthPopup={showAuthPopup} />

            <div className="flex justify-center w-full">
                <div className="max-w-1/2">
                    <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">Create Your Own</span>{' '}
                                    <span className="block text-blue-600 xl:inline">Digital Business</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Showcase your brand, connect instantly with a tap, and generate profitable leads. Empower your business with our cutting-edge digital solutions.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    {!currentUser && (
                                        <div className="rounded-md shadow">
                                            <button
                                                onClick={() => showAuthPopup(true)}
                                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                                            >
                                                Get Started
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                {/* <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-red-400"> */}
                <div className="flex w-1/2 items-center justify-center">
                    <Image
                        // className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                        src="digicarding.svg"
                        height={350}
                        width={350}
                        alt="Digital Business"
                    />
                </div>
            </div>

            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Empower Your Digital Presence
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                            Discover the tools that will revolutionize your business networking and lead generation.
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            <div className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Customizable Templates</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">
                                    Choose from a wide range of professionally designed templates tailored for various industries. Personalize your digital card to reflect your unique brand identity.
                                </dd>
                            </div>

                            <div className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                        </svg>
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Interactive Elements</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">
                                    Engage your audience with clickable links, contact buttons, and social media profiles. Create a dynamic digital presence that facilitates meaningful connections.
                                </dd>
                            </div>

                            <div className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Easy Sharing</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">
                                    Share your digital card via QR code, email, or direct link with just a few clicks. Expand your reach and make networking effortless in today&lsquo;s fast-paced digital landscape.
                                </dd>
                            </div>

                            <div className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Secure Escrow Payments</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">
                                    Facilitate secure transactions with our integrated escrow payment system. Build trust with your clients and ensure smooth financial exchanges for your products or services.
                                </dd>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="bg-gray-800">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-base text-gray-400">
                        &copy; 2023 DigiCard. All rights reserved. Go Green with Digital Business Cards - Save trees and make connections!
                    </p>
                </div>
            </footer>

            {authPopupVisible && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={hideAuthPopup}></div>
                    <div className="fixed w-full max-w-md sm:max-w-lg md:max-w-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 sm:p-8 rounded-lg shadow-lg z-50 mx-2">
                        {authLoading ? (
                            <div className="flex justify-center items-center h-full">
                                <div className="spinner border-t-4 border-blue-500 rounded-full w-12 h-12"></div>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-xl font-semibold mb-4">{isLoginMode ? 'Login' : 'Register'}</h2>
                                <form onSubmit={handleSubmit}>
                                    <input type="hidden" name="csrf_token" value={csrfToken} />
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email:</label>
                                        <input type="email" name="email" id="email" required
                                            className="border border-gray-300 p-2 rounded-md w-full" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="password" className="block text-sm font-medium mb-1">Password:</label>
                                        <input type="password" name="password" id="password" required
                                            className="border border-gray-300 p-2 rounded-md w-full" />
                                    </div>

                                    {!isLoginMode && (
                                        <>
                                            <div className="mb-4">
                                                <label htmlFor="username" className="block text-sm font-medium mb-1">Username:</label>
                                                <input type="text" name="username" id="username"
                                                    className="border border-gray-300 p-2 rounded-md w-full" />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="firstname" className="block text-sm font-medium mb-1">First Name:</label>
                                                <input type="text" name="firstname" id="firstname"
                                                    className="border border-gray-300 p-2 rounded-md w-full" />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="lastname" className="block text-sm font-medium mb-1">Last Name:</label>
                                                <input type="text" name="lastname" id="lastname"
                                                    className="border border-gray-300 p-2 rounded-md w-full" />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone:</label>
                                                <input type="text" name="phone" id="phone"
                                                    className="border border-gray-300 p-2 rounded-md w-full" />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="address" className="block text-sm font-medium mb-1">Address:</label>
                                                <input type="text" name="address" id="address"
                                                    className="border border-gray-300 p-2 rounded-md w-full" />
                                            </div>
                                        </>
                                    )}

                                    <div className="flex justify-between items-center">
                                        <button type="submit"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                                            disabled={loading}>
                                            {loading ? <div className="spinner border-t-4 border-white rounded-full w-5 h-5"></div> : isLoginMode ? 'Login' : 'Register'}
                                        </button>
                                        <button type="button"
                                            className="text-sm text-blue-500 hover:underline"
                                            onClick={switchAuthMode}>
                                            {isLoginMode ? 'Switch to Register' : 'Switch to Login'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </>
            )}

            <CustomModal
                visible={modalVisible}
                title={modalTitle}
                message={modalMessage}
                type={modalType}
                onClose={() => setModalVisible(false)}
            />

            <style jsx>{`
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top-color: #3498db;
          animation: spin 1s ease infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}


