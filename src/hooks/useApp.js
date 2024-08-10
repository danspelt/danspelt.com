import create from "zustand";

import Landing from "@/components/Landing";
import About from "@/components/About";
import WorkExperience from "@/components/WorkExperience";
import SkillsTools from "@/components/SkillsTools";
export const useApp = create((set, get) => ({
  components: [
    {
      name: "landing",
      component: <Landing />,
    },
    {
      name: "about",
      component: <About />,
    },
    {
      name: "skillsTools",
      component: <SkillsTools />,
    },
    {
      name: "workExperience",
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
}));
