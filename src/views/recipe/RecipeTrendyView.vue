<script setup>
import TrendyRecipes from '@/components/Recipe/TrendyRecipes.vue';
</script>

<template>
    <img class="trendy" src="https://www.unileverfoodsolutions.com.au/dam/global-ufs/mcos/anz/themes/knorr-professional/knorr-tomato-powder/9-trendy-recipes-inspired-by-the-tomato-of-tomorrow/9-trendy-recipes-inspired-by-the-tomato-of-%20tomorrow-header-desktop-anz.jpg" alt="">
    <TrendyRecipes :limit="10" :showPagination="true"/>
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
.trendy{
    width: 100%;
    height: auto;
}
</style>