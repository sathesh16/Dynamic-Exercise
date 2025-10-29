// server.mjs (or add "type": "module" in package.json)

import { WebSocketServer } from 'ws';

// Create WebSocket server on port 8080
const wss = new WebSocketServer({ port: 8080 });

// Broadcast to all connected clients
wss.broadcast = function (data) {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // 1 = WebSocket.OPEN
      client.send(data);
    }
  });
};

// Handle client connections
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send welcome message
  ws.send('Welcome! You are connected to the WebSocket server.');

  // Listen for incoming messages
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    wss.broadcast(message.toString());
  });

  // Handle disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on ws://localhost:8080');
