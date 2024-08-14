// pages/api/auth/login.js
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import { serialize } from 'cookie'
import jwt from 'jsonwebtoken'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        try {
            const { data: user, error } = await supabase
                .from('users')
                .select('*')
                .eq('username', username)
                .single()

            if (error || !user) {
                return res.status(401).json({ success: false, message: 'Invalid username or password' })
            }

            console.log(user)

            const passwordMatch = await bcrypt.compare(password, user.password)

            if (passwordMatch) {
                const token = jwt.sign({ id: user.id, username: user.username }, process.env.NEXT_JWT_SECRET, { expiresIn: '1h' })
                res.setHeader('Set-Cookie', serialize('token', token, { path: '/', httpOnly: true }))
                res.status(200).json({ success: true, message: 'Login successful', data: user })
            } else {
                res.status(401).json({ success: false, message: 'Invalid username or password' })
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' })
    }
}
