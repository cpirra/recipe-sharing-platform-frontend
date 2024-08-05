<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import RecipeCard from './RecipeCard.vue'

const props = defineProps({
  limit: {
    type: Number,
    default: 4,
  },
  showPagination: {
    type: Boolean,
    default: false,
  }
})

const latestRecipes = ref([]) // For latest recipes
const currentPage = ref(1)
const totalPages = ref(1)

const fetchLatestRecipes = async (page = 1) => {
  try {
    const response = await axios.get(`http://34.17.45.194:8080/api/TopRecipe/leatest?page=${page}&pageSize=${props.limit}`)
    console.log('Response:', response.data); // Check the data structure here

    if (Array.isArray(response.data)) {
      latestRecipes.value = response.data.map(recipe => ({
        id: recipe.id,
        name: recipe.name,
        image: recipe.imageUrls.length > 0 ? recipe.imageUrls[0].url : '', // Map imageUrls to image
        categories: recipe.categories || [], // Ensure categories is an array
        cuisines: recipe.cuisines || [], // Ensure cuisines is an array
        description: recipe.description || '' // Add description if needed
      }))
      // Assuming the total count is provided by the API for pagination calculations
      totalPages.value = Math.ceil(response.headers['x-total-count'] / props.limit) // Adjust if the total count is in headers
    } else {
      console.error('Unexpected response format:', response.data)
    }
  } catch (error) {
    console.error('Error fetching latest recipes:', error)
  }
}

const handlePageChange = (page) => {
  if (page < 1 || page > totalPages.value) return // Prevent invalid page numbers
  currentPage.value = page
  fetchLatestRecipes(page)
}

watch(currentPage, (newPage) => {
  fetchLatestRecipes(newPage)
})

onMounted(() => {
  fetchLatestRecipes()
})
</script>

<template>
  <div>
    <!-- LATEST RECIPE LISTING -->
    <RouterLink to="/recipes/latest">
      <h1 class="heading-name">Latest Recipes</h1>
    </RouterLink>
    <div class="recipe-list">
      <RecipeCard
        v-for="recipe in latestRecipes"
        :key="recipe.id"
        :id="recipe.id"
        :name="recipe.name"
        :image="recipe.image"
        :categories="recipe.categories"
        :cuisines="recipe.cuisines"
        :description="recipe.description"
      />
    </div>
    <div v-if="props.showPagination" class="pagination">
      <button class="navigation"
        :disabled="currentPage === 1" 
        @click="handlePageChange(currentPage - 1)"
      >
        Previous
      </button>
      <button class="navigation"
        :disabled="currentPage === totalPages" 
        @click="handlePageChange(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Koulen&family=Lato&family=Nunito&family=Playfair+Display:ital@1&family=Prata&family=Raleway:ital,wght@1,100&family=Roboto&family=Roboto+Condensed&family=Teko&display=swap');

.navigation{
  border: 1px solid black;
  padding: 0.5rem;
  border-radius: 1rem
}
.pagination{
  display: flex;
  justify-content: flex-end;
  padding: 2rem;
  
}


.recipe-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-around;
  padding: 2% 10%;
  color:black;
}

.heading-name {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  font-size: 20px;
  font-weight: bolder;
  color: black;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
}
</style>
