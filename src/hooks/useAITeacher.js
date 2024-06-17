import create from "zustand";

export const teachers = ["Clara", "Liam"];

export const useAITeacher = create((set, get) => ({
  messages: [],
  currentMessage: null,
  boardTexts: [],
  teacher: teachers[0],
  isTalking: false,
  isWelcomeMessageBoard: true,
  wordTimings: [],
  currentWordIndex: 0,
  classroom: "default",
  setClassroom: (classroom) => {
    set(() => ({
      classroom,
    }));
  },
  setIsWelcomeMessageBoard: (isWelcomeMessageBoard) => {
    set(() => ({
      isWelcomeMessageBoard,
    }));
  },
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
  setClassroom: (classroom) => {
    set(() => ({
      classroom,
    }));
  },
  setWordTimings: (wordTimings) => set({ wordTimings }),
  setCurrentWordIndex: (index) => set({ currentWordIndex: index }),
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
        result = result.replace(/[^a-zA-Z0-9\s]/g, ' '); // Remove non-alphanumeric characters
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
      boardTexts: [...get().boardTexts, message.response],
      isTalking: true,
      isWelcomeMessageBoard: false,
    }));
    if (!message.audioPlayer) {
      set(() => ({
        loading: true,
      }));

      // Get TTS
      const audioRes = await fetch(`/api/tts?teacher=${get().teacher}&text=${encodeURIComponent(message.response)}`);
      const wordTimings = JSON.parse(audioRes.headers.get("wordTimings"));
      const audio = await audioRes.blob();
      const audioUrl = URL.createObjectURL(audio);
      const audioPlayer = new Audio(audioUrl);

      set({ wordTimings, currentWordIndex: 0 });
      message.audioPlayer = audioPlayer;

      // Sync with word timings
      audioPlayer.ontimeupdate = () => {
        const currentTime = audioPlayer.currentTime * 1000; // Convert to ms
        const timings = get().wordTimings;
        let currentIndex = 0;
  
        while (currentIndex < timings.length && currentTime >= timings[currentIndex].offset) {
          currentIndex++;
        }
        set({ currentWordIndex: currentIndex - 1 });
      };

      audioPlayer.onended = () => {
        set({ currentWordIndex: 0, currentMessage: null, isTalking: false, isWelcomeMessageBoard: true });
      };

      audioPlayer.play();
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
