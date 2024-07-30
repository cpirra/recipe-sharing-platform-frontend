<script setup>
import LatestRecipes from '@/components/Recipe/LatestRecipes.vue';
</script>

<template>
  <LatestRecipes :limit="10" :showPagination="true" />
</template>

<style scoped>

</style>
