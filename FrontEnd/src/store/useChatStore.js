import React from "react";
import { create } from "zustand";
import { axiosInstance } from "../API/axios";
import toast from "react-hot-toast";
import { useUserStore } from "./userStore";

export const useUserChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  // Fetch all users for the sidebar
  getUsers: async function () {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance("/user/getAllUsersForSidebar");
      set({ users: res.data.data });
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUserLoading: false });
    }
  },

  // Fetch messages between logged-in user and selected user
  getMessages: async function (selectedUserId) {
    const { user } = useUserStore.getState();

    if (!user?.id) {
      toast.error("You must be logged in to fetch messages");
      return;
    }

    if (!selectedUserId) {
      toast.error("Please select a user to fetch messages");
      return;
    }

    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance("/message/getMessage", {
        params: {
          senderId: user.id,
          receiverId: selectedUserId,
        },
      });
      set({ messages: res.data.data });
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Send a message from logged-in user to selected user
  sendMessages: async function ({ content, image }) {
    const { messages, selectedUser } = get();
    const { user } = useUserStore.getState();

    if (!user?.id) {
      toast.error("You must be logged in to send messages");
      return;
    }

    if (!selectedUser?.id) {
      toast.error("Please select a user to send message");
      return;
    }

    if (!content && !image) {
      toast.error("Cannot send empty message");
      return;
    }

    try {
      const messageData = {
        senderId: user.id,
        receiverId: selectedUser.id,
        content,
        image: image || null,
      };

      const res = await axiosInstance.post("/message/sendMessage", messageData);
      set({ messages: [...messages, res.data.data] });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useUserStore.getState().socket;

    if (!socket) {
      console.warn("Socket not connected yet, cannot subscribe to messages");
      return;
    }

    socket.on("newMessage", (newMessage) => {
      set((state) => ({ messages: [...state.messages, newMessage] }));
    });
  },

  unSubscribeFromMessages: () => {
    const socket = useUserStore.getState().socket;
    socket?.off("newMessage");
  },

  clearChat: () => set({ users: [], messages: [], selectedUser: null }),

  // Select a user to chat with
  setSelectedUser: (selectedUser) => {
    set({ selectedUser, messages: [] });
    if (selectedUser?.id) {
      get().getMessages(selectedUser.id);
    }
  },
}));
