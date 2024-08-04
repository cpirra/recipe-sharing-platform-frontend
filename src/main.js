// src/main.js
import './assets/styles/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { createAuth0 } from '@auth0/auth0-vue';
import { provideApolloClient } from '@vue/apollo-composable';
import client from '@/utils/apollo';
import SocialSharing from 'vue-social-sharing';
import { setupToast } from '@/plugins/toast';
import { useUserStore } from './stores/userStore'; // Import the user store

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(SocialSharing);

setupToast(app);

app.use(
  createAuth0({
    domain: 'dev-zna1pz6dnpbu0bt5.us.auth0.com',
    clientId: 'ThiGwfRnjUzeRvgrs5matA0gGcQxUfOk',
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: 'https://RecipeAPI',
      scope: 'openid profile email'
    }
  })
);
provideApolloClient(client);

// Initialize user information from token
const userStore = useUserStore();
userStore.setUserFromToken();

app.mount('#app');
