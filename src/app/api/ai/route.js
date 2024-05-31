import { StreamingTextResponse, createStreamDataTransformer } from "ai";
import { callChain } from "../../../lib/langchain";


export const dynamic = "force-dynamic";

export async function GET(req) {
  const question = req.nextUrl.searchParams.get("question") || "Welcome to danspelt.com";
  const formattedPreviousMessages = ["message1", "message2", "message3"];
  
  try {
    const streamingTextResponse = callChain({
      question,
      chatHistory: formattedPreviousMessages,
    });
    
    console.log("Streaming Text Response:", streamingTextResponse);
    return streamingTextResponse;
  } catch (error) {
    return new Response("An error occurred", { status: 500 });
  }
}
