import fs from "fs/promises";
import { exec } from "child_process";
import OpenAI from "openai";
import ElevenLabs from "elevenlabs-node";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.PUBLIC_NEXT_OPEN_AI_API_KEY || "-",
});

const elevenLabsApiKey = process.env.PUBLIC_NEXT_ELEVEN_LABS_API_KEY;

const voice = new ElevenLabs({
  apiKey: elevenLabsApiKey,
});

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
  const { message } = body;
  const userMessage = message === "" ? null : message;
  if (userMessage !== null) {
    return NextResponse.json(
      {
        messages: [
          {
            text:
              "Hey welcome to Dan Spelt's website! I'm Dan's virtual assistant. How can I help you today?",
            audio: await audioFileToBase64("audios/welcome.wav"),
            lipsync: await readJsonTranscript("audios/welcome.json"),
            facialExpression: "smile",
            animation: "Idle"
          },
          {
            text:
              "I'm here to help you with any questions you may have about Dan's work, projects, or anything else you'd like to know. Just ask me anything!",
            audio: await audioFileToBase64("audios/intro.wav"),
            lipsync: await readJsonTranscript("audios/intro.json"),
            facialExpression: "smile",
            animation: "Idle",
          },
        ],
      },
      { status: 200 }
    );
  }
  if (!elevenLabsApiKey || openai.apiKey === "-") {
    return NextResponse.json(
      {
        messages: [
          {
            text: "Sorry, I'm not available right now. Please try again later!",
            audio: await audioFileToBase64("audios/error_0.wav"),
            lipsync: await readJsonTranscript("audios/error_0.json"),
            facialExpression: "sad",
            animation: "Crying",
          },
        ],
      },
      { status: 200 }
    );
  }
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    max_tokens: 1000,
    temperature: 0.6,
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "system",
        content: `
        You are a virtual assistant for Dan Spelt's website.
        You will always reply with a JSON array of messages. With a maximum of 3 messages.
        Each message has a text, facialExpression, and animation property.
        The different facial expressions are: smile, sad, angry, surprised, funnyFace, and default.
        The different animations are: Talking_0, Talking_1, Talking_2, Crying, Laughing, Rumba, Idle, Terrified, and Angry. 
        `,
      },
      {
        role: "user",
        content: userMessage || "Hello",
      },
    ],
  });
  let messages = JSON.parse(completion.choices[0].message.content);
  if (messages.messages) {
    messages = messages.messages; // ChatGPT is not 100% reliable, sometimes it directly returns an array and sometimes a JSON object with a messages property
  }
  for (let i = 0; i < messages.length; i++) {
    console.log(`Processing message ${i}`);
    const message = messages[i];
    // generate audio file
    const fileName = `audios/message_${i}.mp3`; // The name of your audio file
    const textInput = message.text; // The text you wish to convert to speech
  
    await voice.textToSpeech({ textInput, fileName });
    // generate lipsync
    await lipSyncMessage(i);
    message.audio = await audioFileToBase64(fileName);
    message.lipsync = await readJsonTranscript(`audios/message_${i}.json`);
  }
  return NextResponse.json({ message: messages }, { status: 200 });
};

const readJsonTranscript = async (file) => {
  const data = await fs.readFile(file, "utf8");
  return JSON.parse(data);
};

const audioFileToBase64 = async (file) => {
  const data = await fs.readFile(file);
  return data.toString("base64");
};