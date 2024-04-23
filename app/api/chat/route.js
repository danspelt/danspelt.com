
import { promises as fs } from "fs";
import { exec } from "child_process";
import { NextResponse, NextRequest } from "next/server";
import { callChain } from "../../lib/langchain";
import { fetchDataFromCollection } from "../../lib/vector-store";

const formatMessage = (message) => {
  return `${message.role === "user" ? "User" : "Assistant"}: ${message.content}`;
};

const readJsonTranscript = async (file) => {
  const data = await fs.readFile(file, "utf8");
  return JSON.parse(data);
};

const audioFileToBase64 = async (file) => {
  const data = await fs.readFile(file);
  return data.toString("base64");
};


const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) reject(error);
      resolve(stdout);
    });
  });
};

const lipSyncMessage = async (message) => {
  const time = new Date().getTime();
  console.log(`Starting conversion for message ${message}`);
  await execCommand(
    `ffmpeg -y -i audios/message_${message}.mp3 audios/message_${message}.wav`
    // -y to overwrite the file
  );
  console.log(`Conversion done in ${new Date().getTime() - time}ms`);
  await execCommand(
    `rhubarb -f json -o audios/message_${message}.json audios/message_${message}.wav -r phonetic`
  );

  // -r phonetic is faster but less accurate
  console.log(`Lip sync done in ${new Date().getTime() - time}ms`);
};
export const POST = async (req) => {
  const body = await req.json();
  const messages = body.messages || [];
  console.log(`messages: ${messages}`);
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const question = messages[messages.length - 1].content;
  console.log(`chat history: ${formattedPreviousMessages.join("\n")}`);
  console.log(`user asking a question: ${question}`);
  const welcomeContent = "Welcome to the chatbot!";
  const welcomeAudio = await audioFileToBase64("audios/welcome.wav");
  const welcomeLipSync = await readJsonTranscript("audios/welcome.json");
  const welcomeFacialExpression = "smile";
  const welcomeAnimation = "Idle";
  const welcomeMessage = {
    role: "assistant",
    content: welcomeContent,
    audio: welcomeAudio,
    lipSync: welcomeLipSync,
    facialExpression: welcomeFacialExpression,
    animation: welcomeAnimation,
  };
  if (!question) {
    return NextResponse.json(welcomeMessage, { status: 200 });
  }
  try {
    const streamingTextResponse = await callChain({
      question,
      chatHistory: formattedPreviousMessages.join("\n"),
    });
    return streamingTextResponse;
  } catch (error) {
    console.error("Internal server error ", error);
    return NextResponse.json("Error: Something went wrong. Try again!", {
      status: 500,
    });
  }
};
export const GET = async (req) => {
  const data = await fetchDataFromCollection("test");
   return NextResponse.json(data, { status: 200 })
} 