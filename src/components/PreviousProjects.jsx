import React, { useState } from "react";
import { useApp } from "@/hooks/useApp";
import pastProjectsData from "@/lib/PastProjects";

const PreviousProjects = () => {
  const { isScreenShotSlideShowVisible, setIsScreenShotSlideShowVisible } = useApp();

  const toggleVisibility = () => {
    setIsScreenShotSlideShowVisible(!isScreenShotSlideShowVisible);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 mt-20">
      {pastProjectsData.map((project) => (
        <div
          key={project.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden mb-6"
        >
          <div className="p-6 flex">
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold text-gray-800">{project.name} at {project.company}</h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <button
                onClick={() => toggleVisibility(project.id)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                {isScreenShotSlideShowVisible ? "Hide Screenshots" : "Show Screenshots"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreviousProjects;
