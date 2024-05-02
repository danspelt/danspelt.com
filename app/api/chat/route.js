import { NextResponse, NextRequest } from "next/server";
import { callChain } from "../../lib/langchain";
import { fetchDataFromCollection } from "../../lib/vector-store";
import { formatMessage } from "../../lib/aiUtils";

export const POST = async (req) => {
  
  const body = await req.json();
  const messages = body.messages || [];

  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const question = messages[messages.length - 1].content;
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