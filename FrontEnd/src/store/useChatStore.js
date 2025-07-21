import { create } from "zustand";
import { axiosInstance } from "../API/axios";
import User from "../../../BackEnd/models/User";

export const useChatStore = create((set) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isMessageLoading: true,
  isUsersLoading: true,
  isActive: false,

  getAllusers: async function () {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance("messages/user");
      set({ users: response.data });
    } catch (error) {
      console.log("error occrued", error);
      toast.error(error.data.messages);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async function () {
    set({ isMessageLoading: true });

    try {
      const response = await axiosInstance("/messages/getMessages");
      set({ message: response.data });
    } catch (error) {
      console.log("Error Ocurred", error);
    } finally {
      set({ isMessageLoading: false });
    }
  },
}));
