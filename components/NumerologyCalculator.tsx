
'use client';
import React, { useState } from 'react';

interface FamilyMember {
  name: string;
  day: string;
  month: string;
  year: string;
}

interface Result {
  year: number;
  yearNumber: number;
  luckyNumbers: number[];
  memberNumbers: { name: string; number: number; isLucky: boolean }[];
}

const NumerologyCalculator = () => {
  const [results, setResults] = useState<Result | null>(null);
  const [error, setError] = useState('');

  // Calculation functions
  const calculateLuckyNumbers = (yearNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9) => {
    const luckyMap: { [key in 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9]: number[] } = {
      1: [1, 2, 3],
      2: [2, 4, 6],
      3: [3, 6, 9],
      4: [1, 2, 4],
      5: [5, 10, 15],
      6: [6, 12, 18],
      7: [7, 14, 21],
      8: [8, 16, 24],
      9: [1, 3, 6, 9],
    };

    return luckyMap[yearNumber];
  };

  const handleCalculate = () => {
    try {
      const yearNumber = 5 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; // Example yearNumber for demo
      const years: Result = {
        year: 2024, // Example year
        yearNumber,
        luckyNumbers: calculateLuckyNumbers(yearNumber),
        memberNumbers: [],
      };

      setResults(years);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  return (
    <div>
      <h1>Numerology Calculator</h1>
      <button onClick={handleCalculate}>Calculate</button>
      {results && (
        <div>
          <h2>Results</h2>
          <p>Year: {results.year}</p>
          <p>Lucky Numbers: {results.luckyNumbers.join(', ')}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default NumerologyCalculator;
