<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCuisine } from '@/composables/useCuisine';
import RecipeCard from '@/components/Recipe/RecipeCard.vue';

const route = useRoute();
const cuisineId = ref(Number(route.params.id));

const { cuisine, recipes, error, fetchCuisineDetails, fetchCuisineRecipes } = useCuisine(cuisineId.value);

watch(() => route.params.id, (newId) => {
  const id = Number(newId);
  if (isNaN(id)) {
    console.error('Invalid cuisine ID format:', newId);
    error.value = 'Invalid cuisine ID format';
  } else {
    error.value = null;
    cuisineId.value = id;
    fetchCuisineDetails(id);
    fetchCuisineRecipes(id);
  }
}); 
</script>

<template>
  <div class="cuisineBanner">
    <img class="cuisineimg" src="@/assets/images/vectest.jpg" alt="">
  </div>
  <div>
    <h2 class="cuisine-title" v-if="!error">{{ cuisine.name }} Recipes: </h2>
    <p v-if="error">{{ error }}</p>
    <div v-if="recipes.length > 0">
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
    <div v-else>
      <p>No recipes available for this cuisine.</p>
    </div>
  </div>
  
</template>

<style scoped>
.cuisineimg{
  width: 100%;
}
.cuisineBanner{
  display: flex;
  align-items: center;
  justify-content: center;
}
.recipe-grid ,
p{
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  padding-bottom: 4rem;
}
.cuisine-title{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-size: 20px;
  font-weight: bolder;
  color: black;
}
</style>
