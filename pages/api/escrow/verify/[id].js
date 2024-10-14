export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method !== 'PUT') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    try {
        const response = await fetch(`${process.env.NEXT_ESCROW_URL}/verify/${id}`, {
            method: 'PUT',
            headers: {
                'x-api-key': process.env.NEXT_ESCROW_API_KEY,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ success: false, message: data.message || 'Failed to verify transaction' });
        }

        return res.status(200).json({ success: true, message: 'Transaction verified successfully', data });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
