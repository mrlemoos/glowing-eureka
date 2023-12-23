import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";

import { type OpenAIModel } from "@root/constants/openai";

/**
 * The notation that tells Vercel to run this endpoint on the Edge so we make it run smarter and faster.
 */
export const runtime = "edge";

/**
 * The key for the query parameter that specifies the model to use for the {@link OpenAIModel | OpenAI} API.
 */
const __MODEL_SEARCH_PARAM_KEY = "model" as const;

/**
 * The maximum number of tokens that can be sent to the {@link OpenAI} API.
 */
const __openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

/**
 * The HTTP method for the POST route that auto-completes the model options to the {@link OpenAIModel | OpenAI} API.
 *
 * @example
 * ```http
 *
 * POST /api/chats/{{chatId}}/prompt?model=gpt-4 HTTP/1.1
 *
 * Authorization: Bearer {{token}}
 * Content-Type: application/json
 *
 * {
 *   "prompt":
 *      "Please provide me a database schema for a Chatbot written in Prisma. Also, this schema should be able to store the messages sent by the user and the bot and pre-loaded prompts for initial instructions for the OpenAI model.",
 *   "history": [
 *     {
 *       "content": "Please provide me a database schema for a Chatbot written in Prisma.",
 *       "role": "user"
 *     },
 *   ]
 * }
 * ```
 */
export async function POST(req: NextRequest) {
  const { prompt, history } = (await req.json()) as {
    prompt: string;
    history?: { content: string; role: string }[];
  };

  if (typeof prompt !== "string") {
    return NextResponse.json(
      {
        message: "The prompt must be a string.",
      },
      { status: 400 }
    );
  }

  const modelQuery = req.nextUrl.searchParams.get(__MODEL_SEARCH_PARAM_KEY);
  const model = modelQuery as OpenAIModel;

  const coercedHistoryArray = Array.isArray(history) ? history : [];

  const messages = [...coercedHistoryArray, { content: prompt, role: "user" }];
  const messagesWithLatestPrompt = [
    ...messages,
    {
      content: prompt,
      role: "user",
    },
  ] as OpenAI.Chat.ChatCompletionMessageParam[];

  const response = await __openai.chat.completions.create({
    model,
    stream: true,
    temperature: 0.6,
    max_tokens: 1000,
    messages: messagesWithLatestPrompt,
  });
  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
