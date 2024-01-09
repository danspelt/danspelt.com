"use client";
import { useContext, useEffect } from "react";
import { OsContext } from "../context/OsContext";
import HomeTools from "./home/page";
import DanCo from "./danco/page";
import ChatBotCanvas from "./ChatBotCanvas";
import TextToSpeech from "./TextToSpeech";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const Subpage = () => {
  const { subDashboardPage } = useContext(OsContext);
  const {
    transcript,
    listining,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
    if (listining) {
      console.log("Listening...");
    } else {
      console.log("Not listening...");
      SpeechRecognition.startListening({ continuous: true });
    }
  }, [listining]);
  return (
    <div className="h-screen w-screen">
      <DanCo />
      <div className="flex w-1/6 absolute right-0 bottom-0">
        
        <h1>{transcript}</h1>
      </div>
    </div>
  );
};

export default Subpage;
