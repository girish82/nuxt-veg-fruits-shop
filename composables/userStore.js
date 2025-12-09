// Simple in-memory user store for demo purposes
import { ref } from 'vue'

export const users = ref([
  // Example user for testing
  { name: 'Test User', email: 'user@example.com', password: 'password' }
])

export function addUser(user) {
  users.value.push(user)
}

export function findUser(email, password) {
  return users.value.find(u => u.email === email && u.password === password)
}
