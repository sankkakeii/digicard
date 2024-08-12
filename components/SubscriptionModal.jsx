// components/SubscriptionModal.js
import React from 'react';

export default function SubscriptionModal({ visible, onClose }) {
    if (!visible) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-1/3 p-8 rounded-lg shadow-lg z-50">
                <h2 className="text-2xl font-semibold mb-4">Card Slot Limit Reached</h2>
                <p className="text-gray-600 mb-6">
                    You have used up your free digital card slots. Subscribe to create additional cards and enjoy premium features!
                </p>
                <div className="flex justify-center">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300" onClick={() => { /* Add your payment logic here */ }}>
                        Pay Now
                    </button>
                </div>
            </div>
        </>
    );
}
