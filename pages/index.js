import DigiCard from '@/components/DigiCard'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <section>
      <Link className="text-blue-500 underline ml-8 mt-3 hover:text-blue-700" href="http://localhost:3000/cards/58303464-371f-4ff2-89eb-da43d42e010e">Demo Card Link</Link>
      <Link className="text-blue-500 underline ml-8 mt-3 hover:text-blue-700" href="https://digicard-eta.vercel.app/cards/58303464-371f-4ff2-89eb-da43d42e010e">Demo Card Link</Link>
      <DigiCard />
    </section>
  )
}

