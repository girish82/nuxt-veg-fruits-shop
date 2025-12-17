<template>
  <div>
    <div class="container py-5">
      <h1 class="mb-4">Product List</h1>
      <div class="row">
        <div v-for="product in products" :key="product.id" class="col-md-4 mb-4">
          <div class="card h-100">
            <img :src="product.image" class="card-img-top" alt="Product Image" style="height: 200px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">{{ product.description }}</p>
              <div class="mt-auto">
                <p class="card-text fw-bold">${{ product.price }}</p>
                <button class="btn btn-primary w-100" @click="addToCart(product)">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { ref, onMounted } from 'vue'
const cart = useCartStore()
const products = ref([])
const loading = ref(true)
const error = ref(null)

const { $supabase } = useNuxtApp()

async function fetchProducts() {
  loading.value = true
  const { data, error: fetchError } = await $supabase
    .from('products')
    .select('id, name, description, price, image_url')
    .order('name', { ascending: true })
  if (fetchError) {
    error.value = fetchError.message
    products.value = []
  } else {
    // Map image_url to image for compatibility with template
    products.value = data.map(p => ({
      ...p,
      image: p.image_url
    }))
    error.value = null
  }
  loading.value = false
}

function addToCart(product) {
  cart.add(product)
}

onMounted(fetchProducts)
</script>
