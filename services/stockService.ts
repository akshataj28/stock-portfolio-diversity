import axios from 'axios';

const API_KEY = "cpkqo1pr01qulsvjhqbgcpkqo1pr01qulsvjhqc0"; 
const BASE_URL = 'https://finnhub.io/api/v1';

export interface Stock {
  symbol: string;
  name: string;
  sector: string;
  price: number;
}

const fetchStockSymbol = async (exchange: string): Promise<string[]> => {
  if (!API_KEY) {
    throw new Error('API key not found in environment variables');
  }
  try {
    const response = await axios.get(`${BASE_URL}/stock/symbol`, {
      params: {
        exchange,
        token: API_KEY,
      },
    });
    return response.data.slice(0, 15).map((stock: any) => stock.symbol); // Limiting to 15 symbols for simplicity
  } catch (error) {
    console.error('Error fetching stock symbols:', error);
    throw error;
  }
};

const fetchStockData = async (symbol: string): Promise<Stock> => {
  try {
    const [quoteResponse, profileResponse] = await Promise.all([
      axios.get(`${BASE_URL}/quote`, { params: { symbol, token: API_KEY } }),
      axios.get(`${BASE_URL}/stock/profile2`, { params: { symbol, token: API_KEY } }),
    ]);

    return {
      symbol: symbol,
      name: profileResponse.data.name || symbol,
      sector: profileResponse.data.finnhubIndustry || 'Unknown',
      price: quoteResponse.data.c,
    };
  } catch (error) {
    console.error(`Error fetching data for symbol ${symbol}:`, error);
    throw error;
  }
};

export const fetchStocks = async (): Promise<Stock[]> => {
  try {
    const stockSymbols = await fetchStockSymbol('US');
    const stockDataPromises = stockSymbols.map(symbol => fetchStockData(symbol));
    const stockData = await Promise.all(stockDataPromises);
    return stockData;
  } catch (error) {
    console.error('Error fetching stocks:', error);
    throw error;
  }
};
