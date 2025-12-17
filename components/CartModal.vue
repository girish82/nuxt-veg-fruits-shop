<template>
  <div v-if="showCart">
    <div class="modal-backdrop fade show" style="z-index: 1040;" @click="showCart = false"></div>
    <div class="cart-modal position-fixed top-0 end-0 h-100 bg-white shadow-lg" style="width: 400px; z-index: 1050; transition: right 0.3s;" @click.stop>
      <div class="d-flex justify-content-between align-items-center p-3 border-bottom">
        <h4 class="mb-0">Your Cart</h4>
        <button class="btn-close" @click="showCart = false"></button>
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
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { placeOrder, authError, authLoading } from '@/composables/auth'
import { currentUser } from '@/composables/userSession'
import { cartModalVisible } from '@/composables/cartModal'

const showCart = cartModalVisible
const cart = useCartStore()
const total = computed(() => cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2))

function removeItem(id) {
  cart.remove(id)
}
async function checkout() {
  if (!currentUser.value) {
    alert('You must be logged in to place an order.')
    return
  }
  if (cart.items.length === 0) {
    alert('Your cart is empty.')
    return
  }
  // Generate a single order_number for this checkout
  const orderNumber = crypto.randomUUID ? crypto.randomUUID() : ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>c/4).toString(16));
  let allSuccess = true
  for (const item of cart.items) {
    const success = await placeOrder({
      userId: currentUser.value.id,
      productId: item.id,
      quantity: item.quantity,
      totalPrice: (item.price * item.quantity),
      status: 'pending',
      orderNumber
    })
    if (!success) {
      allSuccess = false
      break
    }
  }
  if (allSuccess) {
    alert('Order placed successfully!')
    cart.clear()
    showCart.value = false
  } else {
    alert(authError.value || 'Failed to place order.')
  }
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
