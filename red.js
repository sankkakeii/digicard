// import Image from 'next/image';
// import { useState } from 'react';

// export default function DigitalBusinessCard({ card, csrfToken }) {
//     const [activeSection, setActiveSection] = useState('about');

//     const downloadVCard = () => {
//         const vcard = `BEGIN:VCARD
// VERSION:3.0
// FN:${card.first_name} ${card.last_name}
// N:${card.last_name};${card.first_name}
// TITLE:${card.job_title}
// EMAIL:${card.email}
// TEL:${card.phone}
// ${card.logo ? `PHOTO;VALUE=URL:${window.location.origin}/uploads/${card.logo}` : ''}
// END:VCARD`;

//         const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = `${card.first_name}_${card.last_name}.vcf`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     const shareCard = () => {
//         if (navigator.share) {
//             navigator
//                 .share({
//                     title: `${card.first_name} ${card.last_name} - Digital Business Card`,
//                     url: window.location.href,
//                 })
//                 .then(() => {
//                     console.log('Thanks for sharing!');
//                 })
//                 .catch(console.error);
//         } else {
//             prompt('Copy this link to share the card:', window.location.href);
//         }
//     };

//     const renderSectionContent = () => {
//         switch (activeSection) {
//             case 'about':
//                 return <div>{card.about_me}</div>;
//             case 'products':
//                 return (
//                     <div className="mb-6">
//                         <h2 className="text-xl font-semibold text-gray-800 mb-2">Products & Services</h2>
//                         {card.products_services.map((product, index) => (
//                             <div key={index} className="mb-4">
//                                 <strong className="text-gray-800">{product.name}</strong>
//                                 <p className="text-gray-600">{product.description}</p>
//                                 <a
//                                     href={product.url}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-blue-600"
//                                 >
//                                     Learn More
//                                 </a>
//                             </div>
//                         ))}
//                     </div>
//                 );
//             case 'contact':
//                 return (
//                     <div className="mb-6">
//                         {card.email && (
//                             <p className="flex mb-2">
//                                 <i className="fas fa-envelope mr-2"></i>
//                                 <a href={`mailto:${card.email}`} className="text-blue-600">{card.email}</a>
//                             </p>
//                         )}
//                         {card.phone && (
//                             <p className="flex">
//                                 <i className="fas fa-phone mr-2"></i>
//                                 <a href={`tel:${card.phone}`} className="text-blue-600">{card.phone}</a>
//                             </p>
//                         )}
//                     </div>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 w-full p-4 flex flex-col items-center lg:px-20">
//             <div className="bg-white rounded-xl shadow-lg p-6 text-center mb-8 w-full max-w-4xl">
//                 <div className="mb-6">
//                     {card.logo ? (
//                         <Image
//                             src={`${card.logo}`}
//                             width={70}
//                             height={70}
//                             alt="Business Logo"
//                             className="object-contain mb-4 mx-auto"
//                         />
//                     ) : null}
//                     {card.profile_picture ? (
//                         <Image
//                             src={`${card.profile_picture}`}
//                             width={100}
//                             height={100}
//                             alt="Profile Picture"
//                             className="rounded-full object-contain mb-4 border-4 border-blue-600 mx-auto"
//                         />
//                     ) : (
//                         <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mb-4 mx-auto">
//                             <span className="text-2xl text-white">
//                                 {card.first_name[0]}
//                                 {card.last_name[0]}
//                             </span>
//                         </div>
//                     )}
//                 </div>
//                 <h1 className="text-2xl font-bold text-gray-800 mb-2">{card.first_name} {card.last_name}</h1>
//                 <p className="italic text-gray-600 mb-4">{card.job_title}</p>
//             </div>
//             <div className="flex flex-col lg:flex-row w-full max-w-4xl">
//                 <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg p-6 mb-4 lg:mb-0">
//                     <ul className="space-y-4">
//                         <li
//                             className={`cursor-pointer ${activeSection === 'about' ? 'font-bold' : ''}`}
//                             onClick={() => setActiveSection('about')}
//                         >
//                             About Me
//                         </li>
//                         <li
//                             className={`cursor-pointer ${activeSection === 'products' ? 'font-bold' : ''}`}
//                             onClick={() => setActiveSection('products')}
//                         >
//                             Products & Services
//                         </li>
//                         <li
//                             className={`cursor-pointer ${activeSection === 'contact' ? 'font-bold' : ''}`}
//                             onClick={() => setActiveSection('contact')}
//                         >
//                             Contact
//                         </li>
//                     </ul>
//                 </div>
//                 <div className="w-full lg:w-3/4 bg-white rounded-xl shadow-lg p-6 lg:ml-4">
//                     {renderSectionContent()}
//                 </div>
//             </div>
//             <div className="mt-6 flex flex-col lg:flex-row gap-4">
//                 <button
//                     onClick={downloadVCard}
//                     className="m-2 p-2 bg-blue-600 text-white rounded transition duration-300 hover:bg-blue-700 flex items-center justify-center"
//                 >
//                     <i className="fas fa-download mr-2"></i>Download vCard
//                 </button>
//                 <button
//                     onClick={shareCard}
//                     className="m-2 p-2 bg-blue-600 text-white rounded transition duration-300 hover:bg-blue-700 flex items-center justify-center"
//                 >
//                     <i className="fas fa-share-alt mr-2"></i>Share
//                 </button>
//             </div>
//         </div>
//     );
// }





















