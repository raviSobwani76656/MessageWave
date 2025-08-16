import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",
  setTheme: (theme) => {
    console.log("Theme changed to:", theme);
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
