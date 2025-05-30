// import { streamText } from "ai";

// import { openai } from "@ai-sdk/openai";

// // Allow streaming responses up to 30 seconds

// export const maxDuration = 30;

// export async function POST(req: Request) {
//   try {
//     const { prompt } = await req.json();
//     console.log("API Key exists:", !!process.env.OPENAI_API_KEY);

//     const defaultPrompt =
//       prompt ||
//       "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//     const { textStream } = await streamText({
//       model: openai("gpt-4o"),
//       prompt: defaultPrompt,
//       temperature: 0.8,
//       maxTokens: 300,
//       system:
//         "You are a helpful assistant generating friendly, universally engaging questions for an anonymous Q&A platform. Avoid personal or sensitive topics.",
//     });

//     // for await (const text of textStream) {
//     //   process.stdout.write(text);
//     // }
//     // return textStream;

//     // Convert the stream to a text response
//     return new Response(await textStream, {
//       headers: {
//         "Content-Type": "text/plain; charset=utf-8",
//         "Cache-Control": "no-cache",
//       },
//     });
//   } catch (error) {
//     console.error("Error in suggest-messages", error);
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//       status: 500,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
// }

// const reader = textStream.getReader();
// const { value, done } = await reader.read();

// if (!value) {
//   console.warn("⚠️ Stream returned no content.");
//   return new Response("No content returned from model", {
//     status: 200,
//     headers: { "Content-Type": "text/plain" },
//   });
// }

// const chunk = new TextDecoder().decode(value);
// console.log("First decoded chunk:", chunk);
// return new Response(chunk);

import { fireworks } from "@ai-sdk/fireworks";
import { streamText } from "ai";

const { textStream } = streamText({
  model: fireworks("accounts/fireworks/models/mixtral-8x7b-instruct"),
  prompt: "Write a poem about embedding models.",
});

for await (const textPart of textStream) {
  console.log(textPart);
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    console.log("API Key exists:", !!process.env.OPENAI_API_KEY);

    const defaultPrompt =
      prompt ||
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const { textStream } = streamText({
      model: fireworks("accounts/fireworks/models/mixtral-8x7b-instruct"),
      prompt: defaultPrompt,
    });

    // for await (const text of textStream) {
    //   process.stdout.write(text);
    // }
    // return textStream;

    // Convert the stream to a text response
    return new Response(await textStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Error in suggest-messages", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

// {This is a local model

// import { ollama } from 'ollama-ai-provider';

// In route.ts
// const result = await streamText({
//   model: ollama('llama3'),
// ... rest unchanged
// });

// }
