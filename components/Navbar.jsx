import { useState } from 'react';
import Link from 'next/link';

export default function Navbar({ currentUser, showAuthPopup }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <header className="bg-gray-800 rounded-lg hover:shadow-xl text-white z-50 absolute">
            <div className="container mx-auto flex justify-between items-center py-4 px-4">
                <h1 className="text-2xl font-bold">3wc DigiCard</h1>
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="px-4 py-2 rounded-lg shadow hover:bg-gray-700 focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
                <nav className="hidden md:flex gap-4 items-center">
                    {currentUser ? (
                        <>
                            <span className="block">Welcome, {currentUser.username}!</span>
                            <Link href="/logout">
                                <a className="px-4 py-2 text-white bg-red-600 rounded-lg shadow hover:bg-red-700">Logout</a>
                            </Link>
                            <Link href="/create-card">
                                <a className="px-4 py-2 text-white bg-green-600 rounded-lg shadow hover:bg-green-700">Create Card</a>
                            </Link>
                        </>
                    ) : (
                        <>
                            <button onClick={() => { showAuthPopup(true); }} className="px-4 py-2 text-white bg-yellow-400 rounded-lg shadow hover:bg-yellow-500">Login</button>
                            <button onClick={() => { showAuthPopup(false); }} className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700">Register</button>
                        </>
                    )}
                </nav>
            </div>
            {menuOpen && (
                <div className="md:hidden">
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-10" onClick={toggleMenu}></div>
                    <div className="fixed top-0 right-0 bg-gray-800 w-64 h-full z-20 p-8">
                        <button onClick={toggleMenu} className="absolute top-4 right-4 text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <div className="flex flex-col gap-4 mt-12">
                            {currentUser ? (
                                <>
                                    <span className="block">Welcome, {currentUser.username}!</span>
                                    <Link href="/logout">
                                        <a className="px-4 py-2 text-white bg-red-600 rounded-lg shadow hover:bg-red-700">Logout</a>
                                    </Link>
                                    <Link href="/create-card">
                                        <a className="px-4 py-2 text-white bg-green-600 rounded-lg shadow hover:bg-green-700">Create Card</a>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => { showAuthPopup(true); }} className="px-4 py-2 text-white bg-yellow-400 rounded-lg shadow hover:bg-yellow-500">Login</button>
                                    <button onClick={() => { showAuthPopup(false); }} className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700">Register</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
