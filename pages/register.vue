<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card p-4 shadow" style="min-width: 350px;">
      <h2 class="mb-4 text-center">Register</h2>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" v-model="name" class="form-control" id="name" required>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" v-model="email" class="form-control" id="email" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" v-model="password" class="form-control" id="password" required>
        </div>
        <button type="submit" class="btn btn-success w-100" :disabled="isLoading">
          {{ isLoading ? 'Registering...' : 'Register' }}
        </button>
      </form>
      <div v-if="authError" class="alert alert-danger mt-3">{{ authError }}</div>
      <div v-if="success" class="alert alert-success mt-3">{{ success }}</div>
      <p class="text-center mt-3">
        Already have an account? <NuxtLink to="/login">Login here</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser, authError } from '@/composables/auth'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
const isLoading = ref(false)
const success = ref('')

async function register() {
  isLoading.value = true
  const result = await registerUser(email.value, password.value, name.value)
  isLoading.value = false

  if (result) {
    success.value = 'Registration successful! Redirecting to home...'
    setTimeout(() => {
      router.push('/')
    }, 1500)
  }
}
</script>
