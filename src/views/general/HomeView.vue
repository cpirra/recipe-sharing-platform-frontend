<script setup>
import RandomRecipes from '@/components/Recipe/RandomRecipes.vue'
import LatestRecipes from '@/components/Recipe/LatestRecipes.vue'
import TrenyRecipes from '@/components/Recipe/TrendyRecipes.vue'
</script>

<template>
  <div>
    <div class="hero flex justify-center">
      <img class="w-4/5 h-auto" src="/src/assets/images/cookingimg.jpg" alt="Cooking Image" />
    </div>
    <TrenyRecipes :limit="4" :showPagination="false" />
    <!-- Use LatestRecipes Component with limit of 4 -->
    <LatestRecipes :limit="4" :showPagination="false" />
    <RandomRecipes :limit="4" :showPagination="false" />
  </div>
</template>

<style scoped></style>
