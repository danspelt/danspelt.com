import create from "zustand";

import Landing from "@/components/Landing";
import About from "@/components/About";
import WorkExperience from "@/components/WorkExperience";
import SkillsTools from "@/components/SkillsTools";
import PreviousProjects from "@/components/PreviousProjects";
import ContactMe from "@/components/ContactMe";
export const useApp = create((set, get) => ({
  components: [
    {
      name: "Landing",
      component: <Landing />,
    },
    {
      name: "About Dan Spelt",
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
    {
      name: "Previous Projects",
      component: <PreviousProjects />,
    },
    {
      name: "Contact Me",
      component: <ContactMe />,
    },
  ],
  currentComponent: <PreviousProjects />,
  isScreenShotSlideShowVisible: true,
  
  currentProjectImages: [],
  setCurrentProjectImages: (currentProjectImages) => set({ currentProjectImages }),
  setIsScreenShotSlideShowVisible: (isScreenShotSlideShowVisible) => set({ isScreenShotSlideShowVisible }),
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
