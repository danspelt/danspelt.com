import { useAITeacher } from "@/hooks/useAITeacher";
import { useState } from "react";

export const QuickQuestion = () => {
  const askAI = useAITeacher((state) => state.askAI);
  const loading = useAITeacher((state) => state.loading);
  const isTalking = useAITeacher((state) => state.isTalking);
  const [selectedQuestion, setSelectedQuestion] = useState("");

  const quickQuestions = [
    "What is Dan Spelt's professional background?",
    "What projects has Dan Spelt worked on?",
    "What technologies does Dan Spelt specialize in?",
    "Can you tell me about Dan Spelt's education?",
    "What are Dan Spelt's career achievements?"
  ];

  const ask = (question) => {
    askAI(question);
    setSelectedQuestion("");
  };

  return (
    <div className="z-10 max-w-[600px] flex space-y-6 flex-col bg-gradient-to-tr from-slate-300/30 via-gray-400/30 to-slate-600-400/30 p-4 backdrop-blur-md rounded-xl border-slate-100/30 border">
      <div>
        <h2 className="text-white font-bold text-xl">
          {isTalking ? "Asking AI..." : "Quick Questions about Dan Spelt"}
        </h2>
      </div>

      {loading || isTalking ? (
        <div className="flex justify-center items-center">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
          </span>
        </div>
      ) : (
        <div className="gap-3 flex flex-col">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
                  className="bg-slate-100/20 p-2 px-6 rounded-full text-white hover:bg-slate-100/30 "
                onClick={() => ask(question)}
            >

              {question}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
