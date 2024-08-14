// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import Image from 'next/image';

// const ProductCreationModal = ({ visible, onClose, onProductsUpdate, card }) => {
//     const [productName, setProductName] = useState('');
//     const [description, setDescription] = useState('');
//     const [amount, setAmount] = useState('');
//     const [images, setImages] = useState([]);
//     const [productUrl, setProductUrl] = useState('');
//     const [products, setProducts] = useState([]);


//     console.log(card);

//     const handleImageChange = (e) => {
//         const files = Array.from(e.target.files);
//         setImages([...images, ...files]);
//     };

//     const handleSubmit = () => {
//         const newProduct = {
//             productName,
//             description,
//             amount,
//             images,
//             productUrl
//         };

//         const updatedProducts = [...products, newProduct];
//         setProducts(updatedProducts);
//         onProductsUpdate(updatedProducts); // Send updated products to parent

//         console.log(products);

//         // Clear the form for the next product entry
//         setProductName('');
//         setDescription('');
//         setAmount('');
//         setImages([]);
//         setProductUrl('');
//     };

//     if (!visible) return null;

//     return (
//         <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
//         >
//             <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
//                 <div className="flex flex-col items-center">
//                     <h2 className="text-2xl font-bold mb-4">Create New Product</h2>
//                     <Input
//                         placeholder="Product Name"
//                         value={productName}
//                         onChange={(e) => setProductName(e.target.value)}
//                         className="mb-4"
//                     />
//                     <Textarea
//                         placeholder="Product Description"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         className="mb-4"
//                     />
//                     <Input
//                         placeholder="Amount"
//                         value={amount}
//                         onChange={(e) => setAmount(e.target.value)}
//                         className="mb-4"
//                     />
//                     <Input
//                         type="file"
//                         accept="image/*"
//                         multiple
//                         onChange={handleImageChange}
//                         className="mb-4"
//                     />
//                     <div className="mb-4">
//                         {images.length > 0 && (
//                             <div className="flex flex-wrap">
//                                 {images.map((image, index) => (
//                                     <Image
//                                         width={200}
//                                         height={200}
//                                         key={index}
//                                         src={URL.createObjectURL(image)}
//                                         alt={`Preview ${index}`}
//                                         className="w-20 h-20 object-cover m-2 rounded"
//                                     />
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                     <Input
//                         placeholder="Product URL"
//                         value={productUrl}
//                         onChange={(e) => setProductUrl(e.target.value)}
//                         className="mb-6"
//                     />
//                     <Button variant="default" onClick={handleSubmit} className="mb-2">
//                         Add Product
//                     </Button>
//                     <Button variant="outline" onClick={onClose}>
//                         Cancel
//                     </Button>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// export default ProductCreationModal;



















import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

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

