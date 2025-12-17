const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')
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

  if (!url || !key) {
    console.error('Missing Supabase credentials')
    process.exit(2)
  }

  const supabase = createClient(url, key)

  const plainPassword = 'Secret123!'
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(plainPassword, salt)

  console.log('Password hashed length:', hash.length)

  const testEmail = `regtest+${Date.now()}@example.com`
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([{ email: testEmail, name: 'Reg Test', password_hash: hash }])
      .select()

    if (error) {
      console.error('Insert error:', error)
      process.exit(3)
    }
    console.log('Insert OK:', data)
  } catch (err) {
    console.error('Unexpected error:', err)
    process.exit(4)
  }
}

run()
