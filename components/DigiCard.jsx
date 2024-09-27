import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import CustomModal from './CustomModal';

export default function DigiCard({ currentUser, csrfToken }) {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [authPopupVisible, setAuthPopupVisible] = useState(false);
    const [theme, setTheme] = useState('light-mode');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('success');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [authLoading, setAuthLoading] = useState(false);

    const toggleTheme = () => {
        setTheme(prevTheme => {
            if (prevTheme === 'light-mode') return 'dark-mode';
            if (prevTheme === 'dark-mode') return 'third-mode';
            return 'light-mode';
        });
    };

    const demoData = {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'HkU7t@example.com',
        phone: '123-456-7890',
        logo: 'logo.png',
        profile_picture: 'profile.png',
    };

    // useEffect(() => {
    //     let storedUser = JSON.parse(localStorage.getItem('osunUserData'));

    //     if (!storedUser) {
    //         localStorage.setItem('osunUserData', JSON.stringify(demoData));
    //     } else {
    //         setUserData(storedUser);
    //     }
    // }, [userData]);


    useEffect(() => {
        let storedUser = JSON.parse(localStorage.getItem('osunUserData'));
    
        if (!storedUser) {
            localStorage.setItem('osunUserData', JSON.stringify(demoData));
            setUserData(demoData); // Set the demo data for the first time
        } else {
            setUserData(storedUser); // Set stored user data if available
        }
    }, []);  // Empty dependency array to run this effect only once when the component mounts
    

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

            console.log(data);
            setModalTitle(data.success ? 'Success' : 'Error');
            setModalMessage(data.message);
            setModalType(data.success ? 'success' : 'error');
            setModalVisible(true);

            if (data.success) {
                setUserData(data.data);
                localStorage.setItem('osunUserData', JSON.stringify(data.data)); // Store user data in localStorage
                if (isLoginMode) {
                    window.location.href = '/profile/profile'; // Redirect to profile page after successful login
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
        <>
            <div className={`h-screen relative p-4`}>
                <div className="-z-30 absolute top-0 rounded-full bg-violet-300 right-12 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="-z-30 absolute rounded-full bg-fuchsia-300 -bottom-24 left-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="container mx-auto px-4 py-4 max-w-7xl sm:px-6 lg:px-24">
                    <Navbar currentUser={currentUser} showAuthPopup={showAuthPopup} />

                    <main className="text-center my-8">
                        <h2 className="text-4xl font-bold mb-8">Create Your Own Digital Business</h2>
                        <p className="text-lg mb-12 text-gray-600">Showcase your brand, connect instantly with a tap and generate profitable leads.</p>
                        {!currentUser && (
                            <div onClick={() => showAuthPopup(true)} className="relative inline-flex items-center justify-center gap-4 group">
                                <div
                                    className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200">
                                </div>
                                <p title="Get Started"
                                    className="group relative inline-flex items-center justify-center text-base rounded-xl bg-blue-500 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
                                    role="button">Get Started<svg className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2" fill="none" width="10"
                                        height="10" viewBox="0 0 10 10" aria-hidden="true">
                                        <path className="transition opacity-0 group-hover:opacity-100" d="M0 5h7"></path>
                                        <path className="transition group-hover:translate-x-[3px]" d="M1 1l4 4-4 4"></path>
                                    </svg>
                                </p>
                            </div>
                        )}
                    </main>

                    <section>
                        <div className="flex flex-wrap justify-around">
                            <div className="flex-1 max-w-xs bg-gray-100/50 p-6 m-2 rounded-lg shadow">
                                <h4 className="text-xl font-semibold text-blue-600 mb-4">Unlock Osun&apos;s Potential</h4>
                                <p>Embark on your digital entrepreneurship journey with our carefully curated selection of customizable templates. Designed specifically to empower the creative minds of Osun State, our platform aims to fuel your success and drive economic prosperity throughout our thriving community.</p>
                            </div>
                            <div className="flex-1 max-w-xs bg-gray-100/50 p-6 m-2 rounded-lg shadow">
                                <h4 className="text-xl font-semibold text-blue-600 mb-4">Interactive Elements</h4>
                                <p>Add clickable links, contact buttons, and social media profiles to engage your audience. Create a dynamic digital presence that represents your brand and facilitates meaningful connections.</p>
                            </div>
                            <div className="flex-1 max-w-xs bg-gray-100/50 p-6 m-2 rounded-lg shadow">
                                <h4 className="text-xl font-semibold text-blue-600 mb-4">Easy Sharing</h4>
                                <p>Share your digital card via QR code, email, or direct link with just a few clicks. Expand your reach and make networking effortless in today&apos;s fast-paced digital landscape.</p>
                            </div>
                        </div>
                    </section>

                    <footer className="text-center my-8">
                        <p className="text-gray-600">Go Green with Digital Business Cards - Save trees and make connections!</p>
                    </footer>
                </div>

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
            </div>


                        {/* Spinner CSS */}
                        <style jsx>{`
                .spinner {
                    border: 4px solid rgba(0, 0, 0, 0.1);
                    border-radius: 50%;
                    border-top-color: #3498db;
                    animation: spin 1s ease infinite;
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </>
    );
}
