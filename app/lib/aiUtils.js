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

export const readJsonTranscript = async (messageId) => {
  const file = messageId === 'init' || messageId === 'processing' ? `${process.cwd()}/audios/${messageId}.json` : `${process.cwd()}/audios/${messageId}/${messageId}.json`;
  return new Promise(async (resolve, reject) => {
    try {
      const data = await fs.readFile(file, "utf8");
      resolve(JSON.parse(data));
    } catch (error) {
      reject(error);
    }
  });
};

export const audioFileToBase64 = async (messageId) => {
  const file = messageId === 'init' || messageId === 'processing' ? `${process.cwd()}/audios/${messageId}.mp3` : `${process.cwd()}/audios/${messageId}/${messageId}.mp3`;
  
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
      const dir = messageId === 'init' || messageId === 'processing' ? '' : `${messageId}/`;
      const fileName = messageId === 'init' || messageId === 'processing' ? `${messageId}` : `${messageId}/${messageId}`;
      await execCommand(
        `ffmpeg -y -i ${process.cwd()}/audios/${fileName}.mp3 ${process.cwd()}/audios/${fileName}.wav`
        // -y to overwrite the file
      );
      await execCommand(
        `rhubarb -f json -o ${process.cwd()}/audios/${fileName}.json ${process.cwd()}/audios/${fileName}.wav -r phonetic`
      );
      // -r phonetic is faster but less accurate
      resolve(`${process.cwd()}/audios/${fileName}.json`);
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
        const dir = messageId === 'init' || messageId === 'processing' ? '' : `${messageId}/`;
        await fs.mkdir(`${process.cwd()}/audios/${dir}`);
        const audio = await elevenLabsClient.generate({
          voice: "James",
          text: text,
          voiceId: env.ELEVEN_LABS_VOICE_ID,
        });
        const fileName = messageId === 'init' || messageId === 'processing' ? `audios/${messageId}.mp3` : `audios/${messageId}/${messageId}.mp3`;
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
    const deleteFilesInDirectory = async (directory) => {
      const files = await fs.readdir(directory, { withFileTypes: true });
      for (const file of files) {
        const fullPath = path.join(directory, file.name);
        if (file.isDirectory()) {
          await deleteFilesInDirectory(fullPath);
        } else if (file.name.startsWith('ai_')) {
          await fs.unlink(fullPath);
        }
      }
    };

    await deleteFilesInDirectory(process.cwd() + '/audios');
    console.log('All AI files deleted successfully.');
  } catch (error) {
    console.error('Error deleting AI files:', error);
  }
};
