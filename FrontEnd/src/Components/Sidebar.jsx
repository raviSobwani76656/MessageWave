import React, { useEffect } from "react";
import { useUserChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./Skeletons/SidebarSkeleton";

function SideBar() {
  const { users, getUsers, setSelectedUser, selectedUser, isUserLoading } =
    useUserChatStore();

  const onlineUser = [];

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserLoading) return <SidebarSkeleton />;

  return <div></div>;
}

export default SideBar;
