import { NextResponse, NextRequest } from "next/server";
import { callChain } from "../../lib/langchain";
import { fetchDataFromCollection } from "../../lib/vector-store";
import { formatMessage, audioFileToBase64, readJsonTranscript } from "../../lib/aiUtils";

export const POST = async (req) => {
  console.log("POST request received");
  const body = await req.json();
  const messages = body.messages || [];

  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const question = messages[messages.length - 1].content;

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
  if (question === "Default message") {
    console.log("Default message received", welcomeMessage);
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