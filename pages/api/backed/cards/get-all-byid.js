import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const { creator_id } = req.query; // Extract the creator_id from the query parameters

        if (!creator_id) {
            return res.status(400).json({ success: false, message: 'creator_id is required' });
        }

        try {
            const { data: businessCards, error } = await supabase
                .from('business_cards')
                .select(`*, products(*)`)
                .eq('creator_id', creator_id); // Filter by creator_id

            if (error) throw error;

            if (businessCards.length > 0) {
                res.status(200).json({ success: true, businessCards });
            } else {
                res.status(404).json({ success: false, message: 'No business cards found for this creator' });
            }
        } catch (error) {
            console.error('Error fetching business cards:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
