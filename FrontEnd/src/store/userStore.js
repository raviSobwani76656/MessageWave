import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../API/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const Base_URL = "http://localhost:5001";

export const useUserStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      loading: false,
      isUserUpdating: false,
      onlineUsers: [],
      isLoggingIn: false,
      isSigningUp: false,
      socket: null,

      // Actions
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setLoading: (loading) => set({ loading }),
      isLoggedIn: () => !!get().user,

      createAccount: async (credentials) => {
        try {
          set({ isSigningUp: true });
          const res = await axiosInstance.post("/user/createUser", credentials);
          set({ user: res.data });
          toast.success("Account Creation Successful");
          return true;
        } catch (error) {
          console.log("Error creating account", error);
          toast.error(
            error.response?.data?.message || "Error creating account"
          );
          return false;
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

          const userData = res.data.user;
          console.log(userData);
          set({ user: res.data.user });
          get().connectSocket(); // Socket connects after login
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
        console.log("Logout clicked!"); // <- Add this
        try {
          set({ isLoggingIn: true });
          await axiosInstance.post(
            "/user/logout",
            {},
            { withCredentials: true }
          );
          console.log("Logout Response Received");
          if (get().socket?.connected) get().socket.disconnect();
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

      // ✅ Socket actions
      connectSocket: () => {
        const { user } = get();
        if (!user || get().socket?.connected) return;

        const socket = io(Base_URL, { query: { userId: user.id } });
        socket.connect();
        set({ socket });

        socket.on("getOnlineUsers", (userIds) => {
          console.log("Online users from socket:", userIds);
          set({ onlineUsers: userIds });
        });
      },

      disConnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
      },
    }),
    {
      name: "user-localstorage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
