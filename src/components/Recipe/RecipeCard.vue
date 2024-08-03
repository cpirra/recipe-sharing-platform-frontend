<script setup>
import { defineProps } from 'vue'
import { debounce } from '@/utils/debounce'
import { useRouter } from 'vue-router'
import { useFavorites } from '@/composables/useFavourites'

const props = defineProps({
  imageUrls: String,
  categories: Array,
  cuisines: Array,
  name: String,
  id: Number
})

const { favoriteRecipes, loading, addFavorite, removeFavorite, isFavorite } = useFavorites()

const router = useRouter()

const toggleFavorite = debounce((recipeId) => {
  if (isFavorite(recipeId)) {
    removeFavorite(recipeId)
  } else {
    addFavorite(recipeId)
  }
}, 300)

const goToRecipeDetail = () => {
  router.push({ name: 'RecipeDetails', params: { id: props.id } })
}
</script>

<template>
  <div
    @click="goToRecipeDetail"
    class="recipe-card border rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
  >
    <img
      :src="imageUrls"
      alt="Recipe Image"
      class="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-80"
    />
    <div class="p-4 bg-white">
      <div class="flex flex-wrap justify-between items-center mb-2">
        <div class="flex flex-wrap items-center">
          <span
            v-for="(category, index) in categories"
            :key="index"
            class="text-sm font-medium text-gray-500 mr-2 bg-gray-200 px-2 py-1 rounded"
          >
            {{ category }}
          </span>
          <span class="text-sm font-medium text-gray-500 mx-2">•</span>
          <span
            v-for="(cuisine, index) in cuisines"
            :key="index"
            class="text-sm font-medium text-gray-500 mr-2 bg-gray-200 px-2 py-1 rounded"
          >
            {{ cuisine }}
          </span>
        </div>
        <button
          @click.stop="toggleFavorite(id)"
          :disabled="loading"
          :class="{
            'text-red-500': isFavorite(id),
            'text-gray-500': !isFavorite(id),
            'cursor-not-allowed': loading
          }"
          class="ml-auto transition-colors duration-300"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
      </div>
      <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ name }}</h3>
    </div>
  </div>
</template>

<style scoped>
.recipe-card {
  width: 320px;
}
.cursor-not-allowed {
  cursor: not-allowed;
}
</style>
