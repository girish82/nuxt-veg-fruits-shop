<template>
  <div class="orders-page container py-5">
    <h2 class="mb-4 text-center">My Orders</h2>
    <div v-if="orders.length === 0" class="alert alert-info text-center">
      You have no previous orders.
    </div>
    <div v-else>
      <div v-for="order in orders" :key="order.id" class="card mb-4 shadow order-card">
        <div class="card-header d-flex justify-content-between align-items-center bg-primary text-white">
          <span>Order #{{ order.id }}</span>
          <span>{{ formatDate(order.date) }}</span>
        </div>
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li v-for="item in order.items" :key="item.id" class="list-group-item d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <img :src="item.image" alt="" class="order-product-img me-3" />
                <span>{{ item.name }}</span>
              </div>
              <span class="badge bg-secondary">x{{ item.quantity }}</span>
              <span class="fw-bold">${{ (item.price * item.quantity).toFixed(2) }}</span>
            </li>
          </ul>
        </div>
        <div class="card-footer text-end">
          <span class="fw-bold">Total: ${{ orderTotal(order).toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { currentUser } from '@/composables/userSession'
import { allOrders } from '@/composables/orders'

const orders = computed(() => {
  if (!currentUser.value) return []
  return allOrders.value.filter(order => order.userEmail === currentUser.value.email)
})

function orderTotal(order) {
  return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

function formatDate(date) {
  if (!(date instanceof Date)) date = new Date(date)
  return date.toLocaleString()
}
</script>

<style scoped>
.orders-page {
  max-width: 700px;
}
.order-card {
  border-radius: 12px;
  overflow: hidden;
}
.order-product-img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #eee;
  background: #fafafa;
}
</style>
