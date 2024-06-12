import { useAITeacher } from "@/hooks/useAITeacher";
import { useEffect, useRef } from "react";

export const MessagesList = () => {
  const messages = useAITeacher((state) => state.messages);
  const playMessage = useAITeacher((state) => state.playMessage);
  const stopMessage = useAITeacher((state) => state.stopMessage);
  const boardTexts = useAITeacher((state) => state.boardTexts);
  const classroom = useAITeacher((state) => state.classroom);


  const container = useRef();

  useEffect(() => {
    container.current.scrollTo({
      top: container.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  

  return (
    <div
      className={`${
        classroom === "default"
          ? "w-[1288px] h-[676px]"
          : "w-[2528px] h-[856px]"
      } p-8 overflow-y-auto flex flex-col space-y-8 bg-black`}
      ref={container}
    >
      {messages.length === 0 && (
        <div className="h-full w-full grid place-content-center text-center bg-black/50">
          <h2 className="text-8xl font-bold text-white/90 italic">
            Dan Spelt
            <br />
            Full Stack Web Developer
          </h2>
          <h2 className="text-8xl font-bold text-white/90">
                Ai Chat Bot            
          </h2>

        </div>

      )}
      {boardTexts.length > 0 ? boardTexts.map((text, i) => (
        <div key={i} className="text-white/90 text-8xl h-full w-full">
          {text}
        </div>
      )) : null}
    </div>
  );


};
