const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

function loadEnv(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const lines = content.split(/\r?\n/)
    const env = {}
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      const val = trimmed.slice(eq + 1).trim()
      env[key] = val.replace(/^"|"$/g, '')
    }
    return env
  } catch (err) {
    return {}
  }
}

async function run() {
  const projectRoot = path.resolve(__dirname, '..')
  const envFile = path.join(projectRoot, '.env.local')
  const env = loadEnv(envFile)

  const url = env.NUXT_PUBLIC_SUPABASE_URL || process.env.NUXT_PUBLIC_SUPABASE_URL
  const key = env.NUXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY

  console.log('Using Supabase URL:', !!url)
  console.log('Using Supabase Key present:', !!key)

  if (!url || !key) {
    console.error('Missing Supabase credentials. Check .env.local or environment variables.')
    process.exit(2)
  }

  const supabase = createClient(url, key)

  // Create a test user with a unique email to avoid unique constraint errors
  const testEmail = `test+${Date.now()}@example.com`
  const testName = 'Test User'
  const testPasswordHash = 'test-hash-placeholder'

  try {
    const { data, error } = await supabase
      .from('users')
      .insert([
        { email: testEmail, name: testName, password_hash: testPasswordHash }
      ])
      .select()

    if (error) {
      console.error('Supabase insert error:', error)
      process.exit(3)
    }

    console.log('Insert successful, returned:', data)
    process.exit(0)
  } catch (err) {
    console.error('Unexpected error:', err)
    process.exit(4)
  }
}

run()
