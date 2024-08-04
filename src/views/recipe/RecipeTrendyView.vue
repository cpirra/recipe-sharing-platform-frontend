<script setup>
import TrendyRecipes from '@/components/Recipe/TrendyRecipes.vue';
</script>

<template>
    <img class="trendy" src="https://www.unileverfoodsolutions.com.au/dam/global-ufs/mcos/anz/themes/knorr-professional/knorr-tomato-powder/9-trendy-recipes-inspired-by-the-tomato-of-tomorrow/9-trendy-recipes-inspired-by-the-tomato-of-%20tomorrow-header-desktop-anz.jpg" alt="">
    <TrendyRecipes :limit="10" :showPagination="true"/>
</template>

<style>
.trendy{
    width: 100%;
    height: auto;
}
</style>