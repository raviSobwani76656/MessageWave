// import { create } from "zustand";
// import { axiosInstance } from "../API/axios";
// import User from "../../../BackEnd/models/User";

// export const useChatStore = create((set) => ({
//   users: [],
//   messages: [],
//   selectedUser: null,
//   isMessageLoading: true,
//   isUsersLoading: true,

//   getAllusers: async function () {
//     set({ isUsersLoading: true });
//     try {
//       const response = await axiosInstance("messages/user");
//       set({ users: response.data });
//     } catch (error) {
//       console.log("error occrued", error);
//       toast.error(error.data.messages);
//     } finally {
//       set({ isUsersLoading: false });
//     }
//   },

//   getMessages: async function () {
//     set({ isMessageLoading: true });

//     try {
//       const response = await axiosInstance("/messages/getMessages");
//       set({ message: response.data });
//     } catch (error) {
//       console.log("Error Ocurred", error);
//     } finally {
//       set({ isMessageLoading: false });
//     }
//   },
// }));

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

  getMessages: async function () {
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
}));
