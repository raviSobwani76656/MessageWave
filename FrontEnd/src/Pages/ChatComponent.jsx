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
    subscribeToMessages,
    unSubscribeFromMessages,
  } = useUserChatStore();

  useEffect(() => {
    if (selectedUser?.id) {
      getMessages(selectedUser.id);
      subscribeToMessages();
      return () => unSubscribeFromMessages();
    }
  }, [
    selectedUser?.id,
    getMessages,
    unSubscribeFromMessages,
    subscribeToMessages,
  ]);

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
      <div className="flex-1 overflow-y-auto overflow-x-auto px-2 py-2">
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
              } mb-4 max-w-3xl mx-auto`}
            >
              <div className="flex items-start gap-2 max-w-[75%]">
                <div className="flex flex-col">
                  {/* Timestamp */}
                  <time className="text-xs text-gray-500">
                    {new Date(message.createdAt).toLocaleString()}
                  </time>

                  {/* Message Content */}
                  <div
                    className={`p-3 rounded-lg break-words ${
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
