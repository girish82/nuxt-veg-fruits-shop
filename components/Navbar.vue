
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <div class="container">
      <a class="navbar-brand" href="/">ShopCart</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/">Home</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/products">Products</NuxtLink>
          </li>
        </ul>
        <ul class="navbar-nav align-items-center">
          <li class="nav-item me-3">
            <a class="nav-link position-relative" href="#" @click.prevent="emitCartOpen">
              <span class="bi bi-cart" style="font-size: 1.5rem;"></span>
              <span v-if="cartCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{ cartCount }}
              </span>
            </a>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/login">Login</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { cartModalVisible } from '@/composables/cartModal'
const cart = useCartStore()
const cartCount = computed(() => cart.items.reduce((sum, item) => sum + item.quantity, 0))
function emitCartOpen() {
  cartModalVisible.value = true
}
</script>
