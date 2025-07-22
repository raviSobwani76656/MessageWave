import { MessageSquare } from "lucide-react";

const NoChatComponent = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-4 sm:p-8 md:p-16 bg-base-100/30">
      <div className="max-w-sm w-full text-center space-y-5">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
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
          Welcome to MessageWave!
        </h2>
        <p className="text-base-content/70 text-sm sm:text-base px-2">
          Select a conversation from the sidebar or start a new chat to connect
          with friends
        </p>
      </div>
    </div>
  );
};

export default NoChatComponent;
