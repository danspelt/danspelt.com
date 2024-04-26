"use server";
import { promises as fs } from "fs";
import { exec } from "child_process";

export const formatMessage = (message) => {
  return `${message.role === "user" ? "User" : "Assistant"}: ${
    message.content
  }`;
};

export const readJsonTranscript = async (file) => {
  const data = await fs.readFile(file, "utf8");
  return JSON.parse(data);
};

export const audioFileToBase64 = async (file) => {
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

export const lipSyncMessage = async (message) => {
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
