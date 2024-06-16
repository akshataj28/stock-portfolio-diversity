// Portfolio.tsx
import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography, Paper } from '@mui/material';
import { fetchStocks, Stock } from '../services/stockService';
import StockList from './StockList';
import SelectedStocks from './SelectedStocks';
import DiversityScore from './DiversityScore';
import './Portfolio.css';

const Portfolio: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [selectedStocks, setSelectedStocks] = useState<Stock[]>([]);

  useEffect(() => {
    const loadStocks = async () => {
      try {
        const fetchedStocks = await fetchStocks();
        setStocks(fetchedStocks);
      } catch (error) {
        console.error('Failed to load stocks:', error);
      }
    };
    loadStocks();
  }, []);

  const handleSelectStock = (stock: Stock) => {
    // Remove the stock from the stocks list and add it to the selected stocks
    setStocks(stocks.filter(s => s.symbol !== stock.symbol));
    setSelectedStocks([...selectedStocks, stock]);
  };

  const handleRemoveStock = (stock: Stock) => {
    // Remove the stock from the selected stocks and add it back to the stocks list
    setSelectedStocks(selectedStocks.filter(s => s.symbol !== stock.symbol));
    setStocks([...stocks, stock]);
  };

  return (
    <Container className="portfolio-container">
      <h1 className="portfolio-title">Stock Portfolio Manager</h1>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper className="paper" elevation={3}>
            <SelectedStocks
              selectedStocks={selectedStocks}
              onRemoveStock={handleRemoveStock}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="paper1" elevation={3}>
            <DiversityScore selectedStocks={selectedStocks} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className="paper" elevation={3}>
            <StockList stocks={stocks} onSelectStock={handleSelectStock} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Portfolio;
