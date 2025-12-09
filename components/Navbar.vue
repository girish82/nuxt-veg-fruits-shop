
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
          <li v-if="currentUser" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" @click.prevent="toggleDropdown" :class="{ show: dropdownOpen }" aria-expanded="dropdownOpen">
              <span class="bi bi-person-circle me-1"></span>{{ currentUser.name }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end" :class="{ show: dropdownOpen }" aria-labelledby="userDropdown">
              <li><NuxtLink class="dropdown-item" to="/orders" @click="closeDropdown">My Orders</NuxtLink></li>
              <li><a class="dropdown-item" href="#" @click.prevent="logout">Logout</a></li>
            </ul>
          </li>
          <li v-else class="nav-item">
            <NuxtLink class="nav-link" to="/login">Login</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
 </template>
<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { cartModalVisible } from '@/composables/cartModal'
import { currentUser, logoutUser } from '@/composables/userSession'
import { useRouter } from 'vue-router'
const cart = useCartStore()
const cartCount = computed(() => cart.items.reduce((sum, item) => sum + item.quantity, 0))
const router = useRouter()
const dropdownOpen = ref(false)
function emitCartOpen() {
  cartModalVisible.value = true
}
function logout() {
  logoutUser()
  closeDropdown()
  router.push('/login')
}
function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}
function closeDropdown() {
  dropdownOpen.value = false
}
</script>
