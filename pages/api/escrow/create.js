// pages/api/escrow/create.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    console.log(process.env.NEXT_ESCROW_API_KEY)

    try {
        const {
            buyerId,
            buyerPhone,
            buyerEmail,
            product,
            amount,
            currency,
            transactionType,
        } = req.body;

        console.log('req.body', req.body)

        // Validate request data (simple validation)
        if (!buyerId || !buyerPhone || !buyerEmail || !product || !amount || !currency || !transactionType) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Create the transaction payload for the external API
        const transactionPayload = {
            buyerId,
            buyerPhone,
            buyerEmail,
            product,
            amount,
            currency,
            transactionType,
        };

        // Make the external API call
        const response = await fetch(`${process.env.NEXT_ESCROW_URL}/transactions/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.NEXT_ESCROW_API_KEY, // Your API key from the environment variable
            },
            body: JSON.stringify(transactionPayload),
        });

        const data = await response.json();

        // Check if the response from the external API was successful
        if (!response.ok) {
            return res.status(response.status).json({ success: false, message: data.message || 'Failed to create escrow transaction' });
        }

        return res.status(201).json({ success: true, message: 'Transaction created successfully', data });
    } catch (error) {
        console.log('ERROR::::', error)
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
