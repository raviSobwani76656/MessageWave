import React from "react";
import { useUserChatStore } from "../store/useChatStore";
import { MessageSquare, Circle, Smile, Paperclip } from "lucide-react";

function ChatComponent() {
  const { selectedUser } = useUserChatStore();

  return (
    <div className="flex-1 flex flex-col h-full bg-gradient-to-br from-base-100/20 to-base-100/50 p-4 sm:p-8 md:p-12">
      <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-base-300 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center text-base-content/60">
              {selectedUser?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-base-content">
                {selectedUser?.name || "User"}
              </h2>
              <div className="flex items-center gap-1">
                <p className="text-sm text-base-content/60">
                  {selectedUser?.isOnline ? "Online" : "Offline"}
                </p>
                {selectedUser?.isOnline && (
                  <Circle
                    className="w-2 h-2 text-success animate-ping"
                    fill="currentColor"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          <div className="flex flex-col animate-fade-in">
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-200/20 p-3 rounded-lg max-w-[70%] self-end shadow-md">
              <p className="text-base-content">
                Hello! How can I assist you today?
              </p>
              <span className="text-xs text-base-content/50">9:30 PM</span>
            </div>
            <div className="bg-gradient-to-r from-green-500/20 to-green-200/20 p-3 rounded-lg max-w-[70%] self-start shadow-md">
              <p className="text-base-content">
                Hi there! I'm doing great, thanks!
              </p>
              <span className="text-xs text-base-content/50">9:31 PM</span>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm p-2 rounded-xl border border-base-300/50">
            <button className="text-base-content/70 hover:text-base-content">
              <Smile className="w-6 h-6" />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2 rounded-lg bg-transparent border-none focus:outline-none text-base-content placeholder-base-content/50"
            />
            <button className="text-base-content/70 hover:text-base-content">
              <Paperclip className="w-6 h-6" />
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors duration-200">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
