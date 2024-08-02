<script setup>
import LatestRecipes from '@/components/Recipe/LatestRecipes.vue'
import TrenyRecipes from '@/components/Recipe/TrendyRecipes.vue'
import FavouritesRecipes from '@/components/Recipe/FavouritesRecipes.vue';
import MostReviewsRecipes from '@/components/Recipe/MostReviewsRecipes.vue';
import MostCommentsRecipe from '@/components/Recipe/MostCommentsRecipe.vue';
</script>

<template>
  <div>
    <div class="hero flex justify-center">
      <img class="w-4/5 h-auto" src="/src/assets/images/cookingimg.jpg" alt="Cooking Image" />
    </div>
    <TrenyRecipes :limit="4" :showPagination="false" />
    <!-- Use LatestRecipes Component with limit of 4 -->
    <LatestRecipes :limit="4" :showPagination="false" />
    <FavouritesRecipes/>
    <MostReviewsRecipes/>
    <MostCommentsRecipe/>
  </div>
</template>

<style scoped></style>
