import { streamingModel, nonStreamingModel } from "./llm";
import { STANDALONE_QUESTION_TEMPLATE } from "./prompt-templates";

type callChainArgs = {
  question: string;
};

export async function callChain({ question }: callChainArgs) {
  try {
    const sanitizedQuestion = question.trim().replace("\n", " ");
    console.log("Sanitized Question:", sanitizedQuestion);

    const response = await streamingModel.invoke(
      STANDALONE_QUESTION_TEMPLATE
    );

    const stream = new ReadableStream({
      async start(controller) {
        const text = typeof response.content === "string" ? response.content : "";
        controller.enqueue(new TextEncoder().encode(text));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("Error in callChain:", error);
    throw error;
  }
}
