import React from "react";
import { MessageSquare } from "lucide-react";

const NoChatComponent = () => {
  return (
    <div className="flex-1 flex items-center justify-center h-full bg-base-100/30 p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-md text-center space-y-6 mt-4 sm:mt-6">
        {/* Icon Display */}
        <div className="flex justify-center">
          <div className="relative">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-primary/10 flex items-center
              justify-center animate-pulse"
            >
              <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-xl sm:text-2xl font-semibold text-base-content">
          Welcome to MessageWave
        </h2>
        <p className="text-base-content/70 text-sm sm:text-base px-4 sm:px-0">
          Select a conversation from the sidebar or start a new chat to connect
          with friends
        </p>
      </div>
    </div>
  );
};

export default NoChatComponent;
