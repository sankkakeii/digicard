import { sequelize, User } from '@/models';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    await sequelize.sync(); // Ensure the database is synchronized

    if (req.method === 'POST') {
        const { username, password } = req.body;

        try {
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Username already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({ username, password: hashedPassword });

            res.status(200).json({ success: true, message: 'Registration successful' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}