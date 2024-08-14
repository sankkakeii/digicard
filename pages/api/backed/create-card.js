import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const apiRoute = async (req, res) => {
    const data = req.body;

    console.log('Incoming payload size:', JSON.stringify(data).length);

    const logo = data.logo || null;
    const profile_picture = data.profilePicture || null;

    const nameSlug = `${data.firstName}-${data.lastName}`.toLowerCase().replace(/\s+/g, '-');
    const card_id = uuidv4();
    const id = `${card_id}`;
    const ext_card_url = `${nameSlug}`;

    try {
        console.log('Attempting to insert data into Supabase');
        const { data: new_card, error } = await supabase
            .from('business_cards')
            .insert([
                {
                    id,
                    creator_id: data.creator_id,
                    first_name: data.firstName,
                    last_name: data.lastName,
                    job_title: data.jobTitle,
                    email: data.email,
                    phone: data.phone,
                    logo,
                    profile_picture,
                    social_media: data.social_media ? JSON.parse(data.social_media) : [],
                    products_services: data.products_services ? JSON.parse(data.products_services) : [],
                    card_url: ext_card_url,
                }
            ])
            .select();  // Add this to return the inserted data

        if (error) {
            console.log('Supabase error:', error);
            throw error;
        }

        console.log('Supabase insert result:', new_card);

        if (!new_card || new_card.length === 0) {
            throw new Error('No data returned from Supabase insert');
        }

        res.status(200).json({ success: true, message: 'Digital Business Card created successfully', card_url: ext_card_url, card_id: new_card[0].id });
    } catch (error) {
        console.log('ERROR:::::::::::', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

export default apiRoute;