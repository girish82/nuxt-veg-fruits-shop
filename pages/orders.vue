<template>
  <div class="orders-page container py-5">
    <h2 class="mb-4 text-center">My Orders</h2>
    <div v-if="orders.length === 0" class="alert alert-info text-center">
      You have no previous orders.
    </div>
    <div v-else>
      <div v-for="order in orders" :key="order.order_number" class="card mb-4 shadow order-card">
        <div class="card-header d-flex justify-content-between align-items-center bg-primary text-white">
          <span>Order #{{ order.order_number }}</span>
          <span>{{ formatDate(order.created_at) }}</span>
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
          <span class="fw-bold">Total: ${{ order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { currentUser } from '@/composables/userSession'
import { useNuxtApp } from '#app'

const orders = ref([])
const loading = ref(false)

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleString()
}

async function fetchOrders() {
  if (!currentUser.value) return
  loading.value = true
  const { $supabase } = useNuxtApp()
  // Fetch all order rows for this user, with product details
  const { data, error } = await $supabase
    .from('orders')
    .select('id, created_at, total_price, quantity, status, product_id, order_number, product:product_id (id, name, price, description, image_url)')
    .eq('user_id', currentUser.value.id)
    .order('created_at', { ascending: false })
  if (!error && data) {
    // Group by order_number
    const grouped = {};
    for (const row of data) {
      if (!grouped[row.order_number]) {
        grouped[row.order_number] = {
          order_number: row.order_number,
          created_at: row.created_at,
          status: row.status,
          items: [],
        };
      }
      grouped[row.order_number].items.push({
        id: row.product?.id || row.product_id,
        name: row.product?.name || 'Unknown',
        price: row.product?.price || 0,
        description: row.product?.description || '',
        image: row.product?.image_url || '',
        quantity: row.quantity,
        total: row.total_price
      });
    }
    // Convert to array and sort by created_at desc
    orders.value = Object.values(grouped).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }
  loading.value = false
}

onMounted(() => {
  fetchOrders()
})
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
