import React, { useState } from "react";
import pastProjectsData from "@/lib/PastProjects";

const PreviousProjects = () => {
  const [visibleProjectId, setVisibleProjectId] = useState(null);

  const toggleVisibility = (projectId) => {
    setVisibleProjectId(visibleProjectId === projectId ? null : projectId);
  };

  return (
    <div>
      {pastProjectsData.map((project) => (
        <div
          key={project.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden mb-6"
        >
          <div className="p-6 flex">
            <div className="w-2/3">
              <h3 className="text-2xl font-bold text-gray-800">{project.name}</h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-gray-500">{project.company}</span>
                <span className="text-gray-500">{project.dates}</span>
              </div>
              <button
                onClick={() => toggleVisibility(project.id)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                {visibleProjectId === project.id ? "Hide Screenshots" : "Show Screenshots"}
              </button>
            </div>
            {visibleProjectId === project.id && (
              <div className="w-1/3 flex flex-col items-center">
                {project.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={project.name}
                    className="mb-2"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreviousProjects;
