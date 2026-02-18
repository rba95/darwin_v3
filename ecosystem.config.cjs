module.exports = {
  apps: [
    {
      name: 'darwin-backend',
      script: '/home/user/webapp/backend/start.sh',
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    },
    {
      name: 'darwin-frontend',
      cwd: '/home/user/webapp/frontend',
      script: 'npx',
      args: 'vite --host 0.0.0.0 --port 5173',
      env: {
        NODE_ENV: 'development'
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
