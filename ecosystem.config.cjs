module.exports = {
  apps: [
    {
      name: process.env.AZURE_WEBAPP_NAME || 'nuxt-app',
      script: '.output/server/index.mjs',
      interpreter: 'node',
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
