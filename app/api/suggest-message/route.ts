import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { NextResponse } from "next/server";

const token = process.env.LALMA_SUMURISER_CLASSIC_API_KEY;
const endpoint = "https://models.github.ai/inference";
const model = "meta/Llama-4-Scout-17B-16E-Instruct";

export async function POST(req: Request) {
  try {
    const { messages, mode = "chat" } = await req.json();

    const client = ModelClient(endpoint, new AzureKeyCredential(token!));

    // System prompt based on mode
    const systemContent =
      mode === "summarize"
        ? "Please summarize the provided text in 100 words or less, capturing the main points, key ideas, and essential information. Ensure the summary is concise, clear, and easy to understand:"
        : "You are a helpful AI assistant.";

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [{ role: "system", content: systemContent }, ...messages],
        temperature: mode === "summarize" ? 0.3 : 0.7, // Lower temp for summaries
        top_p: 0.1,
        max_tokens: 2048,
        model,
      },
    });

    console.log("api route clicked");

    if (isUnexpected(response)) {
      throw new Error(response.body.error?.message || "API request failed");
    }

    console.log(response.body.choices[0].message.content);
    return NextResponse.json({
      content: response.body.choices[0].message.content,
    });
  } catch (error) {
    console.log("api route clicked");
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
