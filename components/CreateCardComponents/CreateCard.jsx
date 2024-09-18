import { useState, useEffect } from 'react';
import CustomModal from '../CustomModal';
import ProductCreationModal from '../ProductCreationModal2';
import PreviewComponent from './PreviewComponent';
import Form from './Form';


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

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('osunUserData'));
        setUserData(user);
    }, []);


    const handleProductsUpdate = (updatedProducts) => {
        setProducts(updatedProducts);
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

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormState((prevState) => ({
                ...prevState,
                [name]: reader.result.split(',')[1], // Get base64 string
            }));
        };
        reader.readAsDataURL(files[0]);
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
            email: formState.email.replace('@', '@').replace('.', '.'),
            logo: formState.logo ? `data:image/jpeg;base64,${formState.logo}` : null,
            profilePicture: formState.profilePicture ? `data:image/jpeg;base64,${formState.profilePicture}` : null,
        }));
    }, [formState]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            ...formState,
            csrf_token: csrfToken,
            social_media: JSON.stringify(formState.socialMedia),
            products_services: JSON.stringify(formState.productsServices),
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

            const responseText = await response.text(); // Get response as text to log it
            console.log('Response text:', responseText); // Log response text to debug

            // Try parsing the response as JSON
            const data = JSON.parse(responseText);

            if (data.success) {
                const nameSlug = `${formState.firstName}-${formState.lastName}`.toLowerCase().replace(/\s+/g, '-');
                setCardId(nameSlug);

                // Send product information
                for (const product of formState.products) {
                    await fetch('/api/backed/create-product', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...product,
                            businessCardId: data.card_id, // Use the card ID returned from the card creation response
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
        } catch (error) {
            console.error('Error:', error);
            setModalMessage({
                title: 'Error',
                message: 'An error occurred. Please try again.',
                type: 'error',
            });
            setModalVisible(true);
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
