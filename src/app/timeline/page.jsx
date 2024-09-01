'use client';
import timelineElements from "../../lib/timelineElements";
import { useApp } from "../../hooks/useApp";

const WorkExperience = () => {
  const hoveredElement = useApp((state) => state.hoveredElement);
  const setHoveredElement = useApp((state) => state.setHoveredElement);

  return (
    <div className="flex flex-col absolute top-0">
      {timelineElements.map((element) => {
        const color = `bg-${element.color}-500`;

        const icon =
          element.icon === "school" ? "/images/school.svg" : "/images/work.svg";
        return (
          <div
            key={element.id}
            className="flex m-4"
            onMouseEnter={() => setHoveredElement(element)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <div
              className={`${color} w-1 h-6 translate-x-20 translate-y-56 opacity-60 sm:hidden`}
            ></div>
            <div
              className={`${color} w-1 h-6 translate-x-80 translate-y-56 opacity-60 sm:hidden`}
            ></div>
            <div className="hidden items-start text-xl relative sm:flex">
              <div className="w-4/5 text-gray-500">{element.date}</div>
              <div
                className={`${color} w-1 h-full translate-x-5 translate-y-10 opacity-30`}
              ></div>
              <img
                src={icon}
                alt="icon"
                className={`${color} w-10 p-1 rounded-lg z-20`}
              />
              <div
                className={`${color} h-1 w-8 translate-y-5 opacity-30`}
              ></div>
            </div>
            <div className="border border-gray-600 rounded-lg px-8 py-4 relative">
              <div className="text-xl font-medium">{element.title}</div>
              <div className="text-gray-400 text-md">
                {element.location}
                <span className="sm:hidden">| {element.date}</span>
              </div>
              <div className="mb-4 text-left">{element.description}</div>
              <div className="flex flex-wrap mb-6 justify-center">
                {element.tech.map((tech, index) => {
                  return (
                    <span
                      key={index}
                      className="bg-gray-900 rounded-xl text-white px-2 py-1 text-md m-1 hover:scale-105 transition-all"
                    >
                      {tech}
                    </span>
                  );
                })}
              </div>
              <img
                src={
                  element.icon === "school"
                    ? "/images/school.svg"
                    : "/images/work.svg"
                }
                alt="icon"
                className={`${color} w-8 p-1 rounded-lg z-20 absolute left-4 top-4 sm:hidden`}
              />
              <a
                className={`${color} text-gray-950 font-medium px-4 py-1 rounded-md mx-auto cursor-pointer hover:text-white`}
              >
                {element.buttonText}
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorkExperience;
