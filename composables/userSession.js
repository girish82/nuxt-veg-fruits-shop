// User session composable with localStorage persistence
import { ref } from 'vue'

export const currentUser = ref(null)
const STORAGE_KEY = 'nuxt_user_session'

// Initialize from localStorage
export function initializeUserSession() {
  if (process.client) {
    const storedUser = localStorage.getItem(STORAGE_KEY)
    if (storedUser) {
      try {
        currentUser.value = JSON.parse(storedUser)
      } catch (e) {
        console.error('Failed to parse stored user session:', e)
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }
}

export function setCurrentUser(user) {
  currentUser.value = user
  if (process.client) {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }
}

export function logoutUser() {
  currentUser.value = null
  if (process.client) {
    localStorage.removeItem(STORAGE_KEY)
  }
}
