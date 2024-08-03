<!-- HomeView.vue -->
<script setup>
import LatestRecipes from '@/components/Recipe/LatestRecipes.vue';
import TrenyRecipes from '@/components/Recipe/TrendyRecipes.vue';
import FavouritesRecipes from '@/components/Recipe/FavouritesRecipes.vue';
import MostReviewsRecipes from '@/components/Recipe/MostReviewsRecipes.vue';
import MostCommentsRecipe from '@/components/Recipe/MostCommentsRecipe.vue';
import SearchRecipe from '@/components/Recipe/SearchRecipe.vue';
</script>

<template>
  <div>
    <SearchRecipe />
    <TrenyRecipes :limit="4" :showPagination="false" />
    <LatestRecipes :limit="4" :showPagination="false" />
    <FavouritesRecipes />
    <MostReviewsRecipes />
    <MostCommentsRecipe />
  </div>
</template>
