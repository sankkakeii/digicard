import { useState, useEffect } from 'react';
import CustomModal from '../CustomModal';
import ProductCreationModal from '../ProductCreationModal2';
import PreviewComponent from './PreviewComponent';
import Form from './Form';
import Spinner from '../Spinner'; // Assuming you have a Spinner component
import imageCompression from 'browser-image-compression'; // Import image compression library

export default function CreateCard({ csrfToken }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        jobTitle: '',
        email: '',
        phone: '',
        logo: null,
        profilePicture: null,
        socialMedia: [],
        products: [],
    });

    const [previewData, setPreviewData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        jobTitle: 'Software Engineer',
        email: 'john.doe[at]example[dot]com',
        phone: '+1 (555) 123-4567',
        logo: null,
        profilePicture: null,
        socialMedia: [],
        products: [],
    });

    const [cardId, setCardId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState({
        title: '',
        message: '',
        type: '',
    });
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Loading state

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('osunUserData'));
        setUserData(user);
    }, []);

    const handleProductsUpdate = (updatedProducts) => {
        setFormState((prevState) => ({ ...prevState, products: updatedProducts }));
    };

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = async (e) => {
        const { name, files } = e.target;
        if (files[0]) {
            try {
                const compressedFile = await imageCompression(files[0], {
                    maxSizeMB: 1, // Set max size to 1MB
                    useWebWorker: true,
                });
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormState((prevState) => ({
                        ...prevState,
                        [name]: reader.result.split(',')[1], // Get base64 string
                    }));
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.error('Image compression error:', error);
                setModalMessage({
                    title: 'Error',
                    message: 'Image compression failed. Please try again.',
                    type: 'error',
                });
                setModalVisible(true);
            }
        }
    };

    const addSocialMediaEntry = () => {
        setFormState((prevState) => ({
            ...prevState,
            socialMedia: [...prevState.socialMedia, { platform: '', url: '' }],
        }));
    };

    const removeSocialMediaEntry = (index) => {
        setFormState((prevState) => ({
            ...prevState,
            socialMedia: prevState.socialMedia.filter((_, i) => i !== index),
        }));
    };

    const addProductEntry = () => {
        setFormState((prevState) => ({
            ...prevState,
            products: [...prevState.products, { name: '', description: '', url: '' }],
        }));
    };

    const removeProductEntry = (index) => {
        setFormState((prevState) => ({
            ...prevState,
            products: prevState.products.filter((_, i) => i !== index),
        }));
    };

    const handleSocialMediaChange = (index, field, value) => {
        const newSocialMedia = [...formState.socialMedia];
        newSocialMedia[index][field] = value;
        setFormState((prevState) => ({
            ...prevState,
            socialMedia: newSocialMedia,
        }));
    };

    const handleProductChange = (index, field, value) => {
        const newProducts = [...formState.products];
        newProducts[index][field] = value;
        setFormState((prevState) => ({
            ...prevState,
            products: newProducts,
        }));
    };

    useEffect(() => {
        setPreviewData((prevData) => ({
            ...prevData,
            ...formState,
            logo: formState.logo ? `data:image/jpeg;base64,${formState.logo}` : null,
            profilePicture: formState.profilePicture ? `data:image/jpeg;base64,${formState.profilePicture}` : null,
        }));
    }, [formState]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading state
        const formData = {
            ...formState,
            csrf_token: csrfToken,
            social_media: JSON.stringify(formState.socialMedia),
            products_services: JSON.stringify(formState.products),
            creator_id: userData.id,
        };

        try {
            const response = await fetch('/api/backed/create-card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseText = await response.text();
            console.log('Response text:', responseText);

            if (response.ok) {
                const data = JSON.parse(responseText);

                if (data.success) {
                    const nameSlug = `${formState.firstName}-${formState.lastName}`.toLowerCase().replace(/\s+/g, '-');
                    setCardId(nameSlug);

                    for (const product of formState.products) {
                        await fetch('/api/backed/create-product', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                ...product,
                                businessCardId: data.card_id,
                            }),
                        });
                    }

                    setModalMessage({
                        title: 'Success',
                        message: `Your Digital Business Card URL: ${window.location.origin}/cards/${nameSlug}`,
                        type: 'success',
                    });
                    setModalVisible(true);
                } else {
                    setModalMessage({
                        title: 'Error',
                        message: data.message,
                        type: 'error',
                    });
                    setModalVisible(true);
                }
            } else {
                const errorMessage = await response.text();
                if (response.status === 413) {
                    setModalMessage({
                        title: 'Error',
                        message: 'Payload too large. Please reduce the size of your images.',
                        type: 'error',
                    });
                } else {
                    setModalMessage({
                        title: 'Error',
                        message: errorMessage || 'An error occurred. Please try again.',
                        type: 'error',
                    });
                }
                setModalVisible(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setModalMessage({
                title: 'Error',
                message: 'An unexpected error occurred. Please try again.',
                type: 'error',
            });
            setModalVisible(true);
        } finally {
            setIsLoading(false); // End loading state
        }
    };

    const handleCopyLink = () => {
        const link = `${window.location.origin}/cards/${cardId}`;
        navigator.clipboard.writeText(link).then(() => {
            setModalMessage({
                title: 'Success',
                message: 'Link copied to clipboard!',
                type: 'success',
            });
            setModalVisible(true);
        });
    };

    return (
        <>
            <div className="relative container mx-auto p-5 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
                {/* Form Section */}
                <Form
                    handleSubmit={handleSubmit}
                    csrfToken={csrfToken}
                    formState={formState}
                    handleInputChange={handleInputChange}
                    handleFileChange={handleFileChange}
                    addSocialMediaEntry={addSocialMediaEntry}
                    handleSocialMediaChange={handleSocialMediaChange}
                    removeSocialMediaEntry={removeSocialMediaEntry}
                    addProductEntry={addProductEntry}
                    handleProductChange={handleProductChange}
                    removeProductEntry={removeProductEntry}
                    handleCopyLink={handleCopyLink}
                />

                {/* Preview Section */}
                <PreviewComponent previewData={previewData} cardId={cardId} handleCopyLink={handleCopyLink} />
            </div>

            {/* Loading Spinner */}
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Spinner /> {/* Display your Spinner component here */}
                </div>
            )}

            <CustomModal
                visible={modalVisible}
                title={modalMessage.title}
                message={modalMessage.message}
                type={modalMessage.type}
                onClose={() => setModalVisible(false)}
            />
            <ProductCreationModal
                visible={isModalVisible}
                onClose={closeModal}
                onProductsUpdate={handleProductsUpdate}
            />
        </>
    );
}
