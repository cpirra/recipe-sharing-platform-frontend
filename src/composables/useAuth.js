import { ref, watch, onMounted } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useFavoriteStore } from '../stores/favoriteStore'
import { useUserStore } from '../stores/userStore'
import { getUserInfoFromToken } from '../utils/authUtils'
import { registerToken } from '@/services/userApi'

export function useAuth() {
  const { getAccessTokenSilently } = useAuth0()
  const favoriteStore = useFavoriteStore()
  const userStore = useUserStore()
  const token = ref(null)

  const handleTokenChange = async (newToken) => {
    if (newToken) {
      localStorage.setItem('auth_token', newToken)

      const decodedToken = getUserInfoFromToken(newToken)
      if (decodedToken) {
        const name = decodedToken['https://RecipeAPI/username']
        userStore.setUser(name)
        const userID = decodedToken['https://RecipeAPI/userId']
        userStore.setUserId(userID)
      }

      await favoriteStore.fetchFavoriteRecipes()

      // Send the token to your backend
      try {
        const response = await registerToken(newToken)
        console.log('Backend response:', response)
      } catch (error) {
        console.error('Error sending token to backend:', error)
      }
    }
  }

  watch(token, (newToken) => {
    handleTokenChange(newToken)
  })

  onMounted(async () => {
    token.value = await getAccessTokenSilently()
  })

  return {
    token
  }
}
