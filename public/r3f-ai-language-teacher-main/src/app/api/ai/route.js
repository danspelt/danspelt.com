import { StreamingTextResponse, createStreamDataTransformer } from "ai";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { QA_TEMPLATE } from "../../../lib/prompt-templates";
import { getChunkedDocsFromPDF } from "../../../lib/pdf-loader";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const question = req.nextUrl.searchParams.get("question") || "Welcome to danspelt.com";
  console.log("question", question);
  const prompt = PromptTemplate.fromTemplate(QA_TEMPLATE);
  const formattedPreviousMessages = ["message1", "message2", "message3"];

  try {
    const model = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      model: "gpt-3.5-turbo",
      temperature: 0,
      streaming: true,
      verbose: true,
    });

    const parser = new HttpResponseOutputParser();

    const chain = RunnableSequence.from([
      {
        question: (input) => input.question,
        chat_history: (input) => input.chat_history,
        context: () => getChunkedDocsFromPDF(),
      },
      prompt,
      model,
      parser,
    ]);

    const stream = await chain.stream({
      chat_history: formattedPreviousMessages.join("\n"),
      question: question,
    });

    return new StreamingTextResponse(
      stream.pipeThrough(createStreamDataTransformer())
    );
  } catch (e) {
    console.error("Error occurred:", e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}