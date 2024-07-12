import DigitalBusinessCard from '@/components/DigitalBusinessCard'
import React from 'react'

export default function View() {

    // Placeholder object with dummy data
    const placeholderCard = {
        first_name: "John",
        last_name: "Doe",
        job_title: "Software Engineer",
        email: "john.doe@example.com",
        phone: "+1234567890",
        logo: "/vercel.svg", // Adjust paths as needed
        profile_picture: "/vercel.svg",
        about_me: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        social_media: [
            { platform: "LinkedIn", url: "https://www.linkedin.com/in/johndoe" },
            { platform: "Twitter", url: "https://twitter.com/johndoe" },
            { platform: "GitHub", url: "https://github.com/johndoe" },
        ],
        products_services: [
            {
                name: "Product 1",
                description: "This is a description of Product 1.",
                url: "https://example.com/product1",
            },
            {
                name: "Service 1",
                description: "This is a description of Service 1.",
                url: "https://example.com/service1",
            },
        ],
    };


    return (
        <DigitalBusinessCard card={placeholderCard} csrfToken="dummy_csrf_token" />
    )
}
