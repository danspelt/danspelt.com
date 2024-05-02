"use server";
import { promises as fs, createWriteStream } from "fs";
import { exec } from "child_process";
import { ElevenLabsClient } from "elevenlabs";
import { env } from "../lib/config";
import { v4 as uuid } from "uuid";

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
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const createMp3FromText = async (text) => {
  return new Promise(async (resolve, reject) => {
    try {
      const client = new ElevenLabsClient({
        apiKey: env.ELEVEN_LABS_API_KEY,
      });
      const audio = await client.generate({
        voice: "Rachel",
        model_id: "eleven_turbo_v2",
        text,
      });
      const fileName = `${uuid()}.mp3`;
      const fileStream = createWriteStream(fileName);

      audio.pipe(fileStream);
      fileStream.on("finish", () => resolve(fileName)); // Resolve with the fileName
      fileStream.on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
};

