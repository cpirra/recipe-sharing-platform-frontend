import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useUserStore } from './stores/userStore'
import { getUserInfoFromToken } from './utils/authUtils'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

const userStore = useUserStore()
const decodedToken = getUserInfoFromToken()
if (decodedToken) {
  const name = decodedToken['https://RecipeAPI/name']
  userStore.setUser(name)
}

app.mount('#app')
