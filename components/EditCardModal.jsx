import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function EditCardModal({ visible, onClose, card, onSave }) {
    const [formData, setFormData] = useState({
        first_name: card.first_name,
        last_name: card.last_name,
        job_title: card.job_title,
        email: card.email,
        phone: card.phone,
        about_me: card.about_me,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
                <h2 className="text-xl font-bold mb-4">Edit Business Card</h2>

            <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <Input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <Input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
            </div>


                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Job Title</label>
                    <Input
                        type="text"
                        name="job_title"
                        value={formData.job_title}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">About Me</label>
                    <textarea
                        name="about_me"
                        value={formData.about_me}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="default" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="default" className="bg-blue-500 text-white" onClick={handleSave}>
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
}
