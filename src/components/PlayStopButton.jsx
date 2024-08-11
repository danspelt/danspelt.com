import React, { useState } from "react";
import { FaPlay, FaStop } from "react-icons/fa";

const PlayStopButton = ({ element }) => {
  const { company, startDate, endDate, tech, description } = element;
  
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    setIsPlaying(true);
    console.log(textToSpeak);
    const response = await fetch(`/api/tts?text=${textToSpeak}`); 
    const audioUrl = URL.createObjectURL(await response.blob());
    const audio = new Audio(audioUrl);
    audio.play();
    audio.onended = () => setIsPlaying(false);
  };



  const handleStop = () => {
    setIsPlaying(false);
    // Logic to stop the audio if needed
  };

  return (
    <div className="absolute bottom-4 right-4 flex space-x-2">
      <button
        className="bg-red-500 text-white p-2 rounded-full"
        onClick={handleStop}
        disabled={!isPlaying}
      >
        <FaStop />
      </button>
      <button
        className="bg-green-500 text-white p-2 rounded-full"
        onClick={handlePlay}
        
      >
        <FaPlay />
      </button>
    </div>
  );
};

export default PlayStopButton;
