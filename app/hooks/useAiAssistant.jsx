import create from "zustand";

export const assistants = ["Nanami", "Naoki"];

export const useAiAssistant = create((set, get) => {

  return {
    assistant: assistants[0],
    setAssistant: (assistant) => {
      set(() => ({
        assistant,
        messages: get().messages.map((message) => {
          message.audioPlayer = null; // New assistant, new Voice
          return message;
        }),
      }));
    },
    classroom: "default",
    setClassroom: (classroom) => {
      set(() => ({
        classroom,
      }));
    },
    loading: false,
    furigana: true,
    setFurigana: (furigana) => {
      set(() => ({
        furigana,
      }));
    },
    english: true,
    setEnglish: (english) => {
      set(() => ({
        english,
      }));
    },
    speech: "formal",
    setSpeech: (speech) => {
      set(() => ({
        speech,
      }));
    },
    playMessage: async (message) => {
    },
    stopMessage: (message) => {
      message.audioPlayer.pause();
      set(() => ({
        currentMessage: null,
      }));
    },
  };
});
