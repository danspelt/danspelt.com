import { env } from './config';
import { OpenAIEmbeddings } from '@langchain/openai';
import { QdrantVectorStore } from "@langchain/community/vectorstores/qdrant";

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
export const vectorStore = new QdrantVectorStore(
  new OpenAIEmbeddings(),
    {
    url: env.QDRANT_API_URL,
    collectionName: 'test',
  }
);
export const performSimilaritySearch = async (collectionName: string, queryText: string, topK: number) => {
  try {
    
    const results = await vectorStore.similaritySearch(queryText, topK); 
    console.log(`Search results for '${queryText}' in collection '${collectionName}':`, results);
    return results;
  } catch (error) {
    console.error("Failed to perform similarity search:", error);
    return null;
  }
};