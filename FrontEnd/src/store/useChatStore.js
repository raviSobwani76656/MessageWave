import React from "react";
import { create } from "zustand";
import { axiosInstance } from "../API/axios";
import toast from "react-hot-toast";
import { useUserStore } from "./userStore";

export const useUserChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUserLoading: true,
  isMessagesLoading: false,

  getUsers: async function () {
    set({ isUserLoading: true });

    try {
      const res = await axiosInstance("/user/getAllUsersForSidebar");
      set({ users: res.data.data });
    } catch (error) {
      console.log("error occrued", error);
      toast.error(error.response?.data?.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async function (selectedUser) {
    console.log("Calling getMessages with:", selectedUser);
    set({ isMessagesLoading: true });

    const { user } = useUserStore.getState();

    console.log("Fetching messages for:", {
      senderId: user?.id,
      receiverId: selectedUser,
    });

    try {
      const { user } = useUserStore.getState();

      const res = await axiosInstance("/message/getMessage", {
        params: {
          senderId: user.id,
          receiverId: selectedUser,
        },
      });
      set({ messages: res.data.data });
    } catch (error) {
      console.log("error occurred", error);
      toast.error(error.response?.data?.message || "Failed to fetch Messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessages: async function ({ senderId, receiverId, content, image }) {
    const { messages, selectedUser } = get();

    console.log("Sending message with:", {
      senderId,
      receiverId,
      content,
      image,
    });

    try {
      const messageData = {
        senderId,
        receiverId,
        content,
        image: image || null,
      };
      const res = await axiosInstance.post("message/sendMessage", messageData);
      set({ messages: [...messages, res.data.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to Send Messages");
      console.log("Error Occured", error);
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
