import { NextRequest, NextResponse } from "next/server";

// Replace with your Gemini API key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
  }

  try {
    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" +
        GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    const data = await geminiRes.json();
    console.log("Gemini API response:", JSON.stringify(data, null, 2));
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text) {
      return NextResponse.json({ result: text });
    } else {
      return NextResponse.json(
        { error: "No candidates in Gemini response", raw: data },
        { status: 502 }
      );
    }
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to contact Gemini API" },
      { status: 500 }
    );
  }
}
