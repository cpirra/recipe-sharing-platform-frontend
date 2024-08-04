<template>
    <div >
      <h2 class="text-xl font-semibold mb-2 text-center ">Your Created Recipes</h2>
      <div class="created-recipes">
        <RecipeCard
          v-for="recipe in createdRecipes"
          :key="recipe.id"
          :imageUrls="recipe.imageUrls"
          :categories="recipe.categories"
          :cuisines="recipe.cuisines"
          :name="recipe.name"
          :id="recipe.id"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { useUserStore } from '@/stores/userStore'
  import RecipeCard from '@/components/Recipe/RecipeCard.vue'
  import { fetchUserCreatedRecipes } from '@/services/recipeApi'
  
  const userStore = useUserStore()
  const createdRecipes = ref([])
  
  const fetchRecipes = async () => {
    const userId = userStore.getUserId
    if (userId) {
      createdRecipes.value = await fetchUserCreatedRecipes(userId)
    }
  }
  
  onMounted(fetchRecipes)
  </script>
  
  <style scoped>
.created-recipes{
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 2rem;
}
</style>
  