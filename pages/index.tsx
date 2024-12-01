// pages/index.tsx
import React from 'react';
import NumerologyCalculator from './components/NumerologyCalculator';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Numerology Calculator</h1>
      <NumerologyCalculator />
    </div>
  );
};

export default Home;
