import { Product } from '@/models';

const createProductRoute = async (req, res) => {
    const { name, description, url, businessCardId } = req.body;

    try {
        const newProduct = await Product.create({
            name,
            description,
            url,
            BusinessCardId: businessCardId,
        });

        res.status(200).json({ success: true, message: 'Product created successfully' });
    } catch (error) {
        console.error('ERROR:::::::::::', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export default createProductRoute;
