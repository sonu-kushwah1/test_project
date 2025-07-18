// app/api/translate/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { text, target } = body;

  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      q: text,
      target: target || "hi", // default to Hindi
      format: "text",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  const translatedText = data?.data?.translations?.[0]?.translatedText || "";

  return NextResponse.json({ translatedText });
}
