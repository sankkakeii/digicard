import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DigitalBusinessCard from '@/components/DigitalBusinessCard';

export default function CardPage() {
  const router = useRouter();
  const { id } = router.query;
  const [card, setCard] = useState(null);

  useEffect(() => {
    console.log('Router query:', router.query);
    console.log('Card ID:', id);

    if (id) {
      fetch(`/api/backed/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            console.log(data.message);
            setCard(null);
          } else {
            setCard(data);
          }
        })
        .catch((error) => {
          console.error('Error fetching card data:', error);
          setCard(null);
        });
    }
  }, [id]);

  if (!card) {
    return <div>Card not found</div>;
  }

  return (
    <main className="flex relative min-h-screen flex-col items-center bg-gray-100s">
                  <div className="absolute top-0 rounded-full bg-violet-300 -left-4 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute rounded-full bg-fuchsia-300 bottom-24 right-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      <DigitalBusinessCard card={card} />
    </main>
  );
}
