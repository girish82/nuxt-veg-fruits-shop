// In-memory order store composable
import { ref } from 'vue'

// Persistent orders store using localStorage so orders survive refreshes
export const allOrders = ref([])
const STORAGE_KEY = 'nuxt_all_orders'

export function initializeOrders() {
  if (process.client) {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        allOrders.value = JSON.parse(raw)
      } catch (e) {
        console.error('Failed to parse stored orders:', e)
        localStorage.removeItem(STORAGE_KEY)
        allOrders.value = []
      }
    }
  }
}

function saveOrders() {
  if (process.client) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allOrders.value))
    } catch (e) {
      console.error('Failed to save orders to storage:', e)
    }
  }
}

export function addOrder(order) {
  allOrders.value.push(order)
  saveOrders()
}

export function getOrdersByUser(email) {
  return allOrders.value.filter(order => order.userEmail === email)
}

export function clearAllOrders() {
  allOrders.value = []
  saveOrders()
}
