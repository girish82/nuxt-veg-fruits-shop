import { ref } from 'vue'

export const cartModalVisible = ref(false)

export function useCartModal() {
  function openCart() {
    cartModalVisible.value = true
  }
  function closeCart() {
    cartModalVisible.value = false
  }
  return { cartModalVisible, openCart, closeCart }
}
