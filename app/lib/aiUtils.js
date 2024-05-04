"use server";
import { promises as fs, createWriteStream } from "fs";
import { exec } from "child_process";
import { ElevenLabsClient, play } from "elevenlabs";
import { env } from "../lib/config";

const elevenLabsClient = new ElevenLabsClient({
  apiKey: env.ELEVEN_LABS_API_KEY,
});

export const getAssistantMessage = (message) => {
  return `${message.role === "user" ? null : "Assistant"}: ${message.content}`;
};

export const readJsonTranscript = async (file) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await fs.readFile(file, "utf8");
      resolve(JSON.parse(data));
    } catch (error) {
      reject(error);
    }
  });
};

export const audioFileToBase64 = async (file) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await fs.readFile(file);
      resolve(data.toString("base64"));
    } catch (error) {
      reject(error);
    }
  });
};

const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) reject(error);
      resolve(stdout);
    });
  });
};

export const mp3ToWavToJson = async (messageId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await execCommand(
        `ffmpeg -y -i ${process.cwd()}/audios/ai_${messageId}.mp3 ${process.cwd()}/audios/ai_${messageId}.wav`
        // -y to overwrite the file
      );
      await execCommand(
        `rhubarb -f json -o ${process.cwd()}/audios/ai_${messageId}.json ${process.cwd()}/audios/ai_${messageId}.wav -r phonetic`
      );
      // -r phonetic is faster but less accurate
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const createMp3FromText = async (text, messageId) => {
  console.log("createMp3FromText", text);
  if (text && messageId) {
    return new Promise(async (resolve, reject) => {
      try {
        const audio = await elevenLabsClient.generate({
          voice: "James",
          text: text,
          voiceId: env.ELEVEN_LABS_VOICE_ID,
        });
        const fileName = `audios/ai_${messageId}.mp3`;
        const fileStream = createWriteStream(fileName);

        audio.pipe(fileStream);
        fileStream.on("finish", () => {
          resolve(fileName);
        });
        fileStream.on("error", (error) => {
          reject(error);
        });
      } catch (error) {
        console.error("Error in createMp3FromText:", error);
        reject(error);
      }
    });
  }
};

export const deleteAllAiFiles = async () => {
  try {
    const files = await fs.readdir(process.cwd() + '/audios');
    const aiFiles = files.filter(file => file.startsWith('ai_'));
    for (const file of aiFiles) {
      await fs.unlink(process.cwd() + '/audios/' + file);
    }
    console.log('All AI files deleted successfully.');
  } catch (error) {
    console.error('Error deleting AI files:', error);
  }
};
