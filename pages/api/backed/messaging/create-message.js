import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const createMessageRoute = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    const { message, productId, productUrl, businessCreatorId, trackingId } = req.body;

    try {
        // Check if payload is too large
        const payloadSize = JSON.stringify(req.body).length;
        console.log('Payload size:', payloadSize);

        if (payloadSize > 1048576) { // 1MB limit
            return res.status(413).json({
                success: false,
                message: 'Payload too large. Please reduce the size of the content.',
            });
        }

        // Insert message into the 'messages' table
        const { data: new_message, error } = await supabase
            .from('messages')
            .insert([
                {
                    message,
                    product_id: productId,
                    product_url: productUrl,
                    business_creator_id: businessCreatorId,
                    tracking_id: trackingId,
                    created_at: new Date(),
                }
            ]);

        if (error) throw error;

        // Send success response
        res.status(200).json({ success: true, message: 'Message sent successfully', messageData: new_message });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '2mb', // Increase the body size limit if needed
        },
    },
};

export default createMessageRoute;
