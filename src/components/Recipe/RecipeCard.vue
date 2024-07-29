<script setup>
import { defineProps, inject } from 'vue'
import { debounce } from '@/utils/debounce'

const props = defineProps({
  image: String,
  categories: Array,
  cuisines: Array,
  title: String,
  id: Number
})

const favoriteStore = inject('favoriteStore')

const toggleFavorite = debounce((recipeId) => {
  if (favoriteStore.isFavorite(recipeId)) {
    favoriteStore.removeFavorite(recipeId)
  } else {
    favoriteStore.addFavorite(recipeId)
  }
}, 300)
</script>

<template>
  <div class="recipe-card border rounded-lg overflow-hidden shadow-lg">
    <img :src="image" alt="Recipe Image" class="w-full h-48 object-cover" />
    <div class="p-4">
      <div class="flex flex-wrap justify-between items-center mb-2">
        <div class="flex flex-wrap items-center">
          <span
            v-for="(category, index) in categories"
            :key="index"
            class="text-sm font-medium text-gray-500 mr-2"
          >
            {{ category }}
          </span>
          <span class="text-sm font-medium text-gray-500 mx-2">•</span>
          <span
            v-for="(cuisine, index) in cuisines"
            :key="index"
            class="text-sm font-medium text-gray-500 mr-2"
          >
            {{ cuisine }}
          </span>
        </div>
        <button
          @click="toggleFavorite(id)"
          :disabled="favoriteStore.loading"
          :class="{
            'text-red-500': favoriteStore.isFavorite(id),
            'text-gray-500': !favoriteStore.isFavorite(id),
            'cursor-not-allowed': favoriteStore.loading
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
      <h3 class="text-xl font-semibold text-gray-800">{{ title }}</h3>
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
