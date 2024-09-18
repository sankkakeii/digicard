import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from "next/legacy/image";

const ProductCreationModal = ({ visible, onClose, onProductsUpdate, card }) => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [images, setImages] = useState([]);
    const [productUrl, setProductUrl] = useState('');
    const [products, setProducts] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const base64Promises = files.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(base64Promises).then((base64Strings) => {
            setImages([...images, ...base64Strings]);
        });
    };

    const handleSubmit = async () => {
        const newProduct = {
            productName,
            description,
            amount,
            images,
            productUrl,
            businessCardId: card.id
        };

        // Send request to the API endpoint to create a new product
        const response = await fetch('/api/backed/create-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });

        const result = await response.json();
        if (result.success) {
            const updatedProducts = [...products, newProduct];
            setProducts(updatedProducts);
            onProductsUpdate(updatedProducts); // Send updated products to parent

            // Clear the form for the next product entry
            setProductName('');
            setDescription('');
            setAmount('');
            setImages([]);
            setProductUrl('');
        } else {
            console.error(result.message);
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
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
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
                                    <Image
                                        width={200}
                                        height={200}
                                        key={index}
                                        src={image}
                                        alt={`Preview ${index}`}
                                        className="w-20 h-20 object-cover m-2 rounded"
                                    />
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



















// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { X, Upload, Plus, Trash2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent } from '@/components/ui/card';

// const CardCreationModal = ({ visible, onClose, onCardsUpdate }) => {
//     const [cardName, setCardName] = useState('');
//     const [description, setDescription] = useState('');
//     const [amount, setAmount] = useState('');
//     const [images, setImages] = useState([]);
//     const [cardUrl, setCardUrl] = useState('');

//     const handleImageChange = (e) => {
//         const files = Array.from(e.target.files);
//         const newImages = files.map(file => ({
//             file,
//             preview: URL.createObjectURL(file)
//         }));
//         setImages(prevImages => [...prevImages, ...newImages]);
//     };

//     const removeImage = (index) => {
//         setImages(prevImages => prevImages.filter((_, i) => i !== index));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('cardName', cardName);
//         formData.append('description', description);
//         formData.append('amount', amount);
//         formData.append('cardUrl', cardUrl);
//         images.forEach((image, index) => {
//             formData.append(`image-${index}`, image.file);
//         });

//         try {
//             const response = await fetch('/api/create-card', {
//                 method: 'POST',
//                 body: formData,
//             });
//             const result = await response.json();
//             if (result.success) {
//                 onCardsUpdate(result.card);
//                 resetForm();
//             } else {
//                 console.error(result.message);
//             }
//         } catch (error) {
//             console.error('Error creating card:', error);
//         }
//     };

//     const resetForm = () => {
//         setCardName('');
//         setDescription('');
//         setAmount('');
//         setImages([]);
//         setCardUrl('');
//     };

//     if (!visible) return null;

//     return (
//         <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto"
//         >
//             <Card className="w-full max-w-2xl mx-4 bg-white">
//                 <CardContent className="p-6">
//                     <div className="flex justify-between items-center mb-6">
//                         <h2 className="text-2xl font-bold">Create New Card</h2>
//                         <Button variant="ghost" size="icon" onClick={onClose}>
//                             <X className="h-6 w-6" />
//                         </Button>
//                     </div>
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div className="space-y-2">
//                             <Label htmlFor="cardName">Card Name</Label>
//                             <Input
//                                 id="cardName"
//                                 placeholder="Enter card name"
//                                 value={cardName}
//                                 onChange={(e) => setCardName(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="space-y-2">
//                             <Label htmlFor="description">Description</Label>
//                             <Textarea
//                                 id="description"
//                                 placeholder="Enter card description"
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="space-y-2">
//                             <Label htmlFor="amount">Amount</Label>
//                             <Input
//                                 id="amount"
//                                 type="number"
//                                 placeholder="Enter amount"
//                                 value={amount}
//                                 onChange={(e) => setAmount(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="space-y-2">
//                             <Label htmlFor="cardUrl">Card URL</Label>
//                             <Input
//                                 id="cardUrl"
//                                 placeholder="Enter card URL"
//                                 value={cardUrl}
//                                 onChange={(e) => setCardUrl(e.target.value)}
//                             />
//                         </div>
//                         <div className="space-y-2">
//                             <Label>Images</Label>
//                             <div className="flex flex-wrap gap-4">
//                                 {images.map((image, index) => (
//                                     <div key={index} className="relative">
//                                         <img
//                                             src={image.preview}
//                                             alt={`Preview ${index}`}
//                                             className="w-24 h-24 object-cover rounded"
//                                         />
//                                         <Button
//                                             variant="destructive"
//                                             size="icon"
//                                             className="absolute -top-2 -right-2"
//                                             onClick={() => removeImage(index)}
//                                         >
//                                             <Trash2 className="h-4 w-4" />
//                                         </Button>
//                                     </div>
//                                 ))}
//                                 <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-gray-400 transition-colors">
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         multiple
//                                         onChange={handleImageChange}
//                                         className="hidden"
//                                     />
//                                     <Plus className="h-8 w-8 text-gray-400" />
//                                 </label>
//                             </div>
//                         </div>
//                         <div className="flex justify-end space-x-4">
//                             <Button variant="outline" onClick={onClose}>
//                                 Cancel
//                             </Button>
//                             <Button type="submit">
//                                 Create Card
//                             </Button>
//                         </div>
//                     </form>
//                 </CardContent>
//             </Card>
//         </motion.div>
//     );
// };

// export default CardCreationModal;