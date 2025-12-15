<template>
  <div class="home-hero position-relative text-center" role="img" aria-label="Fruits and vegetables background">
    <div class="hero-bg" />
    <div class="hero-overlay" />
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
.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  z-index: 1;
}
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35));
  z-index: 2;
}
.hero-content {
  z-index: 3;
}
</style>
