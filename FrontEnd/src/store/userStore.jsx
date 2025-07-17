import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: false,

      setUser: (user) => set({ user }), // set user
      clearUser: () => set({ user: null }), // clear user
      setLoading: (loading) => set({ loading }), // set loading state

      isLoggedIn: () => !!get().user,
    }),
    {
      name: "user-localstorage", // key for localStorage
      partialize: (state) => ({ user: state.user }), // only persist `user`
    }
  )
);
