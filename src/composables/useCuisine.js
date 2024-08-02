import { ref} from 'vue';

export function useCuisine(cuisineId) {
  const cuisine = ref({});
  const recipes = ref([]);
  const error = ref(null);

  const fetchCuisineDetails = async (id) => {
    try {
      const response = await fetch(`https://localhost:7036/api/Cuisine/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch cuisine details: ${response.statusText}`);
      }
      cuisine.value = await response.json();
    } catch (err) {
      error.value = err.message;
    }
  };

  const fetchCuisineRecipes = async (id) => {
    try {
      const response = await fetch(`https://localhost:7036/api/TopRecipe/leatest-cusine/${id}?page=1&pageSize=12`);
      if (!response.ok) {
        throw new Error(`Failed to fetch cuisine recipes: ${response.statusText}`);
      }
      recipes.value = await response.json();
    } catch (err) {
      error.value = err.message;
    }
  };

  fetchCuisineDetails(cuisineId);
  fetchCuisineRecipes(cuisineId);

  return { cuisine, recipes, error, fetchCuisineDetails, fetchCuisineRecipes };
}
