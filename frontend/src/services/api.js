import axios from 'axios';

// #old  http://localhost:8000
const API_BASE_URL = 'https://bombay-house-predictor.onrender.com/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch list of unique Mumbai localities from the backend.
 */
export const getLocalities = async () => {
  const response = await api.get('/localities');
  return response.data;
};

/**
 * Request house price prediction from the model.
 * @param {number} bhk
 * @param {number} area
 * @param {string} locality
 */
export const predictPrice = async (bhk, area, locality) => {
  const response = await api.post('/predict', {
    bhk: parseInt(bhk, 10),
    area: parseFloat(area),
    locality: locality,
  });
  return response.data;
};

/**
 * Fetch pre-aggregated analytics data for Recharts visualization.
 */
export const getAnalytics = async () => {
  const response = await api.get('/analytics');
  return response.data;
};

export default api;
