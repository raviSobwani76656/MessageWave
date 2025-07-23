import React from "react";
import { useUserChatStore } from "../store/useChatStore";

function ChatComponent() {
  const { selectedUser } = useUserChatStore();

  return (
    <div className="flex-1 flex flex-col h-full bg-base-100/30 p-4 sm:p-8 md:p-12">
      <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-base-300 pb-4 mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-base-content">
            Chat with {selectedUser?.name || "User"}
          </h2>
          <p className="text-sm text-base-content/60">
            {selectedUser?.isOnline ? "Online" : "Offline"}
          </p>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {/* Sample Messages - Replace with dynamic messages */}
          <div className="flex flex-col">
            <div className="bg-base-200 p-2 rounded-lg max-w-[70%] self-end">
              Hello! How can I assist you today?
            </div>
            <div className="bg-primary/10 p-2 rounded-lg max-w-[70%] self-start">
              Hi there! I'm doing great, thanks!
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="mt-auto">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2 rounded-lg border border-base-300 focus:outline-none focus:border-primary"
            />
            <button className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
