import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const IntroVideo = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <video className="w-1/4" autoPlay >
        <source src="/videos/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button 
        onClick={handlePlayPause} 
        className="mt-4 p-2 bg-blue-500 rounded-full flex items-center justify-center"
      >
        {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
      </button>
    </div>
  );
};

export default IntroVideo;