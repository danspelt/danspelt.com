import {
  StreamingTextResponse,
  createStreamDataTransformer
} from 'ai';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables'
import { formatDocumentsAsString } from 'langchain/util/document';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { HttpResponseOutputParser } from 'langchain/output_parsers';

import { QA_TEMPLATE } from '../../lib/prompt-templates';
import { getChunkedDocsFromPDF } from '../../lib/pdf-loader';


export const dynamic = 'force-dynamic'

/**
* Basic memory formatter that stringifies and passes
* message history directly into the model.
*/
const formatMessage = (message) => {
  console.log('formatMessage', message);
  return `${message.role}: ${message.content}`;
};

export async function POST(req) {
  try {
      // Extract the `messages` from the body of the request
      const { messages } = await req.json();

      const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);

      const currentMessageContent = messages[messages.length - 1].content;
    

      const prompt = PromptTemplate.fromTemplate(QA_TEMPLATE);

      const model = new ChatOpenAI({
          apiKey: process.env.OPENAI_API_KEY,
          model: 'gpt-3.5-turbo',
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
              context: () => getChunkedDocsFromPDF()  
          },
          prompt,
          model,
          parser,
      ]);

      // Convert the response into a friendly text-stream
      const stream = await chain.stream({
          chat_history: formattedPreviousMessages.join('\n'),
          question: currentMessageContent,
      });
      console.log(stream);
      // Respond with the stream
      return new StreamingTextResponse(
          stream.pipeThrough(createStreamDataTransformer()),
      );
  } catch (e) {
      console.error('Error occurred:', e);
      return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}