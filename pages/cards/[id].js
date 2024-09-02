// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import DigitalBusinessCard from '@/components/DigitalBusinessCard';
// import NotFound from '@/components/NotFound';
// import Spinner from '@/components/Spinner';

// export default function CardPage() {
//   const router = useRouter();
//   const { id } = router.query;
//   const [card, setCard] = useState(null);
//   const [loading, setLoading] = useState(true); // Add loading state

//   useEffect(() => {
//     setLoading(true); // Set loading to true when fetching data
//     console.log('Router query:', router.query);
//     console.log('Card ID:', id);

//     if (id) {
//       fetch(`/api/backed/${id}`)
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.message) {
//             console.log(data.message);
//             setCard(null);
//           } else {
//             console.log(data)
//             setCard(data);
//           }
//         })
//         .catch((error) => {
//           console.error('Error fetching card data:', error);
//           setCard(null);
//         })
//         .finally(() => setLoading(false)); // Set loading to false after fetching data
//     }
//   }, [id]);

//   if (loading) {
//     return <Spinner />; // Display loading text while fetching data
//   }

//   if (!card) {
//     return <NotFound />;
//   }

//   return (
//     <main className="flex relative min-h-screen flex-col items-center bg-none">
//       <div className="-z-30 absolute top-0 rounded-full bg-violet-300 -left-4 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
//       <div className="-z-30 absolute rounded-full bg-fuchsia-300 bottom-24 right-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
//       <DigitalBusinessCard card={card} />
//     </main>
//   );
// }








import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DigitalBusinessCard from '@/components/DigitalBusinessCard';
import NotFound from '@/components/NotFound';
import Spinner from '@/components/Spinner';

export default function CardPage() {
  const router = useRouter();
  const { id } = router.query;
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Wait for the 'id' to be defined

    setLoading(true); // Set loading to true when fetching data
    console.log('Router query:', router.query);
    console.log('Card ID:', id);

    fetch(`/api/backed/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.log(data.message);
          setCard(null);
        } else {
          console.log(data);
          setCard(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching card data:', error);
        setCard(null);
      })
      .finally(() => setLoading(false)); // Set loading to false after fetching data
  }, [id]);

  if (loading) {
    return <Spinner />; // Display Spinner while fetching data
  }

  if (!card) {
    return <NotFound />; // Display NotFound if no card is found
  }

  return (
    <main className="flex relative min-h-screen flex-col items-center bg-none">
      <div className="-z-30 absolute top-0 rounded-full bg-violet-300 -left-4 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="-z-30 absolute rounded-full bg-fuchsia-300 bottom-24 right-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      <DigitalBusinessCard card={card} />
    </main>
  );
}
