import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { data: products, error } = await supabase
                .from('products')
                .select('*');

            if (error) throw error;

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

