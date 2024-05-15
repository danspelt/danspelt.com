"use client";
import { useChatContext } from "../hooks/useChatAi";
import { useEffect } from "react";
import { useChat } from "ai/react";
import {
  audioFileToBase64,
  createMp3FromText,
  mp3ToWavToJson,
  readJsonTranscript
} from "../lib/aiUtils";
import { useState } from "react";

// Main UI component using chat functionality
export const UI = ({ hidden }) => {

  const [isQuestionAsked, setIsQuestionAsked] = useState(false);

  const { setLipsync, setAudio, audio, welcomeMessage, onMessagePlayed, processingMessage } = useChatContext();

  const {
    input,
    handleInputChange,
    handleSubmit,
    isLoading
  } = useChat({
    onFinish: async (message) => {
      try {
        await createMp3FromText(message.content, message.id);
        await mp3ToWavToJson(message.id);
        const json = await readJsonTranscript(message.id);
        setLipsync(json);
        const base64 = await audioFileToBase64(message.id);
        const audio = new Audio(`data:audio/mp3;base64,${base64}`);
        audio.play();
        setAudio(audio);
        audio.onended = onMessagePlayed;
        setIsQuestionAsked(false);
      } catch (err) {
        console.error("Error processing message:", err);
      }
    }
  });
  useEffect(() => {
    let intervalId;
    if (isLoading) {
      const processMessage = async () => {
        if (!audio || audio.ended) {
          await processingMessage();
          console.log("loading");
        }
      };
      intervalId = setInterval(processMessage, 2000);
    } else {
      console.log("not loading");
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isLoading, audio]);

  const modifiedHandleSubmit = (event) => {
    event.preventDefault();
    setIsQuestionAsked(true);
    if (!input.trim()) {
      welcomeMessage().then(() => {
        setIsQuestionAsked(false);
      });
    } else {
      handleSubmit(event);
    }
  };

  if (hidden) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center p-4">
      <div className={`w-full max-w-screen-sm bg-gray-200 p-4 rounded-lg shadow-lg ${isQuestionAsked ? "opacity-0" : "opacity-100"}`}>
        <form className="flex gap-2 w-full" onSubmit={modifiedHandleSubmit}>
          <input
            type="text"
            value={input === "Default message" ? "" : input}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md"
            autoFocus
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            Ask
          </button>
        </form>
      </div>
    </div>
  );
};
