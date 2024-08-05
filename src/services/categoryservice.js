import axios from 'axios';

const API_BASE_URL = 'http://34.17.45.194:8080/api';

export const categoryService = {
  async getCategoryRecipes(id, page = 1, pageSize = 12) {
    const response = await axios.get(`${API_BASE_URL}/TopRecipe/leatest-category/${id}`, {
      params: { page, pageSize }
    });
    return response.data;
  }
};
