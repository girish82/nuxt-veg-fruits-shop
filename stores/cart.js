import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  actions: {
    add(product) {
      const existing = this.items.find(item => item.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },
    remove(productId) {
      this.items = this.items.filter(item => item.id !== productId)
    },
    clear() {
      this.items = []
    }
  }
})
