import React, { useEffect } from "react";
import { useUserChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

function chatComponent() {
  const {
    messages,
    isMessagesLoading,
    isUserLoading,
    selectedUser,
    getMessages,
  } = useUserChatStore();

  useEffect(() => {
    getMessages(selectedUser.id);
  }, [selectedUser.id]);

  if (isUserLoading) {
    return (
      <>
        <ChatHeader />
        <MessagesSkeleton />
        <MessageInput />
      </>
    );
  }

  return (
    <>
      <ChatHeader />
      <Messages />
      <MessageInput />
    </>
  );
}

export default chatComponent;
