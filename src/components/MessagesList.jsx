import { useEffect, useRef, useCallback, useMemo } from "react";
import { useAITeacher } from "@/hooks/useAITeacher";

export const MessagesList = () => {
  const messages = useAITeacher((state) => state.messages);
  const boardTexts = useAITeacher((state) => state.boardTexts);
  const classroom = useAITeacher((state) => state.classroom);
  const isWelcomeMessageBoard = useAITeacher((state) => state.isWelcomeMessageBoard);
  const currentWordIndex = useAITeacher((state) => state.currentWordIndex);

  const container = useRef(null);
  const currentWordRef = useRef(null);

  const scrollToCurrentWord = useCallback(() => {
    if (container.current && currentWordRef.current) {
      const containerRect = container.current.getBoundingClientRect();
      const wordRect = currentWordRef.current.getBoundingClientRect();

      // Calculate the offset to scroll to
      const offset = wordRect.top - containerRect.top - containerRect.height / 2;

      // Scroll the container
      container.current.scrollTo({
        top: container.current.scrollTop + offset,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    scrollToCurrentWord();
  }, [currentWordIndex, scrollToCurrentWord]);

  const highlightWords = useMemo(() => (text) => {
    const words = text.split(" ");
    return words.map((word, index) => (
      <span
        key={index}
        ref={index === currentWordIndex ? currentWordRef : null}
        className={index === currentWordIndex ? "text-red-500" : ""}
      >
        {word}{" "}
      </span>
    ));
  }, [currentWordIndex]);

  return (
    <main
      className={`${
        classroom === "default"
          ? "w-[1288px] h-[676px]"
          : "w-[2528px] h-[856px]"
      } p-8 overflow-y-auto flex flex-col space-y-8 bg-black`}
      ref={container}
    >
      {isWelcomeMessageBoard ? (
        <div className="h-full w-full grid place-content-center text-center bg-black/50">
          <h2 className="text-8xl font-bold text-white/90 italic">
            Dan Spelt
            <br />
            Full Stack Web Developer
          </h2>
          <h2 className="text-8xl font-bold text-white/90">Ai Chat Bot</h2>
        </div>
      ) : (
        boardTexts.map((text, i) => (
          <div key={i} className="text-white/90 text-6xl h-full w-full">
            {highlightWords(text)}
          </div>
        ))
      )}
    </main>
  );
};