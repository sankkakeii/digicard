// // pages/api/product.js
// import { createClient } from '@supabase/supabase-js';

// // Initialize Supabase client
// const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// const createProductRoute = async (req, res) => {
//     const { productName, description, amount, images, productUrl, businessCardId } = req.body;

//     try {
//         const { data: new_product, error } = await supabase
//             .from('products')
//             .insert([
//                 {
//                     name: productName,
//                     description,
//                     amount,
//                     images,
//                     url: productUrl,
//                     business_card_id: businessCardId,
//                 }
//             ]);

//         if (error) throw error;

//         res.status(200).json({ success: true, message: 'Product created successfully' });
//     } catch (error) {
//         console.error('ERROR:::::::::::', error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// };

// export default createProductRoute;















// // pages/api/product.js
// import { createClient } from '@supabase/supabase-js';

// // Initialize Supabase client
// const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// const createProductRoute = async (req, res) => {
//     const { productName, description, amount, images, productUrl, businessCardId } = req.body;

//     try {
//         // Insert new product into the database, including the base64 images
//         const { data: new_product, error } = await supabase
//             .from('products')
//             .insert([
//                 {
//                     name: productName,
//                     description,
//                     amount,
//                     images,  // Save images as base64 array
//                     url: productUrl,
//                     business_card_id: businessCardId,
//                 }
//             ]);

//         if (error) throw error;

//         res.status(200).json({ success: true, message: 'Product created successfully', product: new_product });
//     } catch (error) {
//         console.error('ERROR:::::::::::', error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// };

// export default createProductRoute;








import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const createProductRoute = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    const { productName, description, amount, images, productUrl, businessCardId } = req.body;

    try {
        // Check if payload size exceeds the limit
        const payloadSize = JSON.stringify(req.body).length;
        console.log('Payload size:', payloadSize);

        if (payloadSize > 1048576) { // 1MB limit
            return res.status(413).json({
                success: false,
                message: 'Payload too large. Please compress images or reduce content size.'
            });
        }

        // Insert new product into the database, including the base64 images
        const { data: new_product, error } = await supabase
            .from('products')
            .insert([
                {
                    name: productName,
                    description,
                    amount,
                    images,  // Save images as base64 array
                    url: productUrl,
                    business_card_id: businessCardId,
                }
            ]);

        if (error) throw error;

        res.status(200).json({ success: true, message: 'Product created successfully', product: new_product });
    } catch (error) {
        console.error('ERROR:::::::::::', error);

        if (error.message.includes('413')) {
            return res.status(413).json({
                success: false,
                message: 'Payload too large. Please compress images or reduce content size.'
            });
        }

        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

// Adjusting body size limit configuration for this API route
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '2mb', // Set body size limit (e.g., 2MB)
        },
    },
};

export default createProductRoute;
