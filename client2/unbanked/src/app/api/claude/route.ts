// app/api/claude/route.ts
import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // Must be in .env.local
});

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      console.log("No prompt provided in request body:", body);
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    console.log("Received prompt:", prompt);

    // Call Claude API
    const message = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    console.log("Claude raw response:", message);

    // Extract text from content blocks
    const responseText = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n");

    if (!responseText) {
      console.log("No text content in Claude response:", message.content);
      throw new Error("No text content returned from Claude");
    }

    console.log("Claude response text:", responseText);

    // Extract JSON if wrapped in ```json``` markers
    const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
    const jsonText = jsonMatch ? jsonMatch[1] : responseText;

    return NextResponse.json({ response: jsonText });
  } catch (error) {
    console.error("Claude API error:", error);
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}