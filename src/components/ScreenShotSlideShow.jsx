"use client";
import { useState, useEffect } from "react";
import { useApp } from "@/hooks/useApp";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

const ScreenShotSlideShow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const setIsScreenShotSlideShowVisible = useApp((state) => state.setIsScreenShotSlideShowVisible);
    const currentProjectImages = useApp((state) => state.currentProjectImages);
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowLeft") {
                goToPrevious();
            }
            else if (event.key === "ArrowRight") {
                goToNext();
            }
            else if (event.key === "Escape") {
                closeSlideShow();
            }   
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [currentIndex]);

    useEffect(() => {
        console.log(currentProjectImages);
    }, [currentProjectImages]);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? currentProjectImages.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        console.log("currentProjectImages", currentProjectImages);
        const isLastSlide = currentIndex === currentProjectImages.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        };

    const closeSlideShow = () => {
        setIsScreenShotSlideShowVisible(false);
    };
    
    useEffect(() => {
        console.log(currentProjectImages[currentIndex]);
    }, [currentIndex]);

    return (
        <div 
            className="w-full h-full bg-black bg-opacity-50 absolute top-0 left-0 z-50 flex items-center justify-center"
        >
            <div className="flex flex-col items-center justify-center w-10/12 h-10/12">
                <button
                    onClick={goToPrevious}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white text-black p-2 rounded-full ml-8"
                >
                    <FaArrowLeft className="text-6xl" />
                </button>
                <img
                    src={currentProjectImages[currentIndex]}
                    alt={`Slide ${currentIndex}`}
                    className="w-9/12 h-9/12"
                />
                {
                  console.log(currentProjectImages)
                }
                <button
                    onClick={goToNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full mr-8"
                >
                    <FaArrowRight className="text-6xl" />
                </button>
                <button
                    onClick={closeSlideShow}
                    className="absolute top-0 right-0 mt-4 mr-4 bg-white text-black p-2 rounded-full"
                >
                    <FaTimes className="text-2xl" />
                </button>
            </div>
        </div>
    );
};

export default ScreenShotSlideShow;
