<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card p-4 shadow" style="min-width: 350px;">
      <h2 class="mb-4 text-center">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" v-model="email" class="form-control" id="email" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" v-model="password" class="form-control" id="password" required>
        </div>
        <button type="submit" class="btn btn-primary w-100" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
      <div v-if="authError" class="alert alert-danger mt-3">{{ authError }}</div>
      <div class="mt-3 text-center">
        <NuxtLink to="/register" class="link-primary">New user? Register here</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser, authError } from '@/composables/auth'

const email = ref('')
const password = ref('')
const router = useRouter()
const isLoading = ref(false)

async function login() {
  isLoading.value = true
  const result = await loginUser(email.value, password.value)
  isLoading.value = false

  if (result) {
    router.push('/')
  }
}
</script>
