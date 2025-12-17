// Place a new order for a user
export async function placeOrder({ userId, productId, quantity, totalPrice, status = 'pending', orderNumber }) {
  authError.value = ''
  authLoading.value = true

  try {
    const supabase = getSupabase()
    const { error } = await supabase
      .from('orders')
      .insert([
        {
          user_id: userId,
          product_id: productId, // Use as string (UUID)
          quantity: quantity,
          total_price: totalPrice,
          status: status,
          order_number: orderNumber
        }
      ])
    console.log('Order placed:', { userId, productId, quantity, totalPrice, status })
    authLoading.value = false
    if (error) {
      authError.value = error.message || 'Failed to place order.'
      return false
    }
    return true
  } catch (error) {
    authError.value = error.message || 'Failed to place order.'
    authLoading.value = false
    console.error('Order error:', error)
    return false
  }
}
import { ref } from 'vue'
import bcrypt from 'bcryptjs'
import { setCurrentUser } from './userSession'

export const authError = ref('')
export const authLoading = ref(false)

function getSupabase() {
  const { $supabase } = useNuxtApp()
  if (!$supabase) {
    throw new Error('Supabase client not initialized. Check your .env.local and plugin setup.')
  }
  return $supabase
}

export async function registerUser(email, password, name) {
  authError.value = ''
  authLoading.value = true

  if (!email || !password || !name) {
    authError.value = 'All fields are required.'
    authLoading.value = false
    return false
  }
  if (password.length < 6) {
    authError.value = 'Password must be at least 6 characters.'
    authLoading.value = false
    return false
  }

  try {
    const supabase = getSupabase()
    // Register with Supabase Auth
    const { data: signUpData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    })
    if (error) {
      // Check if it's a unique constraint error
      if (error.code === '23505') {
        authError.value = 'Email already registered'
      } else {
        authError.value = error.message || 'Registration failed'
      }
      authLoading.value = false
      return false
    }

    // Hash the password for the users table
    const passwordHash = await bcrypt.hash(password, 10)

    // Insert into users table (optional, for profile info)
    if (signUpData && signUpData.user) {
      const { error: insertError } = await supabase
        .from('users')
        .insert([
          {
            id: signUpData.user.id,
            email: signUpData.user.email,
            name: name,
            password_hash: passwordHash
          }
        ])
      if (insertError) {
        authError.value = insertError.message || 'Failed to save user profile.'
        authLoading.value = false
        return false
      }
    }

    authLoading.value = false
    return true
  } catch (error) {
    authError.value = error.message || 'Registration failed'
    authLoading.value = false
    console.error('Registration error:', error)
    return false
  }
}

export async function loginUser(email, password) {
  authError.value = ''

  if (!email || !password) {
    authError.value = 'Email and password are required'
    return false
  }

  try {
    const supabase = getSupabase()
    // Use Supabase Auth signInWithPassword
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      authError.value = error.message || 'Invalid email or password'
      return false
    }
    // Set current user if needed
    if (data && data.user) {
      setCurrentUser({
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || ''
      })
    }
    return true
  } catch (error) {
    authError.value = error.message || 'Login failed'
    console.error('Login error:', error)
    return false
  }
}
