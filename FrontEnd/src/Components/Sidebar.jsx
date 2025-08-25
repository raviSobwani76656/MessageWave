import React, { useEffect } from "react";
import { Users, Circle, X, Settings } from "lucide-react";
import { useUserChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./Skeletons/SidebarSkeleton";

function SideBar({ onClose }) {
  const { users, getUsers, setSelectedUser, selectedUser, isUserLoading } =
    useUserChatStore();

  useEffect(() => {
    getUsers();
  }, []); // Remove getUsers from dependency array to prevent infinite loop

  if (isUserLoading) return <SidebarSkeleton />;

  return (
    <aside
      className="h-full w-full sm:w-64 max-w-[16rem] border-r border-base-300 
      flex flex-col transition-all duration-300 bg-base-100 shadow-sm md:shadow-none"
    >
      {/* Header */}
      <div className="border-b border-base-300 w-full p-4 flex items-center gap-2">
        <button
          onClick={onClose}
          className="sm:hidden p-2 rounded-full hover:bg-base-200 active:bg-base-300 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5 text-base-content" />
        </button>
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-base-content" />
          <span className="font-semibold text-lg hidden sm:block">
            Chat Contacts
          </span>
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto w-full py-3 px-2">
        {users.length === 0 ? (
          <div className="text-center text-base-content/60 py-4 animate-pulse">
            No contacts found
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-200 
              rounded-lg transition-all duration-200 cursor-pointer group
              ${
                selectedUser?.id === user.id
                  ? "bg-base-200 scale-[0.98] shadow-sm"
                  : ""
              }`}
              onClick={() => {
                setSelectedUser(user);
                onClose(); // Close sidebar on mobile after selection
              }}
            >
              {/* Avatar */}
              <div className="relative mx-auto sm:mx-0 group-hover:scale-105 transition-transform duration-200">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={`${user.name || "Unknown User"}'s profile`}
                  className="size-10 sm:size-12 rounded-full object-cover"
                />
                <Circle
                  className={`absolute bottom-0 right-0 size-3 ${
                    user.isOnline ? "text-success" : "text-base-content/30"
                  }`}
                  fill="currentColor"
                />
              </div>

              {/* User info */}
              <div className="hidden sm:block text-left min-w-0 flex-1">
                <div className="font-medium truncate group-hover:text-blue-600 transition-colors">
                  {user.name || "Unknown User"}
                </div>
                <div className="text-sm text-base-content/60 truncate">
                  {user.isOnline ? "Online" : "Offline"}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer - visible only on mobile */}
      <div className="sm:hidden border-t border-base-300 p-3">
        <button
          className="h-8 w-full rounded-lg bg-base-200 flex items-center justify-center 
          hover:bg-base-300 active:bg-base-400 transition-all duration-200"
          onClick={() => alert("Settings clicked!")} // Replace with actual settings logic
          aria-label="Open settings"
        >
          <Settings className="w-5 h-5 text-base-content/80 mr-2" />
          <span className="text-sm text-base-content/80">Settings</span>
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
