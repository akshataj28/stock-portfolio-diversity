//DiversityScore.tsx
import React, { useEffect, useState } from 'react';
import './DiversityScore.css';

interface Stock {
  symbol: string;
  name: string;
  sector: string;
  price: number;
}

interface DiversityScoreProps {
  selectedStocks: Stock[];
}

const DiversityScore: React.FC<DiversityScoreProps> = ({ selectedStocks }) => {
  const [diversityScore, setDiversityScore] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Calculate the total value of the selected stocks
    const totalValue = selectedStocks.reduce((acc, stock) => acc + stock.price, 0);

    // Calculate the weight for each sector
    const sectorWeights = selectedStocks.reduce((acc, stock) => {
      acc[stock.sector] = (acc[stock.sector] || 0) + stock.price;
      return acc;
    }, {} as Record<string, number>);

    // Compute the normalized weights (w_n) for each sector
    const weights = Object.values(sectorWeights).map(value => value / totalValue);

    // Ensure we only consider the first 11 sectors for the diversity calculation
    const topWeights = weights.slice(0, 11);

    // Apply the formula D = (1 - sum(w_n^2))
    const diversity = 1 - topWeights.reduce((acc, weight) => acc + Math.pow(weight, 2), 0);

    // Set the diversity score
    setDiversityScore(diversity * 100);

    // Trigger the animation
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 300);

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, [selectedStocks]);

  return (
    <div className="diversity-score-container">
      <h2 className='heading'>Stock Portfolio Diversity</h2>

      <p className={`diversity-score-value ${animate ? 'pop' : ''}`}>
        {diversityScore.toFixed(2)}
      </p>
    </div>
  );
}

export default DiversityScore;
