'use client';

import React from 'react';
import NumerologyCalculator from '../components/NumerologyCalculator';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white shadow-md rounded-lg mb-8 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to the Numerology Calculator
        </h1>
        <p className="text-gray-600">
          Calculate your family numerology in a simple and interactive way.
        </p>
      </header>
      <main>
        <NumerologyCalculator />
      </main>
      <footer className="mt-8 text-center text-gray-600">
        &copy; {new Date().getFullYear()} Family Numerology Calculator. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
