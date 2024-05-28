import { env } from './config';
import { OpenAIEmbeddings } from '@langchain/openai';
import { QdrantVectorStore } from "@langchain/community/vectorstores/qdrant";
import { getClient } from './qdrant-client';

export const storeChunks = async (chunks: any, collectionName: string) => {
  const vectorStore = await QdrantVectorStore.fromDocuments(
    chunks,
    new OpenAIEmbeddings(),
    {
      url: env.QDRANT_API_URL,
      collectionName,
      });
    
  console.log(`Vectors added successfully to the "${collectionName}" collection.`);
  const response = await vectorStore.similaritySearch('Hello, how are you?', 1);
  console.log(response);
  
} 
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