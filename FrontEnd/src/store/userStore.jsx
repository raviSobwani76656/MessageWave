import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../API/axios";

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      isUserUpdating: false,
      onlineUsers: [],

      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setLoading: (loading) => set({ loading }),
      isLoggedIn: () => !!get().user,

      updateProfile: async (base64Image) => {
        set({ isUserUpdating: true });
        try {
          const userId = get().user?.id;
          const response = await axiosInstance.post(
            "/user/updateProfile",
            { profilePic: base64Image, id: userId },
            { withCredentials: true }
          );
          set({ user: response.data });
        } catch (error) {
          console.error("Error updating profile", error);
        } finally {
          set({ isUserUpdating: false });
        }
      },
    }),
    {
      name: "user-localstorage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
