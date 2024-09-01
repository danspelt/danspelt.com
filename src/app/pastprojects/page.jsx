'use client';
import React, { useState } from "react";
import { useApp } from "@/hooks/useApp";
import pastProjectsData from "@/lib/PastProjects";
import ScreenShotSlideShow from "@/components/ScreenShotSlideShow";

const PreviousProjects = () => {
  const setCurrentProjectImages = useApp((state) => state.setCurrentProjectImages);
  const isScreenShotSlideShowVisible = useApp((state) => state.isScreenShotSlideShowVisible);
  const setIsScreenShotSlideShowVisible = useApp((state) => state.setIsScreenShotSlideShowVisible);
  const toggleVisibility = () => {
    setIsScreenShotSlideShowVisible(!isScreenShotSlideShowVisible);
  };
  const projectHoverHandler = (projectImages) => {
    console.log("projectImages", projectImages);
    setCurrentProjectImages(projectImages);
  };

  return (
    <div
     className="flex flex-col items-center bg-gray-100 mt-20"
     >
      {isScreenShotSlideShowVisible && <ScreenShotSlideShow />}
      {pastProjectsData.map((project) => (
        <div
          key={project.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden mb-6"
          onMouseEnter={() => projectHoverHandler(project.images)}
        >
          <div className="p-6 flex">
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold text-gray-800">{project.name} at {project.company}</h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <button
                onClick={() => toggleVisibility(project.id)}
                className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded-md ${project.images.length > 0 ? "" : "hidden"} ${isScreenShotSlideShowVisible ? "hidden" : ""}`}
              >
                Show Screenshots
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreviousProjects;
