<template>
  <div>
    <Navbar />
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
import Navbar from '@/components/Navbar.vue'
import { useCartStore } from '@/stores/cart'

const products = [
  {
    id: 1,
    name: 'Apple',
    description: 'Fresh and juicy apples.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    name: 'Orange',
    description: 'Sweet and tangy oranges.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    name: 'Tomato',
    description: 'Ripe and delicious tomatoes.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 4,
    name: 'Banana',
    description: 'Sweet and creamy bananas.',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e8f8?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 5,
    name: 'Carrot',
    description: 'Crunchy and healthy carrots.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 6,
    name: 'Broccoli',
    description: 'Fresh green broccoli.',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1502741126161-b048400d94b7?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 7,
    name: 'Strawberry',
    description: 'Sweet and juicy strawberries.',
    price: 25.99,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca4?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 8,
    name: 'Spinach',
    description: 'Nutritious leafy spinach.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 9,
    name: 'Grapes',
    description: 'Fresh and sweet grapes.',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1519864600265-abb224a0e99c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 10,
    name: 'Potato',
    description: 'Versatile and tasty potatoes.',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1500315331616-db2aecd8a69e?auto=format&fit=crop&w=400&q=80'
  }
]

const cart = useCartStore()

function addToCart(product) {
  cart.add(product)
}
</script>
