import create from "zustand";

export const useApp = create((set) => ({
  isAiMode: false,
  setIsAiMode: (isAiMode) => set({ isAiMode }),
}));