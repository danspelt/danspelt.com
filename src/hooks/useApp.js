import create from "zustand";

import Landing from "@/components/Landing";
import About from "@/components/About";
import TimelineView from "@/components/TimelineView";
import SkillsTools from "@/components/SkillsTools";
import PreviousProjects from "@/components/PreviousProjects";
import ContactMe from "@/components/ContactMe";
import FAQ from "@/components/Faqs";
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
      name: "Timeline",
      component: <TimelineView />,
    },
    {
      name: "Previous Projects",
      component: <PreviousProjects />,
    },
    {
      name: "Contact Me",
      component: <ContactMe />,
    },
    {
      name: "FAQ",
      component: <FAQ />,
    },
  ],
  currentComponent: <WorkExperience />,
  isScreenShotSlideShowVisible: false,
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
