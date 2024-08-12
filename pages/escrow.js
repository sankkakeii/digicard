import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import EscrowSuccessModal from '@/components/EscrowSuccessModal';
import { Plus, Trash2 } from 'lucide-react';

const EscrowAccountSetup = () => {
    const [milestones, setMilestones] = useState([{ title: '', amount: '', dueDate: '', description: '' }]);
    const [escrowDetails, setEscrowDetails] = useState({
        buyer: '',
        seller: '',
        totalAmount: '',
        description: '',
        escrowAgent: '',
        escrowTerms: ''
    });
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleAddMilestone = () => {
        setMilestones([...milestones, { title: '', amount: '', dueDate: '', description: '' }]);
    };

    const handleRemoveMilestone = (index) => {
        setMilestones(milestones.filter((_, i) => i !== index));
    };

    const handleMilestoneChange = (index, field, value) => {
        const updatedMilestones = milestones.map((milestone, i) =>
            i === index ? { ...milestone, [field]: value } : milestone
        );
        setMilestones(updatedMilestones);
    };

    const handleInputChange = (field, value) => {
        setEscrowDetails({ ...escrowDetails, [field]: value });
    };

    const handleOpenEscrow = () => {
        // Simulate escrow account creation
        setTimeout(() => {
            setIsModalVisible(true);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-xl rounded-3xl p-8 mb-8"
                >
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">Setup Escrow Account</h1>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Input
                            label="Buyer"
                            placeholder="Enter buyer's name"
                            value={escrowDetails.buyer}
                            onChange={(e) => handleInputChange('buyer', e.target.value)}
                        />
                        <Input
                            label="Seller"
                            placeholder="Enter seller's name"
                            value={escrowDetails.seller}
                            onChange={(e) => handleInputChange('seller', e.target.value)}
                        />
                        <Input
                            label="Total Amount"
                            placeholder="Enter total amount"
                            value={escrowDetails.totalAmount}
                            onChange={(e) => handleInputChange('totalAmount', e.target.value)}
                        />
                        <Input
                            label="Escrow Agent"
                            placeholder="Enter escrow agent's name"
                            value={escrowDetails.escrowAgent}
                            onChange={(e) => handleInputChange('escrowAgent', e.target.value)}
                        />
                    </div>
                    <Textarea
                        label="Description"
                        placeholder="Enter transaction description"
                        value={escrowDetails.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="mt-6"
                    />
                    <Textarea
                        label="Escrow Terms"
                        placeholder="Enter terms and conditions of the escrow"
                        value={escrowDetails.escrowTerms}
                        onChange={(e) => handleInputChange('escrowTerms', e.target.value)}
                        className="mt-6"
                    />

                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Milestones</h2>
                        {milestones.map((milestone, index) => (
                            <div key={index} className="flex flex-col md:flex-row items-center space-x-4 mb-4">
                                <Input
                                    placeholder="Milestone Title"
                                    value={milestone.title}
                                    onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
                                    className="flex-1"
                                />
                                <Input
                                    placeholder="Amount"
                                    value={milestone.amount}
                                    onChange={(e) => handleMilestoneChange(index, 'amount', e.target.value)}
                                    className="flex-1"
                                />
                                <Input
                                    placeholder="Due Date"
                                    type="date"
                                    value={milestone.dueDate}
                                    onChange={(e) => handleMilestoneChange(index, 'dueDate', e.target.value)}
                                    className="flex-1"
                                />
                                <Textarea
                                    placeholder="Milestone Description"
                                    value={milestone.description}
                                    onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
                                    className="flex-1"
                                />
                                <Button
                                    variant="ghost"
                                    className="text-red-600 mt-2 md:mt-0"
                                    onClick={() => handleRemoveMilestone(index)}
                                >
                                    <Trash2 size={20} />
                                </Button>
                            </div>
                        ))}
                        <Button variant="outline" onClick={handleAddMilestone} className="flex items-center">
                            <Plus className="mr-2" /> Add Milestone
                        </Button>
                    </div>

                    <Button
                        variant="default"
                        className="mt-8 flex items-center"
                        onClick={handleOpenEscrow}
                    >
                        Create Escrow Account
                    </Button>
                </motion.div>
            </div>

            <EscrowSuccessModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
        </div>
    );
};

export default EscrowAccountSetup;

