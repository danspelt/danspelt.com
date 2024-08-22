import { useEffect, useState, useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const IntroVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(error => {
        console.error("Error attempting to play the video:", error);
      });
      console.log("playing");
    }
    setIsPlaying(!isPlaying);
  };

useEffect(() => {
  handlePlayPause()
}, [])
cons

    const handleEnded = () => {
      setIsPlaying(false)
    }
  return (
    <div className="flex flex-col items-center justify-center text-white relative">
      <video ref={videoRef} className="w-1/4" onEnded={handleEnded}>
        <source src="/videos/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button
              onClick={handlePlayPause}
              className={!isPlaying ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 z-10' : 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 z-10 opacity-20'} 
      >
        
        {isPlaying ? <FaPause size={40} /> : <FaPlay size={40} />}
      </button>
    </div>
  );
};

export default IntroVideo;