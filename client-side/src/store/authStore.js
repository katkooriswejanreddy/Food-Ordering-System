import { create } from "zustand";

export const useAuth = create((set) => ({
  userId: localStorage.getItem("userId") || null,
  token: localStorage.getItem("token") || null,

  login: (id, token) => {
    localStorage.setItem("userId", id);
    localStorage.setItem("token", token);
    set({ userId: id, token });
  },

  logout: () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    set({ userId: null, token: null });
  },
}));
