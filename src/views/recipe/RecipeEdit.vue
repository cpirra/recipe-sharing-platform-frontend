<template>
  <div class="recipe-form max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
    <div v-if="step === 1">
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">General Info</h2>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Name</label>
        <input v-model="generalInfo.name" placeholder="Name" class="input" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Description</label>
        <textarea
          v-model="generalInfo.description"
          placeholder="Description"
          class="input"
          rows="3"
        ></textarea>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Image URLs</label>
        <input v-model="generalInfo.imageUrls" placeholder="Image URLs" class="input" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Video URLs</label>
        <input v-model="generalInfo.videoUrls" placeholder="Video URLs" class="input" />
      </div>
      <div class="flex justify-end mt-6">
        <button @click="nextStep" class="btn btn-primary">Next</button>
      </div>
    </div>
    <div v-else-if="step === 2">
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Select Category and Cuisine</h2>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Category</label>
        <select v-model="generalInfo.category" class="input">
          <option disabled value="">Select Category</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2">Cuisine</label>
        <select v-model="generalInfo.cuisine" class="input">
          <option disabled value="">Select Cuisine</option>
          <option v-for="cuisine in cuisines" :key="cuisine.id" :value="cuisine.id">
            {{ cuisine.name }}
          </option>
        </select>
      </div>
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Ingredients</h2>
      <div v-for="(ingredient, index) in ingredients" :key="index" class="mb-4">
        <div class="flex space-x-4">
          <input v-model="ingredient.name" placeholder="Ingredient Name" class="input flex-1" />
          <input v-model="ingredient.quantity" placeholder="Quantity" class="input flex-1" />
          <button @click="removeIngredient(index)" class="btn btn-danger">Remove</button>
        </div>
      </div>
      <div class="mb-6">
        <button @click="addIngredient" class="btn btn-secondary">Add Ingredient</button>
      </div>
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Instructions</h2>
      <div v-for="(instruction, index) in instructions" :key="index" class="mb-4">
        <div class="flex space-x-4 items-center">
          <span class="text-gray-700 font-bold w-16 text-center"
            >Step {{ instruction.stepNumber }}</span
          >
          <input v-model="instruction.description" placeholder="Description" class="input flex-1" />
          <button @click="removeInstruction(index)" class="btn btn-danger">Remove</button>
        </div>
      </div>
      <div class="mb-6">
        <button @click="addInstruction" class="btn btn-secondary">Add Instruction</button>
      </div>
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Nutritional Information</h2>
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label class="block text-gray-700 font-bold mb-2">Calories</label>
          <input
            v-model="nutritionalInfo.calories"
            type="number"
            placeholder="Calories"
            class="input"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-bold mb-2">Fat</label>
          <input v-model="nutritionalInfo.fat" type="number" placeholder="Fat" class="input" />
        </div>
        <div>
          <label class="block text-gray-700 font-bold mb-2">Carbohydrates</label>
          <input
            v-model="nutritionalInfo.carbohydrates"
            type="number"
            placeholder="Carbohydrates"
            class="input"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-bold mb-2">Protein</label>
          <input
            v-model="nutritionalInfo.protein"
            type="number"
            placeholder="Protein"
            class="input"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-bold mb-2">Sugar</label>
          <input v-model="nutritionalInfo.sugar" type="number" placeholder="Sugar" class="input" />
        </div>
        <div>
          <label class="block text-gray-700 font-bold mb-2">Fiber</label>
          <input v-model="nutritionalInfo.fiber" type="number" placeholder="Fiber" class="input" />
        </div>
        <div>
          <label class="block text-gray-700 font-bold mb-2">Sodium</label>
          <input
            v-model="nutritionalInfo.sodium"
            type="number"
            placeholder="Sodium"
            class="input"
          />
        </div>
      </div>
      <div class="flex justify-between mt-6">
        <button @click="previousStep" class="btn btn-secondary">Back</button>
        <button @click="handleFinalSubmit" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRecipeStore } from '@/stores/recipeStore'
import { fetchCategories, fetchCuisines, fetchRecipeById } from '@/services/recipeApi'

const route = useRoute()
const store = useRecipeStore()

// Step management
const step = ref(1)

// General Info
const generalInfo = ref({
  name: '',
  description: '',
  imageUrls: '',
  videoUrls: '',
  category: '',
  cuisine: ''
})

// Ingredients
const ingredients = ref([{ name: '', quantity: '', recipeId: null }])

// Instructions
const instructions = ref([{ stepNumber: 1, description: '', recipeId: null }])

// Nutritional Information
const nutritionalInfo = ref({
  calories: 0,
  fat: 0,
  carbohydrates: 0,
  protein: 0,
  sugar: 0,
  fiber: 0,
  sodium: 0,
  recipeId: null
})

// Categories and Cuisines
const categories = ref([])
const cuisines = ref([])

// Recipe ID
const recipeId = ref(route.params.id)

// Fetch Categories and Cuisines
const fetchCategoriesAndCuisines = async () => {
  try {
    const [categoriesResponse, cuisinesResponse] = await Promise.all([
      fetchCategories(),
      fetchCuisines()
    ])
    categories.value = categoriesResponse
    cuisines.value = cuisinesResponse
  } catch (error) {
    console.error('Error fetching categories or cuisines:', error)
  }
}

// Fetch Recipe Data
const fetchRecipeData = async (id) => {
  try {
    const recipeData = await fetchRecipeById(id)
    generalInfo.value = {
      name: recipeData.name,
      description: recipeData.description,
      imageUrls: recipeData.imageUrls,
      videoUrls: recipeData.videoUrls,
      category: recipeData.categoryDetails[0].id, // Use first element's ID for pre-selection
      cuisine: recipeData.cuisineDetails[0].id // Use first element's ID for pre-selection
    }
    ingredients.value = recipeData.ingredients.map((ingredient) => ({
      ...ingredient,
      recipeId: recipeData.id
    }))
    instructions.value = recipeData.instructions.map((instruction) => ({
      ...instruction,
      recipeId: recipeData.id
    }))
    nutritionalInfo.value = {
      ...recipeData.nutritionalInfo,
      recipeId: recipeData.id
    }
    recipeId.value = recipeData.id
  } catch (error) {
    console.error('Error fetching recipe data:', error)
  }
}

// Handle Next Step
const nextStep = () => {
  step.value++
}

// Handle Previous Step
const previousStep = () => {
  step.value--
}

// Handle Final Submit
const handleFinalSubmit = async () => {
  try {
    // Submit updated recipe
    await store.updateRecipe(recipeId.value, {
      ...generalInfo.value
    })

    // Update category and cuisine
    await store.updateRecipeCategory({
      recipeId: recipeId.value,
      categoryId: generalInfo.value.category // Send ID
    })

    await store.updateRecipeCuisine({
      recipeId: recipeId.value,
      cuisineId: generalInfo.value.cuisine // Send ID
    })

    // Update ingredients
    for (const ingredient of ingredients.value) {
      await store.updateIngredients(ingredient.id, ingredient)
    }

    // Update instructions
    for (const instruction of instructions.value) {
      await store.updateInstructions(instruction.id, instruction)
    }

    // Update nutritional info
    await store.updateNutritionalInfo(nutritionalInfo.value.id, nutritionalInfo.value)

    alert('Recipe updated successfully!')
  } catch (error) {
    console.error('Error updating recipe:', error)
  }
}

// Add new ingredient
const addIngredient = () => {
  ingredients.value.push({ name: '', quantity: '', recipeId: nutritionalInfo.value.recipeId })
}

// Remove ingredient
const removeIngredient = (index) => {
  ingredients.value.splice(index, 1)
}

// Add new instruction
const addInstruction = () => {
  instructions.value.push({
    stepNumber: instructions.value.length + 1,
    description: '',
    recipeId: nutritionalInfo.value.recipeId
  })
}

// Remove instruction
const removeInstruction = (index) => {
  instructions.value.splice(index, 1)
}

// Fetch initial data
onMounted(() => {
  fetchCategoriesAndCuisines()
  fetchRecipeData(recipeId.value)
})
</script>

<style scoped>
.recipe-form {
  max-width: 800px;
  margin: auto;
  padding: 40px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: #f9fafb;
  transition: border-color 0.3s;
}

.input:focus {
  border-color: #3b82f6;
  outline: none;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
}

.btn-primary {
  background-color: #3b82f6;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-secondary {
  background-color: #6b7280;
  color: #ffffff;
}

.btn-secondary:hover {
  background-color: #4b5563;
}

.btn-danger {
  background-color: #ef4444;
  color: #ffffff;
}

.btn-danger:hover {
  background-color: #dc2626;
}
</style>
