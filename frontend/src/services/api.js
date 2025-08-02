import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const skillsAPI = {
  // Get all skills with filters
  getSkills: (params = {}) => {
    return api.get('/skills', { params });
  },

  // Get skill by ID
  getSkillById: (id) => {
    return api.get(`/skills/${id}`);
  },

  // Get categories
  getCategories: () => {
    return api.get('/skills/categories');
  },

  // Get filter options
  getFilterOptions: () => {
    return api.get('/skills/filter-options');
  },
};

export default api;