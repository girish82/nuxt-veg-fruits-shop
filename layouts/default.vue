<template>
  <div>
    <Navbar />
    <NuxtPage />
    <CartModal />
  </div>
</template>


<script setup>
// Cart and checkout logic removed. Use cart.vue for cart UI and checkout.
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
