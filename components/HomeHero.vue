<template>
  <div class="home-hero position-relative text-center">
    <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1920&q=80" class="bg-img" alt="Shopping">
    <div class="hero-content position-absolute top-50 start-50 translate-middle">
      <h1 class="display-4 fw-bold text-white mb-4">Welcome to ShopCart</h1>
      <NuxtLink to="/products" class="btn btn-primary btn-lg">Shop Now</NuxtLink>
    </div>
  </div>
</template>

<script setup>
// No script needed for static hero
</script>

<style scoped>
.home-hero {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.bg-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: 1;
}
.hero-content {
  z-index: 2;
}
</style>
