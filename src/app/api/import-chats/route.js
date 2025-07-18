// export async function GET() {
//   const response = await fetch('http://localhost:3003/chat_list');
//   const chatList = await response.json();

//   for (const item of chatList) {
//     await fetch('http://localhost:3000/api/messages', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ text: item.text })  // Adjust key if needed
//     });
//   }

//   return Response.json({ message: 'Imported chats', count: chatList.length });
// }
