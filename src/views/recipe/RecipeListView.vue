<script setup>
import RandomRecipes from '@/components/Recipe/RandomRecipes.vue';
</script>

<template>
  <RandomRecipes :limit="10" :showPagination="true"/>
</template>

<style scoped>
</style>
