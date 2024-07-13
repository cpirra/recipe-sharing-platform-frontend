<template>
  <div class="recipe-list flex flex-wrap gap-4">
    <RecipeCard
      v-for="(recipe, index) in recipes"
      :key="index"
      :image="recipe.image"
      :category="recipe.category"
      :title="recipe.title"
      :ratings="recipe.ratings"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import RecipeCard from '../../components/Recipe/RecipeCard.vue'
import recipesData from '../../data/recipeCard.json'

export default defineComponent({
  name: 'RecipeListView',
  components: {
    RecipeCard
  },
  setup() {
    const recipes = ref([])

    onMounted(() => {
      recipes.value = recipesData
    })

    return { recipes }
  }
})
</script>

<style>
.recipe-list {
  padding: 16px;
}
</style>
