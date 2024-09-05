'use client';
import timelineElements from "../../lib/timelineElements";
import { useApp } from "../../hooks/useApp";

const Timeline = () => {  
  const hoveredElement = useApp((state) => state.hoveredElement);
  const setHoveredElement = useApp((state) => state.setHoveredElement);

  return (
    <div className="flex flex-col items-center">
      {timelineElements.map((element, index) => {
        const color = `bg-${element.color}-500`;

        const icon =
          element.icon === "school" ? "/images/school.svg" : "/images/work.svg";
        return (
          <div key={element.id} className="flex flex-col items-center w-3/4 border-2 border-gray-300 pb-10 mb-10 justify-center hover:scale-105 transition-all  ">

            <div className="flex items-center w-full p-4">
              <div className="flex flex-col items-start w-full ml-4 items-center justify-center">
                <div className="text-xl font-medium">{element.company}</div>
                <div className="text-gray-400 text-md">
                  {element.position} | {element.location}
                </div>
                <div className="text-gray-400 text-md mb-2">
                  {element.startDate} - {element.endDate}
                </div>
                <div className="mb-4 text-left">{element.description}</div>
                <div className="flex flex-wrap mb-6">
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
                
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
