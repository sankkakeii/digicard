import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { data: businessCards, error } = await supabase
                .from('business_cards')
                .select(`*, products(*)`);

            if (error) throw error;

            if (businessCards.length > 0) {
                res.status(200).json({ success: true, businessCards });
            } else {
                res.status(404).json({ success: false, message: 'No business cards found' });
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
