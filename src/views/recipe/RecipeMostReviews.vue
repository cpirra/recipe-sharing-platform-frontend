<script setup>
import MostReviewsRecipes from '@/components/Recipe/MostReviewsRecipes.vue';
</script>

<template>
    <MostReviewsRecipes :limit="10" :showPagination="true"/>
    <RouterLink to="/">
      <div class="flex items-center justify-center">
        <button class="explore">Explore</button>
      </div>
    </RouterLink>
</template>

<style>
.explore {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  background: linear-gradient(90deg, black 0%, black 100%);
  padding: 10px 30px;
  border: solid black 2px;
  box-shadow: black 4px 5px 47px 4px;
  border-radius: 50px;
  transition: 1000ms;
  transform: translateY(0);
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  text-transform: uppercase;
}

.explore:hover {
  transition: 1000ms;
  padding: 10px 50px;
  transform: translateY(-2px);
  background: linear-gradient(90deg, black 0%, black 100%);
  color: #ffffff;
  border: solid 2px black;
}
</style>