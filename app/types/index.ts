export type ChatGPTAgent = "user" | "assistant";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  message: string;
  audio: string;
  lipsync: string;
  facialExpression: string;
  animation: string;
  sources?: string[];
}
