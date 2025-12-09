// In-memory order store composable
import { ref } from 'vue'

export const allOrders = ref([])

export function addOrder(order) {
  allOrders.value.push(order)
}

export function getOrdersByUser(email) {
  return allOrders.value.filter(order => order.userEmail === email)
}
