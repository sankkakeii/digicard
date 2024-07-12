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
    <main className="flex min-h-screen flex-col items-center">
      <DigitalBusinessCard card={card} />
    </main>
  );
}
