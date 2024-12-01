'use client';
import dynamic from 'next/dynamic'

const NumerologyCalculator = dynamic(
  () => import('../components/NumerologyCalculator'),
  { ssr: false }
)

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <NumerologyCalculator />
    </main>
  );
}