"use client";
import { createContext, useContext, useEffect, useState } from "react";
const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [acceptingFiles, setAcceptingFiles] = useState(false);
  const [talking, setTalking] = useState(false);
  const [standingArguing, setStandingArguing] = useState(false);
  const [rapping, setRapping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(null);
   const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
  };


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
