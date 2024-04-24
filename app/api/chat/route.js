import { NextResponse, NextRequest } from "next/server";
import { callChain } from "../../lib/langchain";
import { fetchDataFromCollection } from "../../lib/vector-store";
import { formatMessage } from "./aiUtils";

export const POST = async (req) => {
  console.log("POST request received");
  const body = await req.json();
  const messages = body.messages || [];
  console.log(`messages: ${messages}`);
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const question = messages[messages.length - 1].content;
  console.log(`chat history: ${formattedPreviousMessages.join("\n")}`);
  console.log(`user asking a question: ${question}`);
  const welcomeContent = "Welcome to the chatbot!";
  const welcomeAudio = await audioFileToBase64("audios/welcome.wav");
  const welcomeLipSync = await readJsonTranscript("audios/welcome.json");
  const welcomeFacialExpression = "smile";
  const welcomeAnimation = "Idle";
  const welcomeMessage = {
    role: "assistant",
    content: welcomeContent,
    audio: welcomeAudio,
    lipSync: welcomeLipSync,
    facialExpression: welcomeFacialExpression,
    animation: welcomeAnimation,
  };
  if (!question) {
    return NextResponse.json(welcomeMessage, { status: 200 });
  }
  try {
    const streamingTextResponse = await callChain({
      question,
      chatHistory: formattedPreviousMessages.join("\n"),
    });
    return streamingTextResponse;
  } catch (error) {
    console.error("Internal server error ", error);
    return NextResponse.json("Error: Something went wrong. Try again!", {
      status: 500,
    });
  }
};
export const GET = async (req) => {
  const data = await fetchDataFromCollection("test");
   return NextResponse.json(data, { status: 200 })
} 