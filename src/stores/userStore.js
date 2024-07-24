// src/stores/userStore.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user
  },
  actions: {
    setUser(name) {
      this.user = name
    },
    logout() {
      this.user = null
      localStorage.removeItem('token')
    }
  }
})
