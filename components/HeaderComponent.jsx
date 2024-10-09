import Link from 'next/link';
import React, { useState } from 'react';
import { HiOutlineMenu, HiX } from 'react-icons/hi'; // Import icons for menu

export default function HeaderComponent({ title }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="w-full flex flex-col lg:flex-row justify-between items-center mb-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg text-white p-4 lg:p-6">
            {/* Logo or Title */}
            <div className="flex justify-between w-full lg:w-auto">
                <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
                {/* Hamburger menu button for smaller screens */}
                <button 
                    className="lg:hidden focus:outline-none text-3xl" 
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <HiX /> : <HiOutlineMenu />}
                </button>
            </div>

            {/* Navigation Links */}
            <nav className={`${menuOpen ? 'block' : 'hidden'} lg:flex flex-col lg:flex-row lg:items-center w-full lg:w-auto mt-4 lg:mt-0`}>
                <ul className="flex flex-col lg:flex-row lg:gap-4 w-full lg:w-auto">
                    <li className="hover:text-green-300 p-2"><Link href="/">Home</Link></li>
                    <li className="hover:text-green-300 p-2"><Link href="/profile/profile">Profile</Link></li>
                    <li className="hover:text-green-300 p-2"><Link href="/directories/products">Products</Link></li>
                    <li className="hover:text-green-300 p-2"><Link href="/directories/business-cards">Cards</Link></li>
                    <li className="hover:text-green-300 p-2"><Link href="/escrow/escrow-initiate?productId=16">Escrow</Link></li>
                </ul>
            </nav>
        </header>
    );
}