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
  }, [selectedUser?.id]); // Remove getMessages from dependency array to prevent infinite loop

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
    <div className="flex flex-col h-full w-full bg-gray-50">
      {/* Sticky Chat Header */}
      <div className="sticky top-0 z-10">
        <ChatHeader />
      </div>

      {/* Messages Section (scrollable area) */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {isMessagesLoading ? (
          <MessageSkeleton />
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500 py-4">No messages yet</div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === user.id ? "justify-end" : "justify-start"
              } mb-4 max-w-3xl mx-auto`}
            >
              <div className="flex items-start gap-2 max-w-[75%]">
                {/* Avatar (always on left for incoming) */}
                {message.senderId !== user.id && (
                  <img
                    src={selectedUser.profilePic || "/default-avatar.png"}
                    alt={selectedUser.name}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                )}

                <div className="flex flex-col">
                  {/* Message Bubble */}
                  <div
                    className={`p-3 rounded-lg break-words ${
                      message.senderId === user.id
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Message"
                        className="max-w-full h-auto rounded-lg mb-2"
                      />
                    )}
                    {message.content && <p>{message.content}</p>}
                  </div>
                  <time className="text-xs text-gray-500 mt-1 self-end">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sticky Message Input */}
      <div className="sticky bottom-0 z-10 bg-white">
        <MessageInput />
      </div>
    </div>
  );
}

export default ChatComponent;
