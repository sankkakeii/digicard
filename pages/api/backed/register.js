
// pages/api/auth/register.jimport { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password, firstname, lastname, email, phone, address } = req.body;

        try {
            const { data: existingUser, error: userFetchError } = await supabase
                .from('users')
                .select('id')
                .eq('username', username)
                .single()

            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Username already exists' })
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const { data: authData, error: authError } = await supabase.auth.admin.createUser({
                email,
                password: hashedPassword,
                email_confirm: true,
                user_metadata: { firstname, lastname, phone, address }
            })

            if (authError) throw authError

            const { data: userData, error: userInsertError } = await supabase
                .from('users')
                .insert({
                    id: authData.user.id,
                    username,
                    password: hashedPassword,
                    firstname,
                    lastname,
                    email,
                    phone,
                    address,
                })

            if (userInsertError) throw userInsertError

            res.status(200).json({ success: true, message: 'Registration successful' })
        } catch (error) {
            console.error('Registration error:', error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' })
    }
}
