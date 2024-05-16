"use client";
import { createContext, useContext, useEffect, useState } from "react";
const ChatContext = createContext();
import {
  audioFileToBase64,
  readJsonTranscript,
} from "../lib/aiUtils";
export const ChatProvider = ({ children }) => {
  //ai hooks
  
  const [blink, setBlink] = useState(false);
  const [winkLeft, setWinkLeft] = useState(false);
  const [winkRight, setWinkRight] = useState(false);
  const [lipsync, setLipsync] = useState(null);
  const [facialExpression, setFacialExpression] = useState("");
  const [audio, setAudio] = useState("");
  const [animation, setAnimation] = useState("");
  const [acceptingFiles, setAcceptingFiles] = useState(false);
  const [talking, setTalking] = useState(false);
  const [standingArguing, setStandingArguing] = useState(false);
  const [rapping, setRapping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(null); 
  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
  };

  const processingMessage = () => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("processingMessage");
        const processingContent = "Processing your question please wait...";
        const processingAudio = await audioFileToBase64("processing");
        const processingLipSync = await readJsonTranscript("processing");
        setLipsync(processingLipSync);
        const processingFacialExpression = "smile";
        const processingAnimation = "Idle";

        const audio = new Audio("data:audio/mp3;base64," + processingAudio);
        audio.play();
        audio.onended = () => {
          onMessagePlayed();
          resolve();
        }; 
        setFacialExpression(processingFacialExpression);
        setAnimation(processingAnimation);
        setAudio(audio);
        setMessage(processingContent);
      } catch (error) {
        reject(error);
      }
    });
  };
  
  // welcome message on no input
  const welcomeMessage = () => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("welcomeMessage");
        const welcomeContent = "Welcome! My name is Pathfinder. Ask me anything about Dan Spelt's professional journey.";
        const welcomeAudio = await audioFileToBase64("init");
        const welcomeLipSync = await readJsonTranscript("init");
        setLipsync(welcomeLipSync);
        const welcomeFacialExpression = "smile";
        const welcomeAnimation = "Idle";

        const audio = new Audio("data:audio/mp3;base64," + welcomeAudio);
        audio.play();
        audio.onended = () => {
          onMessagePlayed();
          resolve();
        }; 
        setFacialExpression(welcomeFacialExpression);
        setAnimation(welcomeAnimation);
        setAudio(audio);
        setMessage(welcomeContent);
      } catch (error) {
        reject(error);
      }
    });
  };


  useEffect(() => {
    setAnimation("Idle");
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        message,
        setMessage,
        onMessagePlayed,
        acceptingFiles,
        setAcceptingFiles,
        talking,
        setTalking,
        standingArguing,
        setStandingArguing,
        rapping,
        setRapping,
        audio,
        setAudio,
        lipsync,
        setLipsync,
        blink,
        setBlink,
        winkLeft,
        setWinkLeft,
        winkRight,
        setWinkRight,
        facialExpression,
        setFacialExpression,
        audio,
        setAudio,
        animation,
        setAnimation,
        welcomeMessage,
        processingMessage
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
