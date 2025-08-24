import React, { useEffect } from "react";
import { useUserChatStore } from "../store/useChatStore";
import { useUserStore } from "../store/userStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
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
    if (selectedUser?.id) {
      getMessages(selectedUser.id);
    }
  }, [selectedUser?.id, getMessages]);

  if (isUserLoading) {
    return (
      <div className="flex flex-col h-full w-full">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4">
        {isMessagesLoading ? (
          <MessageSkeleton />
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500 py-4">No messages yet</div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`chat flex ${
                message.senderId === user.id
                  ? "chat-end justify-end"
                  : "chat-start justify-start"
              } mb-4`}
            >
              <div className="flex items-start gap-2 max-w-[70%]">
                {/* Profile Picture (small avatar) */}
                <img
                  src={
                    message.senderId === user.id
                      ? user.profilePic || "/default-avatar.png"
                      : selectedUser.profilePic || "/default-avatar.png"
                  }
                  alt={`Avatar of ${
                    message.senderId === user.id ? user.name : selectedUser.name
                  }`}
                  className="w-8 h-8 rounded-full object-cover"
                />

                <div className="flex flex-col">
                  {/* Timestamp */}
                  <time className="text-xs text-gray-500">
                    {new Date(message.createdAt).toLocaleString()}
                  </time>

                  {/* Message Content */}
                  <div
                    className={`p-3 rounded-lg ${
                      message.senderId === user.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Message image"
                        className="max-w-full h-auto rounded-lg mb-2"
                      />
                    )}
                    {message.content && <p>{message.content}</p>}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <MessageInput />
    </div>
  );
}

export default ChatComponent;
