<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useSearch } from '@/composables/useSearch';
import RecipeCard from '@/components/Recipe/RecipeCard.vue';

const { searchQuery, searchResults, showResults, fetchSearchResults } = useSearch();
const route = useRoute();

watch(
  () => route.query.search,
  (newQuery) => {
    searchQuery.value = newQuery || '';
    fetchSearchResults();
  },
  { immediate: true }
);
</script>

<template>
    <div>
        <div v-if="showResults && searchResults.length > 0">
        <h1 class="heading-name">Search Results: </h1>
        <div class="recipe-list">
            <RecipeCard
          v-for="result in searchResults"
          :key="result.id"
          :imageUrls="result.imageUrls"
          :categories="result.categories"
          :cuisines="result.cuisines"
          :name="result.name"
          :id="result.id"
        /></div>
        </div>
        <div v-else-if="searchQuery.length > 0">
        <p class="notfound-message">No results found for "{{ searchQuery }}"</p>
        </div>
    </div>
  </template>

<style>
.recipe-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-around;
  padding: 2% 10%;
}

.heading-name,
.notfound-message {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  font-size: 20px;
  font-weight: bolder;
  color: black;
}</style>
  
  