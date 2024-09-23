import React from 'react'
import QRCode from 'qrcode.react';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

export default function PreviewComponent({ previewData, cardId, handleCopyLink }) {
    return (
        <div className="flex-1 lg:border-l-2 lg:pl-5">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Preview</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">{previewData.firstName} {previewData.lastName}</h3>
                        <p className="text-gray-600">{previewData.jobTitle}</p>
                    </div>
                    <div className="w-16 h-16">
                        {previewData.profilePicture ? (
                            <Image
                                src={previewData.profilePicture}
                                alt={`${previewData.firstName}'s Profile Picture`}
                                layout="responsive"
                                width={64}
                                height={64}
                                className="rounded-full"
                            />
                        ) : (
                            <Image src="/digicard-profile.png" alt="Profile Placeholder" width={64} height={64} />
                        )}
                    </div>
                </div>
                <hr className="my-4" />
                <div className="mb-4">
                    {previewData.logo ? (
                        <div className="w-full mb-4">
                            <Image
                                src={previewData.logo}
                                alt="Business Logo"
                                layout="responsive"
                                width={200}
                                height={100}
                                className="object-contain"
                            />
                        </div>
                    ) : (
                        <Image src="/digicard-business.png" alt="Logo Placeholder" width={600} height={600} />
                    )}
                    <div>
                        <p className="text-gray-700 mb-2">
                            <strong>Email:</strong> {previewData.email}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Phone:</strong> {previewData.phone}
                        </p>

                        {previewData.socialMedia.length > 0 && (
                            <>
                                <p className="text-gray-700 mb-2"><strong>Social Media:</strong></p>
                                <ul className="flex space-x-4 mb-2">
                                    {previewData.socialMedia.map((entry, index) => {
                                        let Icon;
                                        switch (entry.platform) {
                                            case 'Facebook':
                                                Icon = FaFacebook;
                                                break;
                                            case 'Instagram':
                                                Icon = FaInstagram;
                                                break;
                                            case 'Twitter':
                                                Icon = FaTwitter;
                                                break;
                                            case 'LinkedIn':
                                                Icon = FaLinkedin;
                                                break;
                                            default:
                                                Icon = null;
                                        }
                                        return (
                                            <li key={index} className="text-gray-800">
                                                <a href={entry.url} target="_blank" rel="noopener noreferrer">
                                                    {Icon && <Icon size={40} />}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </>
                        )}


                        {previewData.products.length > 0 && (
                            <>
                                <p className="text-gray-700 mb-2"><strong>Products:</strong></p>
                                <ul className="mb-2">
                                    {previewData.products.map((entry, index) => (
                                        <li key={index} className="text-blue-500 mb-1">
                                            <a href={entry.url} target="_blank" rel="noopener noreferrer">
                                                {entry.name}
                                            </a>
                                            <p className="text-gray-600">{entry.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex justify-end">
                    {cardId && (
                        <div className="flex gap-5">
                            <QRCode value={`${window.location.origin}/cards/${cardId}`} />
                            <button
                                onClick={handleCopyLink}
                                className="py-2 px-4 h-fit bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                            >
                                Copy Link
                            </button>
                            <Link href={`/cards/${cardId}`} className="underline text-blue-500 hover:text-blue-600" >Go to Card</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
