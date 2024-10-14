// components/TransactionModal.js
import { Button } from "@/components/ui/button";

const TransactionModal = ({ isOpen, onClose, transaction, handleUpdateMilestone }) => {
    if (!isOpen) return null;

    console.log(transaction)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <div className="flex justify-end">
                    <Button onClick={onClose} className="bg-red-600 text-white">
                        Close
                    </Button>
                </div>

                <h2 className="text-2xl font-semibold mb-4">Transaction Details</h2>

                <div>
                    <p className="text-lg font-bold">Product: {transaction.product.name}</p>
                    <p className="text-gray-600">Description: {transaction.product.description}</p>
                    <p className="text-gray-600">Price: ₦{transaction.amount}</p>
                    <p className="text-gray-600">Status: {transaction.status}</p>
                </div>

                <h3 className="mt-6 text-lg font-semibold">Milestones</h3>
                {transaction.milestones.length === 0 ? (
                    <p className="text-gray-500">No milestones available.</p>
                ) : (
                    transaction.milestones.map((milestone) => (
                        <div
                            key={milestone._id}
                            className={`border p-4 mb-4 rounded-md ${milestone.status === "completed" ? "bg-green-100" : "bg-gray-100"}`}
                        >
                            <h4 className="font-bold">{milestone.title}</h4>
                            <p>{milestone.description || "No description available."}</p>
                            <p className="text-gray-600">Status: {milestone.status}</p>
                            <p className="text-gray-600">
                                Due Date: {milestone.dueDate ? new Date(milestone.dueDate).toLocaleDateString() : "Not set"}
                            </p>

                            {milestone.actor === "seller" && milestone.status !== "completed" && (
                                <Button
                                    onClick={() => handleUpdateMilestone(transaction._id, milestone._id, transaction.sellerId)}
                                    // onClick={() => console.log(transaction._id, milestone._id)}
                                    className="mt-2 bg-blue-600 text-white"
                                >
                                    Mark as Completed
                                </Button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TransactionModal;
