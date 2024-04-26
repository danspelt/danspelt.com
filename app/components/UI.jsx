"use client";
import React, { useEffect } from "react";

import { useChat } from "ai/react";

export const UI = ({ hidden, ...props }) => {
  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({});

  useEffect(() => {
    setInput("Default message");
  }, []);

  useEffect(() => {
    if (input === "") {
      setInput("Default message");
    }
  }, [input]);

  if (hidden) return null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="w-full flex flex-col justify-center gap-4 bg-gray-200 ">
          {messages.map(
            ({ id, role, content, facialExpression, animation }, index) => (
              <div
                key={index}
                className={`p-4 max-w-screen-sm w-full mx-auto rounded-md bg-white bg-opacity-50 backdrop-blur-md pointer-events-auto`}
              >
                {content} {facialExpression} {animation}
              </div>
            )
          )}
        </div>
        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
          <form className="flex gap-2 w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input === "Default message" ? "" : input}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md"
              autoFocus
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-md"
            >
              Ask
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
