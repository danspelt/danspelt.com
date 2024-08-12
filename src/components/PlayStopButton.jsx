import React, { useState } from "react";
import { FaPlay, FaStop } from "react-icons/fa";

const PlayStopButton = ({ element }) => {
 
  if (!element) return null;
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);

  const handlePlay = async () => {
    setIsPlaying(true);
    console.log(element.description);
    const audioRes = await fetch(`/api/tts?teacher=Liam&text=${element.description}`);

    const wordTimings = JSON.parse(audioRes.headers.get("wordTimings"));
    const audio = await audioRes.blob();
    const audioUrl = URL.createObjectURL(audio);
    const newAudioPlayer = new Audio(audioUrl);

    // Sync with word timings
    newAudioPlayer.ontimeupdate = () => {
      const currentTime = newAudioPlayer.currentTime * 1000; // Convert to ms
      const timings = get().wordTimings;
      let currentIndex = 0;

      while (
        currentIndex < timings.length &&
        currentTime >= timings[currentIndex].offset
      ) {
        currentIndex++;
      }

        
    };

    newAudioPlayer.onended = () => {
      console.log("Audio ended");
      setIsPlaying(false);
    };

    newAudioPlayer.onerror = () => {
      console.error("Failed to load audio source.");
      setIsPlaying(false);
    };

    setAudioPlayer(newAudioPlayer);
    newAudioPlayer.play();
  };

  const handleStop = () => {
    setIsPlaying(false);
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }
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
        disabled={isPlaying}
      >
        <FaPlay />
      </button>
    </div>
  );
};

export default PlayStopButton;
