// escrow/seller-update-milestone.js

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    try {
        const { milestoneId, transactionId, status, action, sellerId } = req.body;

        if (!milestoneId || !status || !action) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const updatePayload = {
            sellerId,
            milestoneId,
            status,
            action,
        };

        console.log(updatePayload)

        const response = await fetch(`${process.env.NEXT_ESCROW_URL}/transactions/milestone/seller/${transactionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.NEXT_ESCROW_API_KEY,
            },
            body: JSON.stringify(updatePayload),
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ success: false, message: data.message || 'Failed to update seller milestone' });
        }

        return res.status(200).json({ success: true, message: 'Milestone updated successfully', data });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
