import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const { card_id } = req.query; // Extract the card_id from the query parameters

        console.log(card_id)

        if (!card_id) {
            return res.status(400).json({ success: false, message: 'card_id is required' });
        }

        try {
            const { data: businessCard, error } = await supabase
                .from('business_cards')
                .select(`*, products(*)`)
                .eq('id', card_id) // Filter by card_id
                .single(); // Ensure a single record is returned

            if (error) throw error;

            if (businessCard) {
                res.status(200).json({ success: true, businessCard });
            } else {
                res.status(404).json({ success: false, message: 'Business card not found' });
            }
        } catch (error) {
            console.error('Error fetching business card:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
