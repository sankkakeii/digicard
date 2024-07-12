
// import { BusinessCard } from '@/models';
// import { v4 as uuidv4 } from 'uuid';

// const apiRoute = async (req, res) => {
//     const data = req.body;
//     const logo = data.logo || null;
//     const profile_picture = data.profilePicture || null;

//     const card_id = uuidv4();
//     const id = `${card_id}`;
//     const ext_card_url = `${id}`;

//     try {
//         const new_card = await BusinessCard.create({
//             id, // Ensure id is included
//             first_name: data.firstName,
//             last_name: data.lastName,
//             job_title: data.jobTitle,
//             email: data.email,
//             phone: data.phone,
//             logo,
//             profile_picture,
//             social_media: JSON.parse(data.social_media || '[]'), // Ensure this is a valid JSON string
//             products_services: JSON.parse(data.products_services || '[]'), // Ensure this is a valid JSON string
//             card_url: ext_card_url, // Ensure card_url is included
//         });

//         res.status(200).json({ success: true, message: 'Digital Business Card created successfully', card_url: ext_card_url, card_id: new_card.id });
//     } catch (error) {
//         console.log('ERROR:::::::::::', error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// };

// export default apiRoute;













import { BusinessCard } from '@/models';
import { v4 as uuidv4 } from 'uuid';

const apiRoute = async (req, res) => {
    const data = req.body;
    const logo = data.logo || null;
    const profile_picture = data.profilePicture || null;

    const nameSlug = `${data.firstName}-${data.lastName}`.toLowerCase().replace(/\s+/g, '-');
    const card_id = uuidv4();
    const id = `${card_id}`;
    const ext_card_url = `${nameSlug}`;

    try {
        const new_card = await BusinessCard.create({
            id, // Ensure id is included
            first_name: data.firstName,
            last_name: data.lastName,
            job_title: data.jobTitle,
            email: data.email,
            phone: data.phone,
            logo,
            profile_picture,
            social_media: JSON.parse(data.social_media || '[]'), // Ensure this is a valid JSON string
            products_services: JSON.parse(data.products_services || '[]'), // Ensure this is a valid JSON string
            card_url: ext_card_url, // Ensure card_url is included
        });

        res.status(200).json({ success: true, message: 'Digital Business Card created successfully', card_url: ext_card_url, card_id: new_card.id });
    } catch (error) {
        console.log('ERROR:::::::::::', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export default apiRoute;
