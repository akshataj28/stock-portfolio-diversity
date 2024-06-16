// SelectedStocks.tsx
import React, { useRef } from 'react';
import './SelectedStocks.css';
import { Typography, Button } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material'; // Import icons for arrows

interface Stock {
  symbol: string;
  name: string;
  sector: string;
  price: number;
}

interface SelectedStocksProps {
  selectedStocks: Stock[];
  onRemoveStock: (stock: Stock) => void;
}

const SelectedStocks: React.FC<SelectedStocksProps> = ({ selectedStocks, onRemoveStock }) => {
  const containerRef = useRef<HTMLDivElement>(null); // Create a ref to the container

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

  const handleRemoveStock = (stock: Stock) => {
    onRemoveStock(stock);
  };

  return (
    <div className='Container'>
      <h2 className='heading1'>Selected Stocks</h2>
      <div ref={containerRef} className="selected-stocks-container">
        {selectedStocks.length === 0 ? (
          <Typography variant="body1" className="no-stocks-message">No stocks added</Typography>
        ) : (
          selectedStocks.map(stock => (
            <div key={stock.symbol} className="selected-stock-item">
              <div>
                <Typography variant="body1" className="stockname">{stock.name} ({stock.symbol})</Typography>
                <Typography variant="body2">Sector: {stock.sector}</Typography>
                <Typography variant="body2">Price: ${stock.price.toFixed(2)}</Typography>
              </div>
              <Button onClick={() => handleRemoveStock(stock)}>Remove</Button>
            </div>
          ))
        )}
      </div>
      {selectedStocks.length > 0 && (
        <>
          <button className="arrow1 left-arrow1" onClick={scrollLeft}>
            <ArrowBack />
          </button>
          <button className="arrow1 right-arrow1" onClick={scrollRight}>
            <ArrowForward />
          </button>
        </>
      )}
    </div>
  );
};

export default SelectedStocks;
