const { spawn } = require('child_process');
const path = require('path');

// Démarrer le serveur backend
const server = spawn('node', ['../server.js'], {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit'
});

console.log('Server started with PID:', server.pid);

// Gérer la fermeture
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.kill();
  process.exit();
});