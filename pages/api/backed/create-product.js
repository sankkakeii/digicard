// pages/api/product.js
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const createProductRoute = async (req, res) => {
    const { name, description, url, businessCardId } = req.body;

    try {
        const { data: new_product, error } = await supabase
            .from('products')
            .insert([
                {
                    name,
                    description,
                    url,
                    business_card_id: businessCardId,
                }
            ]);

        if (error) throw error;

        res.status(200).json({ success: true, message: 'Product created successfully' });
    } catch (error) {
        console.error('ERROR:::::::::::', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export default createProductRoute;
