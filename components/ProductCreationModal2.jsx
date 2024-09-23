import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from "next/legacy/image";
import { X } from 'lucide-react';
import imageCompression from 'browser-image-compression'; // Import image compression library
import Spinner from './Spinner';

const ProductCreationModal = ({ visible, onClose, onProductsUpdate, card }) => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [images, setImages] = useState([]);
    const [productUrl, setProductUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [errorMessage, setErrorMessage] = useState('');

    // Handle image file selection and conversion to base64 with compression
    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        try {
            const compressedImages = await Promise.all(
                files.map(async (file) => {
                    const compressedFile = await imageCompression(file, {
                        maxSizeMB: 1, // Set max size to 1MB
                        useWebWorker: true,
                    });
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(compressedFile);
                    });
                })
            );
            setImages([...images, ...compressedImages]);
        } catch (error) {
            console.error('Image compression error:', error);
            setErrorMessage('Image compression failed. Please try again.');
        }
    };

    // Remove a selected image
    const handleRemoveImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    // Submit product with images and other details
    const handleSubmit = async () => {
        if (!productName || !description || !amount || images.length === 0) {
            setErrorMessage('Please fill in all fields and add at least one image.');
            return;
        }

        setIsLoading(true); // Start loading state
        const newProduct = {
            productName,
            description,
            amount,
            images,
            productUrl,
            businessCardId: card.id,
        };

        try {
            const response = await fetch('/api/backed/create-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            const result = await response.json();
            if (result.success) {
                onProductsUpdate((prevProducts) => [...prevProducts, newProduct]);

                // Clear form after submission
                setProductName('');
                setDescription('');
                setAmount('');
                setImages([]);
                setProductUrl('');
                setErrorMessage('');
            } else {
                setErrorMessage(result.message || 'Failed to create product.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false); // End loading state
        }
    };

    if (!visible) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
                {isLoading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <Spinner /> {/* Display your Spinner component here */}
                    </div>
                )}
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-4">Create New Product</h2>
                    <Input
                        placeholder="Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="mb-4"
                    />
                    <Textarea
                        placeholder="Product Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mb-4"
                    />
                    <Input
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="mb-4"
                    />
                    <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="mb-4"
                    />
                    <div className="mb-4">
                        {images.length > 0 && (
                            <div className="flex flex-wrap">
                                {images.map((image, index) => (
                                    <div key={index} className="relative m-2">
                                        <Image
                                            width={150}
                                            height={150}
                                            src={image}
                                            alt={`Preview ${index}`}
                                            className="w-10 h-10 object-cover rounded"
                                        />
                                        <p
                                            className="absolute top-1 right-1 bg-red-400 cursor-pointer hover:bg-red-500 px-[2px] py-[2px] text-white rounded-full"
                                        >
                                            <X onClick={() => handleRemoveImage(index)} className="w-4 h-4" />
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <Input
                        placeholder="Product URL"
                        value={productUrl}
                        onChange={(e) => setProductUrl(e.target.value)}
                        className="mb-6"
                    />
                    {errorMessage && (
                        <div className="text-red-500 mb-4">{errorMessage}</div>
                    )}
                    <Button variant="default" onClick={handleSubmit} className="mb-2">
                        Add Product
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCreationModal;
