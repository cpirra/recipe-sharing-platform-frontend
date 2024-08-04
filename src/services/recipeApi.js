import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:7036/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchUserCreatedRecipes = async (userId) => {
  try {
    const response = await apiClient.get(`/Recipe/user/${userId}?page=1&pageSize=10`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user-created recipes:', error);
    return [];
  }
};

// Other functions...
