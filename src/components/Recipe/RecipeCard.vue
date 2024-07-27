<script setup>
import { defineProps } from 'vue'
import { useFavorite } from '@/composables/useFavourites'
import { useUserStore } from '@/stores/userStore'
import { debounce } from '@/utils/debounce'
import { onMounted } from 'vue'

const recipe = defineProps({
  image: String,
  categories: Array,
  cuisines: Array,
  title: String,
  id: Number
})

const { isFavorite, loading, checkIfFavorite, toggleFavorite: toggleFav } = useFavorite()
const userStore = useUserStore()

const toggleFavorite = debounce((recipeId) => {
  const userId = userStore.getUserId
  const payload = { userId, recipeId }
  console.log('Payload:', payload) // Log the payload to the console
  toggleFav(userId, recipeId)
}, 300)

onMounted(() => {
  const userId = userStore.getUserId
  checkIfFavorite(userId, recipe.id)
})
</script>

<template>
  <div class="recipe-card border rounded-lg overflow-hidden shadow-lg">
    <img :src="recipe.image" alt="Recipe Image" class="w-full h-48 object-cover" />
    <div class="p-4">
      <div class="flex flex-wrap justify-between items-center mb-2">
        <div class="flex flex-wrap items-center">
          <span
            v-for="(category, index) in recipe.categories"
            :key="index"
            class="text-sm font-medium text-gray-500 mr-2"
          >
            {{ category }}
          </span>
          <span class="text-sm font-medium text-gray-500 mx-2">•</span>
          <span
            v-for="(cuisine, index) in recipe.cuisines"
            :key="index"
            class="text-sm font-medium text-gray-500 mr-2"
          >
            {{ cuisine }}
          </span>
        </div>
        <button
          @click="toggleFavorite(recipe.id)"
          :disabled="loading"
          :class="{
            'text-red-500': isFavorite,
            'text-gray-500': !isFavorite,
            'cursor-not-allowed': loading
          }"
          class="ml-auto"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
      </div>
      <h3 class="text-xl font-semibold text-gray-800">{{ recipe.title }}</h3>
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
