import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EscrowSuccessModal = ({ visible, onClose }) => {
    if (!visible) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <div className="flex flex-col items-center">
                    <CheckCircle className="text-green-500 mb-4" size={48} />
                    <h2 className="text-2xl font-bold mb-4">Success!</h2>
                    <p className="text-gray-600 mb-6">Your escrow account has been successfully opened.</p>
                    <Button variant="default" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default EscrowSuccessModal;
