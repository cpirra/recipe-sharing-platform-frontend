<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import RecipeCard from './RecipeCard.vue'

const trendyRecipes = ref([]) // For trendy recipes

const fetchTrendyRecipes = async () => {
  try {
    const response = await axios.get('https://localhost:7036/api/TopRecipe/trendy?count=4')
    console.log(response.data); // Check the data structure here
    trendyRecipes.value = response.data.slice(0, 4) // Limit to 4 recipes
  } catch (error) {
    console.error('Error fetching trendy recipes:', error)
  }
}

onMounted(() => {
  fetchTrendyRecipes()
})
</script>

<template>
  <div>
    <!-- TRENDY RECIPE LISTING -->
    <h1 class="heading-title">Trendy Recipes</h1>
    <div class="recipe-list">
      <RecipeCard
        v-for="recipe in trendyRecipes"
        :key="recipe.id"
        :id="recipe.id"
        :title="recipe.name"
        :image="recipe.imageUrls"
        :categories="recipe.categories || []"
        :cuisines="recipe.cuisines || []"
        :description="recipe.description"
      />
    </div>
    <RouterLink to="/recipes/trendy">
      <div class="flex items-center justify-center">
        <button class="btn">Explore</button>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Koulen&family=Lato&family=Nunito&family=Playfair+Display:ital@1&family=Prata&family=Raleway:ital,wght@1,100&family=Roboto&family=Roboto+Condensed&family=Teko&display=swap');

.btn {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  background: linear-gradient(90deg, #e76f51 0%, #e76f51 100%);
  padding: 10px 30px;
  border: solid #e76f51 2px;
  box-shadow: rgb(231, 111, 81) 4px 5px 47px 4px;
  border-radius: 50px;
  transition: 1000ms;
  transform: translateY(0);
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  text-transform: uppercase;
}

.btn:hover {
  transition: 1000ms;
  padding: 10px 50px;
  transform: translateY(-2px);
  background: linear-gradient(90deg, #e76f51 0%, #e76f51 100%);
  color: #ffffff;
  border: solid 2px #e76f51;
}

.recipe-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-around;
  padding: 2% 10%;
}

.heading-title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  font-size: 20px;
  font-weight: bolder;
  color: orangered;
}
</style>
