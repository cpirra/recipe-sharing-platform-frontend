import { ref, watch } from 'vue';
import { categoryService } from '@/services/categoryservice';

export function useCategories(categoryId) {
  const recipes = ref([]);
  const error = ref(null);
  const loading = ref(false);
  const categoryName = ref('');

  const fetchCategoryRecipes = async (id) => {
    loading.value = true;
    try {
      const response = await categoryService.getCategoryRecipes(id);
      console.log('API Response:', response); // Log the response for debugging

      if (Array.isArray(response)) {
        recipes.value = response;
        // Set the category name based on the first recipe's categories
        categoryName.value = response.length > 0 && response[0].categories.length > 0
          ? response[0].categories[0]
          : 'Unknown Category';
        error.value = response.length === 0 ? 'No recipes found for this category.' : null;
      } else {
        console.error('Unexpected response structure:', response);
        error.value = 'Unexpected response format.';
      }
    } catch (err) {
      console.error('Fetch error:', err);
      error.value = `Failed to fetch category recipes: ${err.message}`;
    } finally {
      loading.value = false;
    }
  };

  watch(categoryId, (newId) => {
    if (newId) {
      fetchCategoryRecipes(newId);
    } else {
      error.value = 'Invalid category ID.';
    }
  }, { immediate: true });

  return { recipes, error, loading, categoryName, fetchData: () => fetchCategoryRecipes(categoryId.value) };
}
