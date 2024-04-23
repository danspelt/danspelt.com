import { QdrantClient } from "@qdrant/js-client-rest";
import { env } from './config';
// Create a Qdrant client
export const getClient = () => {
  const client = new QdrantClient({
    url: env.QDRANT_API_URL,
    apiKey: env.QDRANT_API_KEY,
  });
  return client;
};
