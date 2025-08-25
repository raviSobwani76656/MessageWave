import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../API/axios";
import toast from "react-hot-toast";

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      isUserUpdating: false,
      onlineUsers: [],
      isLoggingIn: false,
      isSigningUp: false,

      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setLoading: (loading) => set({ loading }),
      isLoggedIn: () => !!get().user,

      createAccount: async (credentials) => {
        try {
          set({ isSigningUp: true });
          const res = await axiosInstance.post("/user/createUser", credentials);
          set({ user: res.data });
          toast.success("Account Creation Successfull");
          return true;
        } catch (error) {
          console.log("Error Occrured while creating the Account", error);
          toast.error(error.response.data.message);
        } finally {
          set({ isSigningUp: false });
        }
      },

      login: async (credentials) => {
        try {
          set({ isLoggingIn: true });
          const res = await axiosInstance.post("/user/loginUser", credentials, {
            withCredentials: true,
          });
          set({ user: res.data });
          toast.success("Login Successful");
          return true;
        } catch (err) {
          console.log("Login error:", err);
          toast.error("Invalid Credentials");
          return false;
        } finally {
          set({ isLoggingIn: false });
        }
      },

      logout: async () => {
        try {
          set({ isLoggingIn: true });
          await axiosInstance.post(
            "/user/logout",
            {},
            { withCredentials: true }
          );
          set({ user: null });
          toast.success("Logout Successful");
        } catch (err) {
          console.log("Logout failed", err);
        } finally {
          set({ isLoggingIn: false });
        }
      },

      fetchLoggedInUser: async () => {
        try {
          const res = await axiosInstance.get("/user/getUser", {
            withCredentials: true,
          });
          set({ user: res.data.user });
        } catch (err) {
          set({ loading: false, user: null });
          console.log("Error fetching user", err);
        } finally {
          set({ loading: false });
        }
      },

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
        } catch (err) {
          console.error("Error updating profile", err);
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
