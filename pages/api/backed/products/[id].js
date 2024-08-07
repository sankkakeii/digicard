import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const getProductRoute = async (req, res) => {
    const { id } = req.query;

    try {
        const { data: product, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

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
