import { env } from "./config";
import { OpenAIEmbeddings } from "@langchain/openai";
 import { QdrantVectorStore } from "@langchain/community/vectorstores/qdrant";
import { getClient } from "./qdrant-client";

const removeNewLines = (input) => {
  return input.replace(/\r?\n|\r/g, '');
};

export const storeChunks = async (chunks, collectionName) => {
  const sanitizedChunks = chunks.map(chunk => {
    return { ...chunk, content: removeNewLines(chunk.content) };
  });

  const vectorStore = await QdrantVectorStore.fromDocuments(
    sanitizedChunks,
    new OpenAIEmbeddings(),
    { url: env.QDRANT_API_URL, collectionName }
  );
  console.log(
    `Vectors added successfully to the "${collectionName}" collection.`
  );
  const response = await vectorStore.similaritySearch("Hello, how are you?", 1);
  console.log(response);
};

export const getVectorStore = async () => {
  try {
    const client = getClient();
    const collections = await client.getCollections();
    const collectionExists = collections.collections.some(
      (col) => col.name === "knowledge"
    );
    if (collectionExists) {
      console.log(
        "Collection 'knowledge' already exists. Loading existing collection."
      );
      const vectorStore = await QdrantVectorStore.fromExistingCollection(
        new OpenAIEmbeddings(),
        { url: env.QDRANT_API_URL, collectionName: "knowledge" }
      );
      console.log("Vector store loaded successfully.");
      console.log(vectorStore);
      return vectorStore;
    } else {
      console.log(
        "Collection 'knowledge' does not exist. Creating new collection."
      );

      // Creating a new collection with sanitized data if needed
      const initialDocuments = []; // You can add initial documents if needed, ensure they are sanitized
      const sanitizedInitialDocuments = initialDocuments.map(doc => {
        return { ...doc, content: removeNewLines(doc.content) };
      });

      const vectorStore = await QdrantVectorStore.fromDocuments(
        sanitizedInitialDocuments,
        new OpenAIEmbeddings(),
        { url: env.QDRANT_API_URL, collectionName: "knowledge" }
      );
      console.log("Vector store created successfully.");
      console.log(vectorStore);
      return vectorStore;
    }
  } catch (error) {
    console.error(error);
  }
};