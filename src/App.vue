<script setup>
import { provide, onMounted } from 'vue'
import { useFavoriteStore } from './stores/favoriteStore'
import { useUserStore } from './stores/userStore'
import { getUserInfoFromToken } from './utils/authUtils'

const favoriteStore = useFavoriteStore()
provide('favoriteStore', favoriteStore)

const userStore = useUserStore()
const decodedToken = getUserInfoFromToken()
if (decodedToken) {
  const name = decodedToken['https://RecipeAPI/username']
  userStore.setUser(name)
  const userID = decodedToken['https://RecipeAPI/userId']
  userStore.setUserId(userID)
}

onMounted(async () => {
  await favoriteStore.fetchFavoriteRecipes()
})
</script>

<template>
  <div class="main">
    <RouterView />
  </div>
</template>

<style scoped></style>
