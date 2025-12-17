export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // Print env variables and runtime config to help debug why Supabase keys are missing
  console.log('🧪 env-debug: process.env.NUXT_PUBLIC_SUPABASE_URL:', process.env.NUXT_PUBLIC_SUPABASE_URL)
  console.log('🧪 env-debug: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY present:', !!process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY)

  console.log('🧪 env-debug: runtimeConfig.public.supabaseUrl:', config.public?.supabaseUrl)
  console.log('🧪 env-debug: runtimeConfig.public.supabaseAnonKey present:', !!config.public?.supabaseAnonKey)

  // no provide, this plugin is only for logging at startup
})
