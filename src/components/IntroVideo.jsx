'use client';

import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

const IntroVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((error) => {
        console.error("Error attempting to play the video:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border bg-black">
      <video
        ref={videoRef}
        className="w-full aspect-video"
        onEnded={handleEnded}
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button
        onClick={handlePlayPause}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        className={`absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-300 ${
          isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
        }`}
      >
        <div className="p-4 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg transition-transform hover:scale-110">
          {isPlaying ? (
            <Pause className="w-8 h-8 text-foreground" />
          ) : (
            <Play className="w-8 h-8 text-foreground ml-0.5" />
          )}
        </div>
      </button>
    </div>
  );
};

export default IntroVideo;
