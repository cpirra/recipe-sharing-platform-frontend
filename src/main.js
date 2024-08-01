import './assets/styles/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createAuth0 } from '@auth0/auth0-vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.use(
  createAuth0({
    domain: 'dev-zna1pz6dnpbu0bt5.us.auth0.com',
    clientId: 'ThiGwfRnjUzeRvgrs5matA0gGcQxUfOk',
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: 'https://RecipeAPI', // Ensure this matches your API identifier
      scope: 'openid profile email'
    }
  })
)

app.mount('#app')
