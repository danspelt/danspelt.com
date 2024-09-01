import create from "zustand";

export const useApp = create((set, get) => ({
  
  isScreenShotSlideShowVisible: false,
  currentProjectImages: [],
  setCurrentProjectImages: (currentProjectImages) => set({ currentProjectImages }),
  setIsScreenShotSlideShowVisible: (isScreenShotSlideShowVisible) => set({ isScreenShotSlideShowVisible }),
  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  textToSpeak: "",
  setTextToSpeak: (textToSpeak) => set({ textToSpeak }),
  audio: null,
  setAudio: (audio) => set({ audio }), 
  hoveredElement: null,
  setHoveredElement: (hoveredElement) => set({ hoveredElement }),
  playCurrentComponent: () => {
    const { currentComponent, setIsPlaying, setTextToSpeak, setAudio } = get();
    setIsPlaying(true);
    setTextToSpeak(currentComponent.props.text);
    setAudio(currentComponent.props.audio);
  }, 
}));
