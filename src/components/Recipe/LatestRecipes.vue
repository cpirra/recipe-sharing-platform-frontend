
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
    const response = await axios.get(`https://localhost:7036/api/TopRecipe/leatest?page=${page}&pageSize=${props.limit}`)
    console.log('Response:', response.data); // Check the data structure here

    if (Array.isArray(response.data)) {
      latestRecipes.value = response.data.map(recipe => ({
        id: recipe.id,
        name: recipe.name, // Map name to name
        image: recipe.imageUrls, // Map imageUrls to image
        categories: recipe.categories || [], // Ensure categories is an array
        cuisines: recipe.cuisines || [], // Ensure cuisines is an array
        description: recipe.description // Add description if needed
      }))
      // Assuming each page has the same number of items, calculate total pages
      totalPages.value = Math.ceil(response.data.length / props.limit)
    } else {
      console.error('Unexpected response format:', response.data)
    }
  } catch (error) {
    console.error('Error fetching latest recipes:', error)
  }
}

const handlePageChange = (page) => {
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
    <h1 class="heading-name">Latest Recipes</h1>
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
    <!--TO DO: FIX THE DESIGN BESARTA-->
    <div v-if="props.showPagination" class="pagination">
      <button 
        class="btn" 
        :disabled="currentPage === 1" 
        @click="handlePageChange(currentPage - 1)"
      >
        Previous
      </button>
      <button 
        class="btn" 
        :disabled="currentPage === totalPages" 
        @click="handlePageChange(currentPage + 1)"
      >
        Next
      </button>
    </div>
    <RouterLink to="/recipes/latest">
      <div class="flex items-center justify-center">
        <button class="btn">Explore</button>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Koulen&family=Lato&family=Nunito&family=Playfair+Display:ital@1&family=Prata&family=Raleway:ital,wght@1,100&family=Roboto&family=Roboto+Condensed&family=Teko&display=swap');

.btn {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  background: linear-gradient(90deg, #e76f51 0%, #e76f51 100%);
  padding: 10px 30px;
  border: solid #e76f51 2px;
  box-shadow: rgb(231, 111, 81) 4px 5px 47px 4px;
  border-radius: 50px;
  transition: 1000ms;
  transform: translateY(0);
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  text-transform: uppercase;
}

.btn:hover {
  transition: 1000ms;
  padding: 10px 50px;
  transform: translateY(-2px);
  background: linear-gradient(90deg, #e76f51 0%, #e76f51 100%);
  color: #ffffff;
  border: solid 2px #e76f51;
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
  color: orangered;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
}
</style>
