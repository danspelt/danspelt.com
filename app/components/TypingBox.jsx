import { useChat } from "ai/react";
import { useChatContext } from "../hooks/useChatAi";

export const TypingBox = () => {
  const { playAudio, stopAudio } = useChatContext();
  const { messages, input, handleInputChange, handleSubmit, loading } = useChat(
    {
      api: "/api/chat",
      onFinish: (data) => {
        if (data.role === "assistant") {
          playAudio(data);
        }
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  return (
    <div className="flex flex-col bg-blue-500">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-3xl mx-auto items-center"
      >
        <input
          className="flex-1 min-h-[40px]"
          placeholder="Type your question here..."
          type="text"
          autoFocus
          value={input}
          onChange={handleInputChange}
        />
        <button className="ml-2" type="submit">
          Ask
        </button>
      </form>
    </div>
  );
};
