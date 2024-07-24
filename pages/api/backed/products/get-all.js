// pages/api/products/index.js
import { Product } from '@/models';

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const products = await Product.findAll();

            if (products.length > 0) {
                res.status(200).json({ success: true, products });
            } else {
                res.status(404).json({ success: false, message: 'No products found' });
            }
        } catch (error) {
            console.error('ERROR:::::::::::', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
