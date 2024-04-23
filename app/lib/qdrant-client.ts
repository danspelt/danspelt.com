import { QdrantClient } from "@qdrant/js-client-rest";
import { env } from './config';
// Create a Qdrant client
export const getClient = () => {
  console.log('QDRANT_API_URL:', env.QDRANT_API_URL);
  console.log('QDRANT_API_KEY:', env.QDRANT_API_KEY);
  const client = new QdrantClient({
    url: env.QDRANT_API_URL,
    apiKey: env.QDRANT_API_KEY,
  });
  return client;
};
