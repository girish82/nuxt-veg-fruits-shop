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
        <button type="submit" class="btn btn-success w-100">Register</button>
      </form>
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
      <div v-if="success" class="alert alert-success mt-3">{{ success }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'
import { addUser, users } from '@/composables/userStore'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const router = useRouter()

function register() {
  // Simple mock registration logic
  if (name.value && email.value && password.value) {
    // Check if user already exists
    if (users.value.some(u => u.email === email.value)) {
      error.value = 'User with this email already exists.'
      success.value = ''
      return
    }
    addUser({ name: name.value, email: email.value, password: password.value })
    error.value = ''
    success.value = 'Registration successful! Redirecting to login...'
    setTimeout(() => {
      router.push('/login')
    }, 1200)
    name.value = ''
    email.value = ''
    password.value = ''
  } else {
    error.value = 'Please fill in all fields.'
    success.value = ''
  }
}
</script>
