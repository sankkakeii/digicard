// escrow/update-milestone.js

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    try {
        const { transactionId, milestoneId, status, action } = req.body;

        // Validate request data (simple validation)
        if (!transactionId || !milestoneId || !status || !action) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Create the payload for the external API call
        const updatePayload = {
            milestoneId,
            status,
            action,
        };

        // Make the external API call to update the milestone
        const response = await fetch(`${process.env.NEXT_ESCROW_URL}/milestone/${transactionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.NEXT_ESCROW_API_KEY, // Your API key from the environment variable
            },
            body: JSON.stringify(updatePayload),
        });

        const data = await response.json();

        // Check if the response from the external API was successful
        if (!response.ok) {
            return res.status(response.status).json({ success: false, message: data.message || 'Failed to update milestone' });
        }

        return res.status(200).json({ success: true, message: 'Milestone updated successfully', data });
    } catch (error) {
        console.log('ERROR::::', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
