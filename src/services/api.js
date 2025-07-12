import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// Cake API calls
export const cakeAPI = {
  getAll: (params = {}) => api.get('/cakes', { params }),
  getById: (id) => api.get(`/cakes/${id}`),
  create: (cakeData) => api.post('/cakes', cakeData),
  update: (id, cakeData) => api.put(`/cakes/${id}`, cakeData),
  delete: (id) => api.delete(`/cakes/${id}`),
};

// Order API calls
export const orderAPI = {
  getAll: (params = {}) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  create: (orderData) => api.post('/orders', orderData),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api; 