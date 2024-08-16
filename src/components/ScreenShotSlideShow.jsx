"use client";
import { useApp } from "@/hooks/useApp";
import { useState } from "react";
const ScreenShotSlideShow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const projectImages = useApp((state) => state.projectImages);
    const setScreenShotSlideShow = useApp((state) => state.setScreenShotSlideShow);
    const isScreenShotSlideShowVisible = useApp((state) => state.isScreenShotSlideShowVisible);



  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? projectImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === projectImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    };
    if (!isScreenShotSlideShowVisible) return; // if the slideshow is not visible, don't render the component

  return (
    <div className="fixed w-2/3 h-2/3 bg-black bg-opacity-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <div className="relative w-2/3 h-2/3 flex justify-center items-center">
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full"
        >
          &#9664;
        </button>
        <img
          src='/images/youneeq/1.png'
          alt={`Slide ${currentIndex}`}
          className="w-full h-full object-contain"
        />
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full"
        >
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default ScreenShotSlideShow;
