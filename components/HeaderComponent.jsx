import Link from 'next/link'
import React from 'react'

export default function HeaderComponent({title}) {
    return (
        <div className="w-full flex justify-between items-center mb-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg text-white p-6">
            <h1 className="text-3xl font-bold">{title}</h1>
            <ul className="flex gap-2 items-center justify-center">
                <li className="hover:text-green-500"><Link href={'/'}>Home</Link></li>
                <li className="hover:text-green-500"><Link href={'/profile/profile'}>Profile</Link></li>
                <li className="hover:text-green-500"><Link href={'/directories/products'}>Products</Link></li>
                <li className="hover:text-green-500"><Link href={'/directories/business-cards'}>Cards</Link></li>
            </ul>
        </div>
    )
}


                {/* <div className="w-full flex justify-between items-center mb-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg hover:shadow-xl text-white z-50 p-6">
                    <h1 className="text-3xl font-semibold">Welcome, <span className="text-green-500">{userData?.firstname}</span>!</h1>
                    <ul className="flex gap-2 items-center justify-center">
                        <li className="hover:text-green-500"><Link href={'/'}>Home</Link></li>
                        <li className="hover:text-green-500"><Link href={'/profile/profile'}>Profile</Link></li>
                        <li className="hover:text-green-500"><Link href={'/directories/products'}>Products</Link></li>
                        <li className="hover:text-green-500"><Link href={'/directories/business-cards'}>Cards</Link></li>
                    </ul>
                </div> */}

                                {/* <div className="w-full flex justify-between items-center mb-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg hover:shadow-xl text-white z-50 p-6">
                    <h1 className="text-3xl font-semibold">Hi there!, I&apos;m <span className="text-green-400">{card.first_name}</span></h1>
                    <ul className="flex gap-2 items-center justify-center">
                        <li className="hover:text-green-500"><Link href={'/'}>Home</Link></li>
                        <li className="hover:text-green-500"><Link href={'/profile/profile'}>Profile</Link></li>
                        <li className="hover:text-green-500"><Link href={'/directories/products'}>Products</Link></li>
                        <li className="hover:text-green-500"><Link href={'/directories/business-cards'}>Cards</Link></li>
                    </ul>
                </div> */}