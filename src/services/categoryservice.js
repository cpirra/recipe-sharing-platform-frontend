import axios from 'axios';

const API_BASE_URL = 'https://localhost:7036/api';

export const categoryService = {
  async getCategoryRecipes(id, page = 1, pageSize = 12) {
    const response = await axios.get(`${API_BASE_URL}/TopRecipe/leatest-category/${id}`, {
      params: { page, pageSize }
    });
    return response.data;
  }
};
