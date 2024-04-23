export type ChatGPTAgent = "user" | "assistant";

export interface AiMessage {
  role: ChatGPTAgent;
  message: string;
  audio: string;
  lipsync: string;
  facialExpression: string;
  animation: string;
  sources?: string[];
}
