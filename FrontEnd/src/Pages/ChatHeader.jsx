import React from "react";
import { useUserChatStore } from "../store/useChatStore";
import { useUserStore } from "../store/userStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useUserChatStore();
  const { onlineUsers } = useUserStore();
  return (
    <div>
      <img src={selectedUser.profilePic} alt={selectedUser.name}></img>
      <p>{onlineUsers.includes(selectedUser.id) ? "Online" : "Offline"}</p>
      <button onClick={() => setSelectedUser(null)}>X</button>
    </div>
  );
}

export default ChatHeader;
