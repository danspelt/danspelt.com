import create from "zustand";

export const teachers = ["Clara", "Liam"];

export const useAITeacher = create((set, get) => ({
  messages: [],
  currentMessage: null,
  boardTexts: [],
  teacher: teachers[0],

  isTalking: false,

  setIsTalking: (isTalking) => {
    set(() => ({
      isTalking,
    }));
  },
  setBoardTexts: (boardTexts) => {
    set(() => ({
      boardTexts,

    }));
  },
  setTeacher: (teacher) => {

    set(() => ({
      teacher,
      messages: get().messages.map((message) => {
        message.audioPlayer = null; // New teacher, new Voice
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
  askAI: async (question) => {
    if (!question) {
      return;
    }
    set(() => ({
      isTalking: true,
    }));
    const message = {

      question,
      id: get().messages.length,
      response: '',
    };

    set(() => ({
      loading: true,
      currentMessage: message,
      messages: [...get().messages, message],
    }));

    // Ask AI
    try {
      const response = await fetch(`/api/ai?question=${encodeURIComponent(question)}`);
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let result = '';

      const regex = /0:"([^"]+)"/g; // Regex to match 0:"<content>"

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        let match;
        while ((match = regex.exec(chunk)) !== null) {
          result += match[1];
        }
        result = result.replace(/[^a-zA-Z0-9\s]/g, ''); // Remove non-alphanumeric characters
        // Update the response incrementally
        set((state) => ({
          messages: state.messages.map((m) => {
            if (m.id === message.id) {
              return { ...m, response: result };
            }
            return m;
          })
        }));
      }

      console.log("askAI", result);
      const updatedMessage = { ...message, response: result };
      set((state) => ({
        messages: state.messages.map((m) => (m.id === message.id ? updatedMessage : m)),
      }));
      get().playMessage(updatedMessage);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }

    set(() => ({
      loading: false,
      currentMessage: null,
    }));
  },
  playMessage: async (message) => {
    console.log("playMessage", message);
    set(() => ({
      currentMessage: message,
    }));

    if (!message.audioPlayer) {
      set(() => ({
        loading: true,
      }));

      // Get TTS
      console.log("getting tts", message)
      const audioRes = await fetch(`/api/tts?teacher=${get().teacher}&text=${encodeURIComponent(message.response)}`);
      const audio = await audioRes.blob();
      const visemes = audioRes.headers.get("visemes");
      const audioUrl = URL.createObjectURL(audio);
      const audioPlayer = new Audio(audioUrl);

      message.audioPlayer = audioPlayer;
      message.visemes = visemes;
      set(() => ({
        currentMessage: message,
      }));
      message.audioPlayer.onended = () => {
        set(() => ({
          currentMessage: null,
          isTalking: false,
        }));
      };


      set(() => ({
        loading: false,
        messages: get().messages.map((m) => {
          if (m.id === message.id) {
            return { ...m, audioPlayer, visemes };
          }
          return m;
        }),
      }));
    }

    if (message.audioPlayer) {
      message.audioPlayer.currentTime = 0;
      message.audioPlayer.play();
    }
  },
  stopMessage: (message) => {
    if (message.audioPlayer) {
      message.audioPlayer.pause();
      set(() => ({
        currentMessage: null,
      }));
    }
  },
}));
