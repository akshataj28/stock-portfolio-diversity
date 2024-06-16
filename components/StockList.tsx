// StockList.tsx
import React, { useEffect, useState, useRef } from 'react';
import './StockList.css';
import { Typography, Button, CircularProgress } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material'; // Import icons for arrows

interface Stock {
  symbol: string;
  name: string;
  sector: string;
  price: number;
}

interface StockListProps {
  stocks: Stock[];
  onSelectStock: (stock: Stock) => void;
}

const StockList: React.FC<StockListProps> = ({ stocks, onSelectStock }) => {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null); // Create a ref to the container

  useEffect(() => {
    // Simulate a fetch to show the loading spinner
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  // Function to handle scroll to the left
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: 'smooth' }); // Adjust the scroll value as needed
    }
  };

  // Function to handle scroll to the right
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: 'smooth' }); // Adjust the scroll value as needed
    }
  };

  return (
    <div className='Container'>
      <h2 className='heading2'>All Stocks</h2>
      {loading ? (
        <div className="spinner-container">
          <CircularProgress />
          <Typography variant="body1">Loading stocks...</Typography>
        </div>
      ) : (
        <>
          <div ref={containerRef} className="stock-list-container">
            {stocks.length === 0 ? (
              <Typography variant="body1" className="no-stocks-message">No stocks available</Typography>
            ) : (
              stocks.map(stock => (
                <div key={stock.symbol} className="stock-list-item">
                  <div>
                    <Typography variant="body1">{stock.name} ({stock.symbol})</Typography>
                    <Typography variant="body2">Sector: {stock.sector}</Typography>
                    <Typography variant="body2"> Price: ${stock.price.toFixed(2)}</Typography>
                  </div>
                  <br></br>
                  <Button variant="contained" onClick={() => onSelectStock(stock)}>Add</Button>
                </div>
              ))
            )}
          </div>
          <button className="arrow left-arrow" onClick={scrollLeft}>
            <ArrowBack />
          </button>
          <button className="arrow right-arrow" onClick={scrollRight}>
            <ArrowForward />
          </button>
        </>
      )}
    </div>
  );
};

export default StockList;
