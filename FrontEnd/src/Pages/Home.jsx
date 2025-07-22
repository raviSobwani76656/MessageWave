import React, { useState } from "react";
import { Menu } from "lucide-react";
import SideBar from "../Components/SideBar";
import NoChatComponent from "./noChatComponent";
import ChatComponent from "./chatComponent";
import { useUserChatStore } from "../store/useChatStore";

function Home() {
  const { selectedUser } = useUserChatStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-base-100">
      {/* Mobile Header with Toggle */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-base-300 bg-base-100">
        <span className="font-semibold text-lg">Chatty</span>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-base-200"
        >
          <Menu className="w-6 h-6 text-base-content" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block md:w-20 lg:w-80 max-w-[20rem] h-full md:h-screen transition-all duration-300`}
      >
        <SideBar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Chat Area */}
      <div className="flex-1 h-full">
        {selectedUser ? <ChatComponent /> : <NoChatComponent />}
      </div>
    </div>
  );
}

export default Home;
