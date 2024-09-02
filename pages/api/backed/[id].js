import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const apiRoute = async (req, res) => {
    const { id } = req.query; // Assuming slug is passed as a query parameter

    try {
        // Fetch the business card from Supabase
        const { data: businessCard, error } = await supabase
            .from('business_cards')
            .select(`*, products(*)`)
            .eq('card_url', id)
            .single(); // Assuming card_url is unique

        if (error) {
        console.log('MINOT', error);
            console.error('Error fetching card data:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (!businessCard) {
            return res.status(404).json({ message: 'Business card not found' });
        }

        res.status(200).json(businessCard);
    } catch (error) {
    console.log('MAJOT', error);
        console.error('Error fetching card data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default apiRoute;

