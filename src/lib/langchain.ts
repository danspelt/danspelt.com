import {
  StreamingTextResponse,
  experimental_StreamData,
  LangChainStream,
} from "ai-stream-experimental";
import { streamingModel, nonStreamingModel } from "./llm";
import { STANDALONE_QUESTION_TEMPLATE } from "./prompt-templates";

type callChainArgs = {
  question: string;
};

export async function callChain({ question }: callChainArgs) {
  try {
    const sanitizedQuestion = question.trim().replace("\n", " ");
    console.log("Sanitized Question:", sanitizedQuestion);

    const { stream, handlers } = LangChainStream({
      experimental_streamData: true,
    });
    const data = new experimental_StreamData();

    const response = await streamingModel.call(
      STANDALONE_QUESTION_TEMPLATE(sanitizedQuestion),
      { callbacks: [handlers] }
    );

    data.append({ response });
    data.close();

    return new StreamingTextResponse(stream, {}, data);
  } catch (error) {
    console.error("Error in callChain:", error);
    throw error;
  }
}
