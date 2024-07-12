import { User } from '@/models';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ where: { username } });
            if (user && await bcrypt.compare(password, user.password)) {
                const token = 'your-jwt-token'; // Implement JWT token generation
                res.setHeader('Set-Cookie', serialize('token', token, { path: '/' }));
                res.status(200).json({ success: true, message: 'Login successful' });
            } else {
                res.status(401).json({ success: false, message: 'Invalid username or password' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}