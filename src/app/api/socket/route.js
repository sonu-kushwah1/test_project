import { Server } from 'socket.io';

let io;
let messages = [];

export function GET() {
  if (!io) {
    io = new Server(globalThis.server, {
      path: '/api/socket/io',
      addTrailingSlash: false,
      cors: {
        origin: '*',
      },
    });

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('message', (text) => {
        const message = { id: Date.now(), text };
        messages.push(message);

        io.emit('message', message); // 👈 broadcast to everyone
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  }

  return new Response('Socket initialized');
}
