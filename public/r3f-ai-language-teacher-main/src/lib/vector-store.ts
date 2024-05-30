import { env } from './config';
import { OpenAIEmbeddings } from '@langchain/openai';
import { QdrantVectorStore } from "@langchain/community/vectorstores/qdrant";
import { getClient } from './qdrant-client';

const sanitizeText = (text) => {
  return text.replace(/[^\w\s]/gi, ''); // Remove all non-alphanumeric characters except spaces
};

export const storeChunks = async (chunks: any, collectionName: string) => {
  const sanitizedChunks = chunks.map(chunk => ({
    ...chunk,
    text: sanitizeText(chunk.text)
  }));

  const vectorStore = await QdrantVectorStore.fromDocuments(
    sanitizedChunks,
    new OpenAIEmbeddings(),
    {
      url: env.QDRANT_API_URL,
      collectionName,
    }
  );

  console.log(`Vectors added successfully to the "${collectionName}" collection.`);
  const response = await vectorStore.similaritySearch(sanitizeText('Hello, how are you?'), 1);
  console.log(response);
};

export const getVectorStore = async () => {
  try {
    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      new OpenAIEmbeddings(),
      {
        url: env.QDRANT_API_URL,
        collectionName: "test",
      }
    );
    console.log("Vector store loaded successfully.");
    console.log(vectorStore);
    return vectorStore;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDataFromCollection = async (collectionName) => {
  try {
    const response = await getClient().getCollection(collectionName);
    console.log('Data fetched successfully:', response);
    return response;
  } catch (error) {
    console.error('Failed to fetch data:', error.message);
    return null;
  }
};