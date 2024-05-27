"use client";
import { createContext, useContext, useEffect, useState } from "react";
const ChatContext = createContext();

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
  useEffect(() => {
    setAnimation("Idle");
  }, []);

  const playAudio = async (message) => {
    if (!message.audioPlayer) {
      // Get TTS
      const audioRes = await fetch(`/api/tts?text=${message.content}`);
      const audio = await audioRes.blob();
      const visemes = JSON.parse(await audioRes.headers.get("visemes"));
      const audioUrl = URL.createObjectURL(audio);
      const audioPlayer = new Audio(audioUrl);

      setLipsync(visemes);
      message.audioPlayer = audioPlayer;
    }

    message.audioPlayer.currentTime = 0;
    message.audioPlayer.play();
  };

  const stopAudio = (message) => {
    message.audioPlayer.pause();
  };
  return (
    <ChatContext.Provider
      value={{
        acceptingFiles,
        setAcceptingFiles,
        talking,
        setTalking,
        standingArguing,
        setStandingArguing,
        rapping,
        setRapping,
        blink,
        setBlink,
        winkLeft,
        setWinkLeft,
        winkRight,
        setWinkRight,
        facialExpression,
        setFacialExpression,
        animation,
        setAnimation,
        playAudio,
        stopAudio,
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
