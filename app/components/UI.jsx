"use client";
import React, { useEffect, useState } from "react";

import { useChat } from "ai/react";
import { useChatContext } from "../hooks/useChatAi";
import {
  audioFileToBase64,
  createMp3FromText,
  mp3ToWavToJson,
  readJsonTranscript
} from "../lib/aiUtils";

// Main UI component using chat functionality
export const UI = ({ hidden, ...props }) => {
  const {
    setLipsync,
  
    setAudio,  
    welcomeMessage,
    onMessagePlayed,
  } = useChatContext();

  // Destructuring properties from useChat hook
  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    onFinish: (message) => {
      console.log("message", message);
      //create mp3 from text
      createMp3FromText(message.content, message.id).then(async () => {
        //create json from mp3
        mp3ToWavToJson(message.id).then((jsonFile) => {
          //read json file
          readJsonTranscript(jsonFile).then(json => {
            setLipsync(json);
            audioFileToBase64(message.id).then((base64) => {
              const audio = new Audio("data:audio/mp3;base64," + base64);
              audio.play();
                
              setAudio(base64);
              audio.onended = onMessagePlayed;
            });
          });
        }).catch(err => {
          console.log("err", err);
        });
      });
    }
  });


  // Modified handleSubmit to include welcomeMessage call if input is empty
  const modifiedHandleSubmit = (event) => {
    event.preventDefault();
    if (!input.trim()) {
      welcomeMessage();
    }
    handleSubmit(event);
  };

  // Do not render the component if it is meant to be hidden
  if (hidden) return null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="w-full flex flex-col justify-center gap-4 bg-gray-200 ">
          {/* Mapping through messages to display each message */}
          {messages.map(
            ({ id, role, content, facialExpression, animation }, index) => (
              <div
                key={index}
                className={`p-4 max-w-screen-sm w-full mx-auto rounded-md bg-white bg-opacity-50 backdrop-blur-md pointer-events-auto`}
              >
                {content} {facialExpression} {animation}
              </div>
            )
          )}
        </div>
        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
          <form className="flex gap-2 w-full" onSubmit={modifiedHandleSubmit}>
            {/* Input field for user to type their message */}
            <input
              type="text"
              value={input === "Default message" ? "" : input}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md"
              autoFocus
            />
            {/* Submit button */}
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-md"
            >
              Ask
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
