<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { initializeUserSession } from '~/composables/userSession'
import { initializeOrders } from '~/composables/orders'

// Restore user session from localStorage on app load
onMounted(() => {
  initializeUserSession()
  initializeOrders()
})
</script>
