import React from "react";
import { create } from "zustand";
import { axiosInstance } from "../API/axios";
import toast from "react-hot-toast";

export const useUserChatStore = create((set) => ({
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
      toast.error(error.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async function (selectedUser) {
    set({ isMessagesLoading: true });

    try {
      const res = await axiosInstance("/messages/getMessages");
      set({ messages: res.data.data });
    } catch (error) {
      console.log("error occurred", error);
      toast.error(error.response?.data?.message || "Failed to fetch Messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessages: async function (messageData) {
    const { messages, selectedUser } = get();
    try {
      const res = axiosInstance.post("users/sendMessage", messageData, {
        withCredentials: true,
      });
      set({ messages: [...messages, res.data] });
    } catch (error) {
    } finally {
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
