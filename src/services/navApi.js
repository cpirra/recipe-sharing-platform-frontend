const API_BASE_URL = 'https://localhost:7036/api';

export const fetchCuisines = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/Cuisine`);
    if (!response.ok) {
      throw new Error('Failed to fetch cuisines');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching cuisines:', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/Categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
