import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const subscriptionRoute = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { customer_email, customer_phone, amount, reference, frequency } = req.body;

    if (!customer_email || !customer_phone || !amount || !reference || !frequency) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        // Prepare the payload for the external API
        const payload = {
            "customer_email": customer_email,
            "customer_phone": customer_phone,
            "amount": amount,
            "reference": reference,
            "frequency": frequency,
            // "callback_url" : "http://subscription-hq.test"
            "callback_url" : process.env.NEXT_CALLBACK_URL
        };

        // Make the POST request to the external API
        const response = await fetch('https://sub-engine.fintecgrate.com/api/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Assuming the API requires an authorization header
            },
            body: JSON.stringify(payload),
        });

        // Parse the response from the external API
        const result = await response.json();

        console.log('RESULT', result);

        if (!response.ok) {
            // If the external API returns an error, send it back to the client
            return res.status(response.status).json({ success: false, message: result.message || 'Subscription failed', error: result });
        }

        // Handle the success response
        res.status(200).json({
            success: true,
            message: result.message,
            data: result,
        });

    } catch (error) {
        console.log('------------------------------ERROR---------------------------', error);
        // console.error('Error making subscription request:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

export default subscriptionRoute;
