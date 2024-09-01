import timelineElements from "../lib/timelineElements";

const WorkExperience = () => {

  return (
    <div className="flex flex-col justify-center items-center">
      {timelineElements.map((element) => {
        const color = `bg-${element.color}-500`;

        const icon =
          element.icon === "school" ? "/images/school.svg" : "/images/work.svg";
        return (
          <div
            key={element.id}
            className="flex"
          >
            <div className="flex flex-col w-full ">
            <div className="h-full">{element.startDate} - {element.endDate}</div>
              <div
                className={`${color} w-2 h-full opacity-30`}
              ></div>
              <img
                src={icon}
                alt="icon"
                className={`${color} w-3/4 h-3/4 p-1 rounded-lg z-20`}
              />
              <div
                className={`${color} h-2 w-8 translate-y-5 opacity-30`}
              ></div>
            </div>
            <div className="flex ">
              <div className="text-xl font-medium">{element.company}</div>
              <div className="text-gray-400 text-md">
                {element.location}
              </div>
              <div className="text-lg">{element.description}</div>
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
