import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
    token: null,
    error: null
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('/api/login', { email, password })
        this.user = response.data.user
        this.token = response.data.token
        this.error = null
      } catch (error) {
        this.error = 'Invalid email or password'
      }
    },
    async register(userData) {
      try {
        const response = await axios.post('/api/register', userData)
        this.user = response.data.user
        this.token = response.data.token
        this.error = null
      } catch (error) {
        this.error = 'Registration failed'
      }
    },
    logout() {
      this.user = null
      this.token = null
    }
  }
})
