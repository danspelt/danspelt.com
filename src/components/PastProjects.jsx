import React from "react";
import pastProjectsData from "@/lib/PastProjects";
const PastProjects = () => {
    return (
        <div>
            {pastProjectsData.map((project) => (
                <div key={project.id} className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
                    <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-800">{project.name}</h3>
                        <p className="text-gray-600 mt-2">{project.description}</p>
                        <div className="mt-4 flex justify-between items-center">
                            <span className="text-gray-500">{project.company}</span>
                            <span className="text-gray-500">{project.dates}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PastProjects;