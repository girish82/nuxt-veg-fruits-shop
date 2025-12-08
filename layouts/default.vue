<template>
  <div>
    <NuxtPage />
    <div v-if="cartModalVisible" class="cart-modal position-fixed top-0 end-0 h-100 bg-white shadow-lg" style="width: 400px; z-index: 1050; transition: right 0.3s;">
      <div class="d-flex justify-content-between align-items-center p-3 border-bottom">
        <h4 class="mb-0">Your Cart</h4>
        <button class="btn-close" @click="closeCart"></button>
      </div>
      <div class="p-3">
        <div v-if="cart.items.length === 0" class="text-center text-muted">No items in cart.</div>
        <div v-for="item in cart.items" :key="item.id" class="mb-3 border-bottom pb-2">
          <div class="d-flex align-items-center">
            <img :src="item.image" alt="Product" style="width: 60px; height: 40px; object-fit: cover;" class="me-3 rounded">
            <div class="flex-grow-1">
              <div class="fw-bold">{{ item.name }}</div>
              <div class="small text-muted">{{ item.description }}</div>
              <div class="mt-1">${{ item.price }} x {{ item.quantity }}</div>
            </div>
            <button class="btn btn-sm btn-danger ms-2" @click="removeItem(item.id)">Remove</button>
          </div>
        </div>
        <div v-if="cart.items.length > 0" class="mt-3">
          <div class="fw-bold">Total: ${{ total }}</div>
          <button class="btn btn-success w-100 mt-2" @click="checkout">Checkout</button>
        </div>
      </div>
    </div>
    <div v-if="cartModalVisible" class="modal-backdrop fade show" style="z-index: 1040;" @click="closeCart"></div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { useCartModal } from '@/composables/cartModal'
import { computed } from 'vue'

const cart = useCartStore()
const { cartModalVisible, closeCart } = useCartModal()
const total = computed(() => cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2))

function removeItem(id) {
  cart.remove(id)
}
function checkout() {
  alert('Checkout not implemented.')
}
</script>

<style scoped>
.cart-modal {
  right: 0;
  min-width: 320px;
  max-width: 100vw;
  box-shadow: -2px 0 8px rgba(0,0,0,0.1);
  overflow-y: auto;
}
</style>
