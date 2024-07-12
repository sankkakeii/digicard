// import { BusinessCard, Product } from '@/models';

// const apiRoute = async (req, res) => {
//     const { id } = req.query;

//     try {
        // const businessCard = await BusinessCard.findOne({
        //     where: { id },
        //     include: [Product],
        // });

//         if (!businessCard) {
//             return res.status(404).json({ message: 'Business card not found' });
//         }

//         res.status(200).json(businessCard);
//     } catch (error) {
//         console.error('Error fetching card data:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// export default apiRoute;










import { BusinessCard, Product } from '@/models';

const apiRoute = async (req, res) => {
    const { id } = req.query; // Assuming slug is passed as a query parameter

    try {
        // const [firstName, lastName] = id.split('-');

        const businessCard = await BusinessCard.findOne({
            where: { card_url : id },
            include: [Product],
        });


        if (!businessCard) {
            return res.status(404).json({ message: 'Business card not found' });
        }

        res.status(200).json(businessCard);
    } catch (error) {
        console.error('Error fetching card data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default apiRoute;
