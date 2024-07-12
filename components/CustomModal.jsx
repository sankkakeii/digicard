import { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function CustomModal({ visible, onClose, title, message, type }) {
    if (!visible) return null;

    const modalTypeClass = type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700';
    const icon = type === 'error' ? <FaTimesCircle className="text-red-500 w-12 h-12" /> : <FaCheckCircle className="text-green-500 w-12 h-12" />;

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg z-50 w-full max-w-md">
                <div className="flex items-center justify-center mb-4">
                    {icon}
                </div>
                <h2 className={`text-2xl font-semibold mb-4 text-center ${modalTypeClass}`}>{title}</h2>
                <p className="mb-6 text-center text-gray-700">{message}</p>
                <button
                    onClick={onClose}
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none transition ease-in-out duration-300"
                >
                    Close
                </button>
            </div>
        </>
    );
}
