import { useAITeacher } from "@/hooks/useAITeacher";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";

export const QuickQuestion = () => {
  const askAI = useAITeacher((state) => state.askAI);
  const loading = useAITeacher((state) => state.loading);
  const isTalking = useAITeacher((state) => state.isTalking);
  const [selectedQuestion, setSelectedQuestion] = useState("");

  const quickQuestions = [
    "What is Dan Spelt's professional background?",
    "What projects has Dan Spelt worked on?",
    "What technologies does Dan Spelt specialize in?",
 //   "Can you tell me about Dan Spelt's education?",
   // "What are Dan Spelt's career achievements?"
  ];

  const ask = (question) => {
    askAI(question);
    setSelectedQuestion("");
  };

  return (
    <CSSTransition
      in={!loading && !isTalking}
      timeout={1000}
      classNames="right-0"
      unmountOnExit
    >
      <div className="z-10 max-w-[600px] flex flex-col space-y-6 bg-gradient-to-tr from-slate-300/30 via-gray-400/30 to-slate-600-400/30 p-4 backdrop-blur-md rounded-xl border border-slate-100/30 transition-all duration-1000 ease-in-out">
        <div>
          <h2 className="text-xl font-bold text-white">
            {isTalking ? "Asking AI..." : "Quick Questions about Dan Spelt"}
          </h2>
        </div>

        {loading || isTalking ? (
          <div className="flex items-center justify-center">
            <span className="relative flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex h-4 w-4 rounded-full bg-white"></span>
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                className="p-2 px-6 text-white bg-slate-100/20 rounded-full hover:bg-slate-100/30 transition-colors duration-300 ease-in-out"
                onClick={() => ask(question)}
              >
                {question}
              </button>
            ))}
          </div>
        )}
      </div>
    </CSSTransition>
  );
};
