import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const fetchMessagesByCreatorId = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    const { businessCreatorId } = req.query;

    try {
        // Fetch messages from the 'messages' table using the business_creator_id
        const { data: messages, error } = await supabase
            .from('messages')
            .select('*')
            .eq('business_creator_id', businessCreatorId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Send the messages back in the response
        res.status(200).json({ success: true, messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

export default fetchMessagesByCreatorId;
