

import OpenAI from "openai";
import ElevenLabs from "elevenlabs-node";
import { NextResponse, NextRequest } from "next/server";
import { callChain } from "../../../lib/langchain";
import { Message } from "ai";

const openai = new OpenAI({
  apiKey: process.env.PUBLIC_NEXT_OPEN_AI_API_KEY || "-",
});

const elevenLabsApiKey = process.env.PUBLIC_NEXT_ELEVEN_LABS_API_KEY;

const voice = new ElevenLabs({
  apiKey: elevenLabsApiKey,
});

export const POST = async (req) => {
  const body = await req.json();
  const messages = body.messages || [];
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const question = messages[messages.length - 1].content;
  console.log(`chat history: ${formattedPreviousMessages.join("\n")}`);
  console.log(`user asking a question: ${question}`);
  if (!question) {
    return NextResponse.json(
      {
        messages: [
          {
            text: "Sorry, I'm not available right now. Please try again later!",
            audio: await audioFileToBase64("audios/error_0.wav"),
            lipsync: await readJsonTranscript("audios/error_0.json"),
            facialExpression: "sad",
            animation: "Crying",
          },
        ],
      },
      { status: 200 }
    );
  }
  try {
    const streamingTextResponse = await callChain({
      question,
      chatHistory: formattedPreviousMessages.join("\n"),
    });
    return streamingTextResponse;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        messages: [
          {
            text: "Sorry, I'm not available right now. Please try again later!",
            audio: await audioFileToBase64("audios/error_0.wav"),
            lipsync: await readJsonTranscript("audios/error_0.json"),
            facialExpression: "sad",
            animation: "Crying",
          },
        ],
      },
      { status: 200 }
    );
  }
}