import create from "zustand";

export const useApp = create((set) => ({
  currentPage: "about",
  setCurrentPage: (currentPage) => set({ currentPage }),
}));