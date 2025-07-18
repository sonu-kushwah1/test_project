// // chatserver/server.js

// const express = require('express');
// const http = require('http');
// const cors = require('cors');
// const { Server } = require('socket.io');
// const axios = require('axios');

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; // << Add this line

// const app = express();
// app.use(cors());
// app.use(express.json());

// const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: '*',
//     }
// });

// // Your external API base URL
// // const API_BASE_URL = 'https://192.168.1.40:8443/sukhasar/control/';
// const API_BASE_URL = 'https://192.168.1.40:8443/sukhasar/control/';

// const rooms = {}; // In-memory message store

// io.on('connection', (socket) => {
//     console.log('✅ A user connected:', socket.id);

//     // CREATE ROOM
//     socket.on('createRoom', (roomId) => {
//         if (!rooms[roomId]) {
//             rooms[roomId] = [];
//             console.log(🛠 Room created: ${roomId});
//         }
//     });

//     // JOIN ROOM
//     socket.on('joinRoom', async (roomId) => {
//         socket.join(roomId);
//         console.log(🚪 ${socket.id} joined room: ${roomId});

//         // Fetch chat history from API
//         try {
//             const form = new URLSearchParams();
//             form.append('VIEW_NAME', 'getChatMessages');
//             form.append('roomId', roomId);

//             const response = await axios.post(${API_BASE_URL}getChatMessages, form, {
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//             });

//             const chatHistory = response?.data?.messageList || [];
//             socket.emit('roomHistory', chatHistory);
//         } catch (err) {
//             console.error('⚠️ Failed to fetch chat history:', err.message);
//         }
//     });

//     // SEND MESSAGE
//     socket.on('chatMessage', async ({ roomId, message, username, base64Image }) => {
//         const messageObj = {
//             username,
//             messageText: message,
//             time: new Date().toLocaleTimeString(),
//             base64Image: base64Image || '',
//         };

//         // Save to external API
//         try {
//             const form = new URLSearchParams();
//             form.append('VIEW_NAME', 'createChatMessage');
//             form.append('roomId', roomId);
//             form.append('messageText', message);
//             form.append('username', username);
//             // if (base64Image) {
//                 form.append('base64Image', base64Image);
//             // }
//             const response = await axios.post(${API_BASE_URL}getChatMessages, form, {
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//             });

//             if (response?.data?.responseMessage === 'success') {
//                 io.to(roomId).emit('message', messageObj);
//                 console.log(📨 Message sent to ${roomId}: ${message});
//             } else {
//                 console.error('❌ API rejected message:', response?.data);
//             }
//         } catch (err) {
//             console.error('⚠️ Error sending message via API:', err.message);
//         }
//     });

//     socket.on('disconnect', () => {
//         console.log(🔌 User disconnected: ${socket.id});
//     });
// });

// // Start the server
// server.listen(3001, () => {
//     console.log('✅ Chat server running on http://localhost:3001');
// });