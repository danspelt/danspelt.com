"use client";
import { createContext, useContext, useEffect, useState } from "react";
const ChatContext = createContext();
import { formatMessage, audioFileToBase64, readJsonTranscript } from "../lib/aiUtils";
export const ChatProvider = ({ children }) => {

  //ai hooks
  const [lipsync, setLipsync] = useState();
  const [blink, setBlink] = useState(false);
  const [winkLeft, setWinkLeft] = useState(false);
  const [winkRight, setWinkRight] = useState(false);
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

  // welcome message on no input
  const welcomeMessage = () => {
    const welcomeContent = "Welcome to the chatbot!";
    const welcomeAudio = audioFileToBase64("audios/welcome.wav");
    const welcomeLipSync = readJsonTranscript("audios/welcome.json");
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
  } 

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
