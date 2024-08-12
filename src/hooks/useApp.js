import create from "zustand";

import Landing from "@/components/Landing";
import About from "@/components/About";
import WorkExperience from "@/components/WorkExperience";
import SkillsTools from "@/components/SkillsTools";
export const useApp = create((set, get) => ({
  components: [
    {
      name: "Landing",
      component: <Landing />,
    },
    {
      name: "About",
      component: <About />,
    },
    {
      name: "Skills & Tools",
      component: <SkillsTools />,
    },
    {
      name: "Work Experience",
      component: <WorkExperience />,
    },
  ],
  currentComponent: <Landing />,
  setCurrentComponent: (name) => {
    const component = get().components.find((comp) => comp.name === name);
    if (component) {
      set({ currentComponent: component.component });
    }
  },
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
