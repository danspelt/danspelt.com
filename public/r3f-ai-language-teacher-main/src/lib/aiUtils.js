"use server";

export const getAssistantMessage = (message) => {
  return `${message.role === "user" ? null : "Assistant"}: ${message.content}`;
};

