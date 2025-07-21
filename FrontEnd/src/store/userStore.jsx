import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../API/axios";

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      isUserUpdating: false,

      setUser: (user) => set({ user }), // set user
      clearUser: () => set({ user: null }), // clear user
      setLoading: (loading) => set({ loading }), // set loading state

      isLoggedIn: () => !!get().user,

      updateProfile: async function () {
        set({ isUserUpdating: true });
        try {
          const response = await axiosInstance.put(
            "/user/updateProfile",
            { profilePic },

            {
              withCredentials: true,
            }
          );
          set({ user: response.data });
        } catch (error) {
          console.log("Error Updating Profile", error);
        } finally {
          set({ isUserUpdating: false });
        }
      },
    }),
    {
      name: "user-localstorage", // key for localStorage
      partialize: (state) => ({ user: state.user }), // only persist `user`
    }
  )
);
