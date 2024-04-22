import { NextResponse, NextRequest } from "next/server";
import { callChain } from "../../lib/langchain";

const formatMessage = (message) => {
  return `${message.role === "user" ? "User" : "Assistant"}: ${message.content}`;
};

export const POST = async (req) => {
  const body = await req.json();
  const messages = body.messages || [];
  console.log(`messages: ${messages}`);
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const question = messages[messages.length - 1].content;
  console.log(`chat history: ${formattedPreviousMessages.join("\n")}`);
  console.log(`user asking a question: ${question}`);
  if (!question) {
    return NextResponse.json("Error: No question in the request", {
      status: 400,
    }); // Bad Request
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
