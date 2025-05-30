import { streamText } from "ai";
import { fireworks } from "@ai-sdk/fireworks";
import { StreamingTextResponse } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = await streamText({
      model: fireworks("accounts/fireworks/models/mixtral-8x7b-instruct"),
      messages: [
        {
          role: "system",
          content: 'Return exactly 3 questions separated by "||"',
        },
        {
          role: "user",
          content: prompt || "Generate fun questions about life",
        },
      ],
      temperature: 0.7,
    });

    // Correct modern method - THIS WILL WORK
    return new StreamingTextResponse(result.toAIStream());
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Generation failed" }), {
      status: 500,
    });
  }
}
