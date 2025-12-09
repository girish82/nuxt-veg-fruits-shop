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
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
      <div class="mt-3 text-center">
        <NuxtLink to="/register" class="link-primary">New user? Register here</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { findUser } from '@/composables/userStore'
import { setCurrentUser } from '@/composables/userSession'
import { useRouter } from 'vue-router'


const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

function login() {
  // Check credentials against user list
  const user = findUser(email.value, password.value)
  if (user) {
    error.value = ''
    setCurrentUser(user)
    router.push('/')
  } else {
    error.value = 'Invalid email or password.'
  }
}
</script>
