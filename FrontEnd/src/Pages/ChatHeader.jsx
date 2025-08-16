import React from "react";
import { useUserChatStore } from "../store/useChatStore";
import { useUserStore } from "../store/userStore";
import { X } from "lucide-react";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useUserChatStore();
  const { onlineUsers } = useUserStore();

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-blue-600 text-white flex items-center justify-between border-b border-blue-700 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Profile Picture */}
        <img
          src={selectedUser.profilePic}
          alt={`${selectedUser.name}'s profile`}
          className="w-10 h-10 rounded-full object-cover border-2 border-white"
        />
        <div>
          {/* User Name */}
          <h2 className="text-lg font-semibold">{selectedUser.name}</h2>
          {/* Online/Offline Status */}
          <p
            className={`text-sm ${
              onlineUsers.includes(selectedUser.id)
                ? "text-green-300"
                : "text-gray-300"
            }`}
          >
            {onlineUsers.includes(selectedUser.id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setSelectedUser(null)}
        className="p-2 rounded-full hover:bg-blue-700 transition-colors"
        aria-label="Close chat"
      >
        <X size={20} />
      </button>
    </div>
  );
}

export default ChatHeader;
