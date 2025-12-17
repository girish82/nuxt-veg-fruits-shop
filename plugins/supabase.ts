import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  // For Nuxt 4: NUXT_PUBLIC_* vars are automatically injected into config.public
  // They are normalized to camelCase (e.g. NUXT_PUBLIC_SUPABASE_URL becomes config.public.supabaseUrl)
  const config = useRuntimeConfig()
  
  const supabaseUrl = config.public?.supabaseUrl || process.env.NUXT_PUBLIC_SUPABASE_URL || 'https://esprsmpgrdmnblzlssab.supabase.co'
  const supabaseAnonKey = config.public?.supabaseAnonKey || process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzcHJzbXBncmRtbmJsemxzc2FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3ODAxMDUsImV4cCI6MjA4MTM1NjEwNX0.tJStPKNkMSWvMeGjTMP7mG1Inyj3WY4qbkavd5Dbm8Y'

  console.log('🔍 Checking Supabase config...')
  console.log(' - runtimeConfig.public.supabaseUrl present:', !!config.public?.supabaseUrl)
  console.log(' - runtimeConfig.public.supabaseAnonKey present:', !!config.public?.supabaseAnonKey)
  console.log(' - fallback process.env.NUXT_PUBLIC_SUPABASE_URL present:', !!process.env.NUXT_PUBLIC_SUPABASE_URL)
  console.log(' - fallback process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY present:', !!process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY)

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('❌ Supabase not configured. Ensure `.env.local` exists and contains:')
    console.warn('   NUXT_PUBLIC_SUPABASE_URL=...')
    console.warn('   NUXT_PUBLIC_SUPABASE_ANON_KEY=...')
    // don't throw here; other code will handle missing client
    return
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    console.log('✅ Supabase client initialized')
    
    return {
      provide: {
        supabase
      }
    }
  } catch (err) {
    console.error('❌ Failed to initialize Supabase:', err.message)
  }
})
