import { StreamingTextResponse, createStreamDataTransformer } from "ai";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { HttpResponseOutputParser } from "langchain/output_parsers";

import { QA_TEMPLATE } from "../../lib/prompt-templates";
import { getChunkedDocsFromPDF } from "../../lib/pdf-loader";

export const dynamic = "force-dynamic";

export async function GET(req) {
  // WARNING: Do not expose your keys
  // WARNING: If you host publicly your project, add an authentication layer to limit the consumption of ChatGPT resources

  const speech = req.nextUrl.searchParams.get("speech") || "formal";
  const speechExample = speech === "formal" ? formalExample : casualExample;
  const prompt = PromptTemplate.fromTemplate(QA_TEMPLATE);
  try {
    const model = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      model: "gpt-3.5-turbo",
      temperature: 0,
      streaming: true,
      verbose: true,
    });
    /**
     * Chat models stream message chunks rather than bytes, so this
     * output parser handles serialization and encoding.
     */
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

    // Convert the response into a friendly text-stream
    const stream = await chain.stream({
      chat_history: formattedPreviousMessages.join("\n"),
      question: req.nextUrl.searchParams.get("question") || "Welcome to danspelt.com"
    });
    console.log(stream);
    // Respond with the stream
    return new StreamingTextResponse(
      stream.pipeThrough(createStreamDataTransformer())
    );
  } catch (e) {
    console.error("Error occurred:", e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a Japanese language teacher. 
Your student asks you how to say something from english to japanese.
You should respond with: 
- english: the english version ex: "Do you live in Japan?"
- japanese: the japanese translation in split into words ex: ${JSON.stringify(
          speechExample.japanese
        )}
- grammarBreakdown: an explanation of the grammar structure per sentence ex: ${JSON.stringify(
          speechExample.grammarBreakdown
        )}
`,
      },
      {
        role: "system",
        content: `You always respond with a JSON object with the following format: 
        {
          "english": "",
          "japanese": [{
            "word": "",
            "reading": ""
          }],
          "grammarBreakdown": [{
            "english": "",
            "japanese": [{
              "word": "",
              "reading": ""
            }],
            "chunks": [{
              "japanese": [{
                "word": "",
                "reading": ""
              }],
              "meaning": "",
              "grammar": ""
            }]
          }]
        }`,
      },
      {
        role: "user",
        content: `How to say ${
          req.nextUrl.searchParams.get("question") ||
          "Have you ever been to Japan?"
        } in Japanese in ${speech} speech?`,
      },
    ],
    // model: "gpt-4-turbo-preview", // https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo
    model: "gpt-3.5-turbo", // https://help.openai.com/en/articles/7102672-how-can-i-access-gpt-4
    response_format: {
      type: "json_object",
    },
  });
  console.log(chatCompletion.choices[0].message.content);
  return Response.json(JSON.parse(chatCompletion.choices[0].message.content));
}
