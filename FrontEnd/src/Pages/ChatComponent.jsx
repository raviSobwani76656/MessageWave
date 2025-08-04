import React, { useEffect } from "react";
import { useUserChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useUserStore } from "../store/userStore";
import MessageSkeleton from "../Components/Skeletons/MessageSkeleton";

function ChatComponent() {
  const { user } = useUserStore();
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
        <MessageSkeleton />
        <MessageInput />
      </>
    );
  }

  return (
    <>
      <ChatHeader />

      <div>
        {isMessagesLoading == true ? (
          <MessageSkeleton />
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`chat ${
                message.senderId === user.id ? "chat-end" : "chat-start"
              }`}
            >
              <img
                src={
                  message.senderId === selectedUser.id
                    ? selectedUser.profilePic
                    : user.profilePic
                }
                alt={`Profile Pic of  ${
                  message.selectedUser === selectedUser.id
                    ? selectedUser.name
                    : user.name
                }`}
              />

              <div>
                <time>{new Date(message.createdAt).toLocaleString()}</time>
              </div>

              <div>
                {message.image && (
                  <img src={message.image} alt="Image message" />
                )}
              </div>
              <div> {message.content && <p>{message.content}</p>} </div>
            </div>
          ))
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatComponent;
