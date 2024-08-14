import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EscrowSuccessModal from '@/components/EscrowSuccessModal';
import { Plus, Trash2 } from 'lucide-react';
import ProductCreationModal from '@/components/ProductCreationModal';

const EscrowAccountSetup = () => {
    const [milestones, setMilestones] = useState([{ description: '', dueDate: new Date(), status: '' }]);
    const [escrowDetails, setEscrowDetails] = useState({
        buyer: '',
        seller: '',
        totalAmount: '',
        description: '',
        escrowAgent: '',
        escrowTerms: '',
        currency: 'NGN',
        paymentMethod: 'Payment Gateway',
        disputeResolution: '',
        inspectionPeriod: ''
    });
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleAddMilestone = () => {
        setMilestones([...milestones, { description: '', dueDate: new Date(), status: '' }]);
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
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-2xl rounded-3xl p-8 mb-8"
                >
                    <h1 className="text-4xl font-bold mb-6 text-gray-900">Setup Escrow Account</h1>
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
                        <Input
                            label="Currency"
                        placeholder="Enter currency (e.g., USD, EUR, NGN)"
                            value={escrowDetails.currency}
                            onChange={(e) => handleInputChange('currency', e.target.value)}
                        />
                        <Input
                            label="Payment Method"
                            placeholder="Enter payment method (e.g., Bank Transfer, PayPal)"
                            value={escrowDetails.paymentMethod}
                            onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <Textarea
                            label="Dispute Resolution"
                            placeholder="Enter dispute resolution terms"
                            value={escrowDetails.disputeResolution}
                            onChange={(e) => handleInputChange('disputeResolution', e.target.value)}
                        />
                        <Input
                            label="Inspection Period"
                            placeholder="Enter inspection period (in days)"
                            value={escrowDetails.inspectionPeriod}
                            onChange={(e) => handleInputChange('inspectionPeriod', e.target.value)}
                        />
                    </div>

                    <div className="mt-8">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Milestones</h2>
                        <div className="">
                        {milestones.map((milestone, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center mb-4">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-1">
                                        Milestone Description
                                    </label>
                                    <Input
                                        placeholder="Describe the milestone"
                                        value={milestone.description}
                                        onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
                                        className="flex-1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-1">
                                        Due Date
                                    </label>
                                    <DatePicker
                                        selected={milestone.dueDate}
                                        onChange={(date) => handleMilestoneChange(index, 'dueDate', date)}
                                        className="w-full border rounded-md p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-1">
                                        Status
                                    </label>
                                    <Input
                                        placeholder="Enter status (e.g., Pending, Completed)"
                                        value={milestone.status}
                                        onChange={(e) => handleMilestoneChange(index, 'status', e.target.value)}
                                        className="flex-1"
                                    />
                                </div>
                                <Button
                                    variant="ghost"
                                    className="text-red-600 mt-6"
                                    onClick={() => handleRemoveMilestone(index)}
                                >
                                    <Trash2 size={20} />
                                </Button>
                            </div>
                        ))}
                        </div>
                        <Button variant="outline" onClick={handleAddMilestone} className="flex items-center">
                            <Plus className="mr-2" /> Add Milestone
                        </Button>
                    </div>

                    <Button
                        variant="default"
                        className="mt-8 w-full flex items-center justify-center py-3 text-lg font-semibold"
                        onClick={handleOpenEscrow}
                    >
                        Create Escrow Account
                    </Button>
                </motion.div>
            </div>

            {/* <EscrowSuccessModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} /> */}
            {/* <ProductCreationModal visible={isProductModalVisible} onClose={() => setIsProductModalVisible(false)} /> */}
            <ProductCreationModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
        </div>
    );
};

export default EscrowAccountSetup;
