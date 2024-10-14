// pages/api/escrow/get-transaction.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    const { id } = req.body; // Get ID from the POST body

    console.log('here', id);

    try {
        // Make the external API call to fetch the transaction by ID
        const response = await fetch(`${process.env.NEXT_ESCROW_URL}/transactions/transactions/${id}`, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.NEXT_ESCROW_API_KEY, // Your API key from the environment variable
            },
        });

        const data = await response.json();

        console.log('data', data);

        // Check if the response from the external API was successful
        if (!response.ok) {
            return res.status(response.status).json({ success: false, message: data.message || 'Failed to fetch transaction' });
        }

        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.log('ERROR::::', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
