import React from "react";
import NoChatComponent from "./noChatComponent";
import ChatComponent from "./chatComponent";
import SideBar from "../Components/SideBar";
import { useUserChatStore } from "../store/useChatStore";

function Home() {
  const { setSelectedUser } = useUserChatStore();
  return (
    <>
      <div>
        <h1>This is the Home Page</h1>
        <SideBar />
        {!setSelectedUser ? <NoChatComponent /> : <ChatComponent />}
      </div>
    </>
  );
}

export default Home;
