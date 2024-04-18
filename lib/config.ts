import z from 'zod';

const envSchema = z.object({
  OPENAI_API_KEY: z.string().trim().min(1), 
  QDRANT_API_KEY: z.string().trim().min(1),
  QDRANT_API_URL: z.string().trim().min(1),
  PDF_PATH: z.string().trim().min(1),
  ELEVEN_LABS_API_KEY: z.string().trim().min(1),
  INDEX_INIT_TIMEOUT: z.coerce.number().min(1),
});

export const env = envSchema.parse(process.env);
