/**
 * The assistant runs only when it is explicitly switched on.
 *
 * Defaulting to off is deliberate: when the OpenAI key was revoked, every
 * request failed and visitors were shown a raw error. Off-by-default means a
 * missing or dead key produces an explanation and a way to reach Dan instead.
 *
 * Read at build time (NEXT_PUBLIC_*), so enabling it in Coolify needs the
 * "Available at Buildtime" option set on the variable.
 */
export const AI_CHAT_ENABLED = process.env.NEXT_PUBLIC_AI_CHAT_ENABLED === 'true';

/** Shown in place of the conversation, and returned by the API route. */
export const AI_CHAT_OFF_MESSAGE =
  "Dan's AI assistant is switched off at the moment. Dan reads and answers every message himself, so the contact form is the fastest way to reach him.";
