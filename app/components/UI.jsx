"use client";
import React, { useEffect } from "react";
import { useChat } from "ai/react";

export const UI = ({ hidden, ...props }) => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    
  });

  if (hidden) {
    return nul;
  }
  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="w-full flex flex-col justify-center gap-4 bg-gray-200 ">
          {messages.map(({ id, role, content, facialExpression, animation }, index) => (
            <div
              key={index}
              className={`p-4 max-w-screen-sm w-full mx-auto rounded-md bg-white bg-opacity-50 backdrop-blur-md pointer-events-auto`}
            >
              {content} {facialExpression} {animation}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
          <form onSubmit={handleSubmit}>
            <input
              className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md"
              placeholder="Ask me anything about my resume"
              value={input}
              onChange={handleInputChange}
              autoFocus
            />
            <button
              className={`bg-yellow-600 hover:bg-yellow-800 text-white p-4 px-10 font-semibold uppercase rounded-md`}
            >
              Ask
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
