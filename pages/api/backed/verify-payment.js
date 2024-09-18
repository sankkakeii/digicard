// REMEMBER TO ADD A CHECK TO DETERMINE IF A SUBSCRIPTION  HAS EXPIRED AND RESET THE USER SUB STATUS

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const verificationRoute = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { reference, customer_details } = req.body;

    console.log('reference', reference, customer_details);

    if (!reference || !customer_details || !customer_details.id) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        // Make the GET request to the external API to verify payment
        const response = await fetch(`https://sub-engine.fintecgrate.com/api/transactions/verify/${reference}`, {
            method: 'GET',
        });

        // Parse the response from the external API
        const result = await response.json();

        console.log('RESULT', result);

        // Check if the reference already exists in the subscriptions table
        const { data: existingRecords, error: checkError } = await supabase
            .from('subscriptions')
            .select('id')
            .eq('reference', reference);

        if (checkError) {
            console.error('Error checking existing subscription record:', checkError);
            return res.status(500).json({ success: false, message: 'Error checking subscription record' });
        }

        if (existingRecords && existingRecords.length > 0) {
            console.log('Subscription record with this reference already exists.');
        } else {
            // Add a record to the subscriptions table
            const { error: insertError } = await supabase
                .from('subscriptions')
                .insert([{ reference, email: customer_details.email }]);

            if (insertError) {
                console.error('Error inserting subscription record:', insertError);
                return res.status(500).json({ success: false, message: 'Error inserting subscription record' });
            }
        }

        if (!response.ok) {
            // If the external API returns an error, send it back to the client
            return res.status(response.status).json({ success: false, message: result.message || 'Verification failed', error: result });
        }

        // If verification is successful, update the is_subscribed field in the users table
        const { data: updatedUserData, error: updateError } = await supabase
            .from('users')
            .update({ is_subscribed: true })
            .eq('id', customer_details.id)
            .select(); // Fetch the updated user data

        if (updateError) {
            console.error('Error updating user subscription status:', updateError);
            return res.status(500).json({ success: false, message: 'Error updating user subscription status' });
        }

        // Handle the success response
        res.status(200).json({
            success: true,
            message: result.message,
            data: result,
            user: updatedUserData[0], // Include the updated user data in the response
        });

    } catch (error) {
        console.log('------------------------------ERROR---------------------------', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

export default verificationRoute;
