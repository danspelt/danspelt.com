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
  loading: false,

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

  setWordTimings: (wordTimings) => set({ wordTimings }),

  setCurrentWordIndex: (index) => set({ currentWordIndex: index }),

  askAI: async (question) => {
    if (!question) return;

    set(() => ({ isTalking: true, loading: true }));

    const message = {
      question,
      id: get().messages.length,
      response: '',
    };

    set(() => ({
      currentMessage: message,
      messages: [...get().messages, message],
    }));

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
        console.log(result);

        // Clean the result
        result = result.replace(/[^a-zA-Z0-9\s]/g, ' ')  // Remove non-alphanumeric characters except spaces
                       .replace(/\n/g, ' ')              // Replace newlines with spaces
                       .replace(/\sn/gm, ' ')           // Replace 'n' with a space
                       .replace(/\s+/g, ' ')             // Replace multiple spaces with a single space
                       .replace(/\.?\s*(projects)\s/gi, '. Projects: ') // Format starting point for projects
                       .replace(/ led /gi, ' Led ')    // Capitalize 'led'
                       .replace(/ managed /gi, ' Managed ')  // Capitalize 'managed'
                       .replace(/ conducted /gi, ' Conducted ') // Capitalize 'conducted'
                       .replace(/ maintained /gi, ' Maintained ') // Capitalize 'maintained'
                       .replace(/ created /gi, ' Created ') // Capitalize 'created'
                       .replace(/ optimized /gi, ' Optimized ') // Capitalize 'optimized'
                       .replace(/ C /gi, '') //Remove 'C'
                       .replace(/Skillful| Expert |Novice/gi, (match) => `${match},`) // Replace 'Skillful', 'Expert', and 'Novice' with the skill followed by a comma
                       .replace(/JavaScript|Python|Java|Next js|Kotlin|TypeScript|PHP|SQL|AWS|Github/gi, (match) => `${match},`) // Replace programming languages with a comma                                          .trim(); // Trim any leading/trailing spaces
        // Update the response incrementally
        set((state) => ({
          messages: state.messages.map((m) => {
            if (m.id === message.id) {
              return { ...m, response: result };
            }
            return m;
         }),
        }));
      }

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
    set(() => ({
      currentMessage: message,
      boardTexts: [...get().boardTexts, message.response],
      isTalking: true,
      isWelcomeMessageBoard: false,
    }));

    if (!message.audioPlayer) {
      set(() => ({ loading: true }));

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