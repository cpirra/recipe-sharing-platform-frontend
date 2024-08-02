<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCategories } from '@/composables/useCategories';
import RecipeCard from '@/components/Recipe/RecipeCard.vue';

const route = useRoute();
const categoryId = ref(Number(route.params.id));

const { recipes, error, loading, categoryName, fetchData } = useCategories(categoryId);

// Watch for route changes
watch(() => route.params.id, (newId) => {
  const id = Number(newId);
  if (!isNaN(id) && id !== categoryId.value) {
    categoryId.value = id;
    fetchData();
  }
}, { immediate: true });

// Initial fetch
onMounted(() => {
  if (!isNaN(categoryId.value)) {
    fetchData();
  } else {
    error.value = 'Invalid category ID';
  }
});
</script>

<template>
  <div>
    <h2 class="category-title" v-if="!error && recipes.length > 0">{{ categoryName }} Recipes:</h2>
    <p v-if="error">{{ error }}</p>
    <p v-if="loading">Loading recipes...</p>
    <div v-if="recipes.length > 0 && !error && !loading">
      <div class="recipe-grid">
        <RecipeCard
          v-for="recipe in recipes"
          :key="recipe.id"
          :id="recipe.id"
          :imageUrls="recipe.imageUrls"
          :categories="recipe.categories"
          :cuisines="recipe.cuisines"
          :name="recipe.name"
        />
      </div>
    </div>
    <div v-else-if="!loading && !error">
      <p>No recipes available for this category.</p>
    </div>
  </div>
</template>

<style scoped>
.recipe-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  padding-bottom: 4rem;
}
.category-title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-size: 20px;
  font-weight: bolder;
  color: orangered;
}
</style>
