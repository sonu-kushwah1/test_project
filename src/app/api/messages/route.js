let messages = [];

export async function GET() {
  return Response.json(messages);
}

export async function POST(req) {
  const body = await req.json();
  const newMessage = { id: Date.now(), text: body.text };
  messages.push(newMessage);
  return Response.json(newMessage);
}
