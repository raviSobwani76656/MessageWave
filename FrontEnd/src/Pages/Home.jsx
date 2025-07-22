import React from "react";
import NoChatComponent from "./noChatComponent";
import ChatComponent from "./chatComponent";
import SideBar from "../Components/SideBar";

function Home() {
  return (
    <>
      <div>
        <SideBar />
        {!setSelectedUser ? <NoChatComponent /> : <ChatComponent />}
      </div>
    </>
  );
}

export default Home;
