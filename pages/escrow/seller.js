import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MilestoneUpdateModal from '@/components/MilestoneUpdateModal';

const SellerPage = () => {
    const [milestones, setMilestones] = useState([
        { description: 'Initial Deposit', dueDate: new Date(), status: 'Pending' },
        { description: 'Product Shipment', dueDate: new Date(), status: 'Pending' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMilestone, setSelectedMilestone] = useState(null);

    const handleMilestoneChange = (index, field, value) => {
        const updatedMilestones = milestones.map((milestone, i) =>
            i === index ? { ...milestone, [field]: value } : milestone
        );
        setMilestones(updatedMilestones);
    };

    const openModal = (milestone) => {
        setSelectedMilestone(milestone);
        setIsModalOpen(true);
    };

    const handleUpdate = (field, value) => {
        setSelectedMilestone((prev) => ({ ...prev, [field]: value }));
    };

    const closeModal = () => {
        setMilestones(milestones.map((milestone) => 
            milestone.description === selectedMilestone.description ? selectedMilestone : milestone
        ));
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-xl rounded-3xl p-8 mb-8"
                >
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">Seller Project Tracking</h1>
                    {milestones.map((milestone, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-center space-x-4 mb-4">
                            <Button variant="outline" onClick={() => openModal(milestone)}>
                                {milestone.description} - {milestone.status}
                            </Button>
                        </div>
                    ))}
                </motion.div>
            </div>

            {selectedMilestone && (
                <MilestoneUpdateModal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    milestone={selectedMilestone}
                    handleUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default SellerPage;
