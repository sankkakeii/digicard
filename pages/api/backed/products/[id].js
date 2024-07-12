import { Product } from '@/models';

const getProductRoute = async (req, res) => {
    const { id } = req.query;

    try {
        const product = await Product.findOne({
            where: { id },
        });

        if (product) {
            res.status(200).json({ success: true, product });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        console.error('ERROR:::::::::::', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export default getProductRoute;
