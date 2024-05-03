"use server";
import { promises as fs, createWriteStream } from "fs";
import { exec } from "child_process";
import { ElevenLabsClient, play } from "elevenlabs";
import { env } from "../lib/config";

const elevenLabsClient = new ElevenLabsClient({
  apiKey: env.ELEVEN_LABS_API_KEY
});

export const formatMessage = (message) => {
  return `${message.role === "user" ? "User" : "Assistant"}: ${
    message.content
  }`;
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

export const lipSyncMessage = async (message) => {
  return new Promise(async (resolve, reject) => {
    try {
      const time = new Date().getTime();
      await execCommand(
        `ffmpeg -y -i audios/message_${message}.mp3 audios/message_${message}.wav`
        // -y to overwrite the file
      );
      await execCommand(
        `rhubarb -f json -o audios/message_${message}.json audios/message_${message}.wav -r phonetic`
      );
      // -r phonetic is faster but less accurate
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const createMp3FromText = async (text) => {
  console.log('createMp3FromText', text)
  return new Promise(async (resolve, reject) => {
    try {
      const audio = await elevenLabsClient.generate({
        text: text, 
        voiceId: env.ELEVEN_LABS_VOICE_ID
      });
      const fileName = `audios/message_${text}.mp3`;
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
};

