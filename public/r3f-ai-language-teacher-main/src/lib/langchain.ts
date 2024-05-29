import { NextResponse } from "next/server";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { getVectorStore } from "./vector-store";
import {
  StreamingTextResponse,
  experimental_StreamData,
  LangChainStream,
} from "ai-stream-experimental";
import { streamingModel, nonStreamingModel } from "./llm";
import { STANDALONE_QUESTION_TEMPLATE, QA_TEMPLATE } from "./prompt-templates";

type callChainArgs = {
  question: string;
};

function removeNonReadableChars(chunk) {
  return chunk.replace(/[^ -~\n\r]/g, ""); // Remove non-readable ASCII characters
}

function createStreamCleaningTransformer() {
  return new TransformStream({
    start() {},
    transform(chunk, controller) {
      const cleanedChunk = removeNonReadableChars(chunk);
      controller.enqueue(cleanedChunk);
    },
    flush(controller) {
      controller.terminate();
    },
  });
}

export async function callChain({ question }: callChainArgs) {
  try {
    const sanitizedQuestion = question.trim().replace("\n", " ");
    console.log("Sanitized Question:", sanitizedQuestion);

    // Ensure vectorStore is correctly initialized
    const vectorStore = await getVectorStore();
    if (!vectorStore) {
      throw new Error("Vector store initialization failed.");
    }
    // console.log("Vector Store:", vectorStore);

    // Initialize stream and handlers
    const { stream, handlers } = LangChainStream({
      experimental_streamData: true,
    });

    // Check models
    if (!streamingModel || !nonStreamingModel) {
      throw new Error("Models are not properly initialized.");
    }

    // Check templates
    if (!QA_TEMPLATE || !STANDALONE_QUESTION_TEMPLATE) {
      throw new Error("Templates are not properly initialized.");
    }

    // console.log("Streaming Model:", streamingModel);
    // console.log("Non-Streaming Model:", nonStreamingModel);
    // console.log("QA Template:", QA_TEMPLATE);
    // console.log("Standalone Question Template:", STANDALONE_QUESTION_TEMPLATE);

    // Initialize the chain
    const chain = ConversationalRetrievalQAChain.fromLLM(
      streamingModel,
      vectorStore.asRetriever(),
      {
        qaTemplate: QA_TEMPLATE,
        questionGeneratorTemplate: STANDALONE_QUESTION_TEMPLATE,
        returnSourceDocuments: true,
        questionGeneratorChainOptions: {
          llm: nonStreamingModel,
        },
      }
    );
    console.log("Chain Initialized:", chain);
    // Execute the chain call
    chain.call(
      {
        question: sanitizedQuestion,
        chat_history: [],
      },
      [handlers]
    );


    // Pipe the stream through the cleaning transformer
    const cleanedStream = stream.pipeThrough(createStreamCleaningTransformer());


    console.log("Cleaned Stream:", cleanedStream);
    return new StreamingTextResponse(cleanedStream);
  } catch (e) {
    console.error("Error in callChain:", e.message);
    throw new Error("Call chain method failed to execute successfully!");
  }
} 