// src/services/cuisineService.js
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7036/api';

export const cuisineService = {
  async getCuisine(id) {
    const response = await axios.get(`${API_BASE_URL}/Cuisine/${id}`);
    return response.data;
  },
  async getCuisineRecipes(id) {
    const response = await axios.get(`${API_BASE_URL}/TopRecipe/leatest-cusine/${id}?page=1&pageSize=12`);
    return response.data;
  }
};
