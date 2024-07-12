import { useState } from 'react';
import Navbar from './Navbar';

export default function DigiCard({ currentUser, csrfToken }) {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [authPopupVisible, setAuthPopupVisible] = useState(false);
    const [theme, setTheme] = useState('light-mode');

    const toggleTheme = () => {
        setTheme(prevTheme => {
            if (prevTheme === 'light-mode') return 'dark-mode';
            if (prevTheme === 'dark-mode') return 'third-mode';
            return 'light-mode';
        });
    };

    const showAuthPopup = (loginMode) => {
        setIsLoginMode(loginMode);
        setAuthPopupVisible(true);
    };
    const hideAuthPopup = () => setAuthPopupVisible(false);
    const switchAuthMode = () => setIsLoginMode(!isLoginMode);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                    username: formData.get('username'),
                    password: formData.get('password'),
                }),
            });
            const data = await response.json();
            alert(data.message);
            if (data.success && isLoginMode) {
                window.location.href = '/create-card'; // Redirect to create card page after successful login
            } else {
                setIsLoginMode(true);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className={`min-h-screen relative ${theme}`}>

            <div className=" -z-30 absolute top-0 rounded-full bg-violet-300 right-12 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className=" -z-30 absolute rounded-full bg-fuchsia-300 -bottom-24 left-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            <div className="container mx-auto px-4 py-12 max-w-7xl sm:px-6 lg:px-24 lg:py-24">
                <Navbar currentUser={currentUser} showAuthPopup={showAuthPopup} />

                <main className="text-center my-16">
                    <h2 className="text-4xl font-bold mb-8">Create Your Own Digital Business Card</h2>
                    <p className="text-lg mb-12 text-gray-600">Showcase your brand, connect instantly with a tap and generate profitable leads.</p>
                    {!currentUser && (
                        <button
                            onClick={() => showAuthPopup(true)}
                            className="px-8 py-4 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none"
                        >
                            Get Started
                        </button>
                    )}
                </main>

                <section>
                    <h3 className="text-3xl font-semibold mb-8">Key Features</h3>
                    <div className="flex flex-wrap justify-around">
                        <div className="flex-1 max-w-xs bg-gray-100 p-6 m-2 rounded-lg shadow">
                            <h4 className="text-xl font-bold mb-2">Customizable Templates</h4>
                            <p>Choose from a variety of professional designs or create your own unique layout.</p>
                        </div>
                        <div className="flex-1 max-w-xs bg-gray-100 p-6 m-2 rounded-lg shadow">
                            <h4 className="text-xl font-bold mb-2">Interactive Elements</h4>
                            <p>Add clickable links, contact buttons, and social media profiles to engage your audience.</p>
                        </div>
                        <div className="flex-1 max-w-xs bg-gray-100 p-6 m-2 rounded-lg shadow">
                            <h4 className="text-xl font-bold mb-2">Easy Sharing</h4>
                            <p>Share your digital card via QR code, email, or direct link with just a few clicks.</p>
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
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg z-50">
                        <h2 className="text-xl font-semibold mb-4">{isLoginMode ? 'Login' : 'Register'}</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" name="csrf_token" value={csrfToken} />
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-sm font-medium mb-1">Username:</label>
                                <input type="text" id="username" name="username" required className="w-full px-3 py-2 border rounded" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium mb-1">Password:</label>
                                <input type="password" id="password" name="password" required className="w-full px-3 py-2 border rounded" />
                            </div>
                            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none">Submit</button>
                        </form>
                        <div className="text-center mt-4">
                            <p>{isLoginMode ? "Don't have an account?" : "Already have an account?"} <a href="#" onClick={(e) => { e.preventDefault(); switchAuthMode(); }} className="text-blue-600">{isLoginMode ? 'Register' : 'Login'}</a></p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}








