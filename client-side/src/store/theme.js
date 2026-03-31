import { create } from "zustand";

export const useThemeStore = create((set) => ({
  dark: false,
  toggleTheme: () =>
    set((state) => {
      const newTheme = !state.dark;
      document.documentElement.classList.toggle("dark", newTheme);
      return { dark: newTheme };
    }),
}));
