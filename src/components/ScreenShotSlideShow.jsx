"use client";
import { useState, useEffect } from "react";
import { useApp } from "@/hooks/useApp";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ScreenShotSlideShow = ({currentProjectImages}) => {
    const [imag]
    const [currentIndex, setCurrentIndex] = useState(0);
    const setIsScreenShotSlideShowVisible = useApp((state) => state.setIsScreenShotSlideShowVisible);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowLeft") {
                goToPrevious();
            }
            else if (event.key === "ArrowRight") {
                goToNext();
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
        const isLastSlide = currentIndex === currentProjectImages.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        };

    const closeSlideShow = () => {
        setIsScreenShotSlideShowVisible(false);
    };

    return (
        <div 
            className="w-full h-full bg-black bg-opacity-50 absolute top-0 left-0 z-50 flex items-center justify-center"
            onClick={closeSlideShow}
        >
            <div className="flex flex-col items-center justify-center w-10/12 h-10/12">
                <button
                    onClick={goToPrevious}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white text-black p-2 rounded-full ml-8"
                >
                    <FaArrowLeft className="text-6xl" />
                </button>
                <img
                    src={currentProjectImages[0]}
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
            </div>
        </div>
    );
};

export default ScreenShotSlideShow;
