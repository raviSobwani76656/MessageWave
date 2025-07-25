import React from "react";

const MessageSkeleton = () => {
  // Create an array of 5 items for skeleton messages with varied widths
  const skeletonMessages = Array(5)
    .fill(null)
    .map((_, idx) => ({
      width: idx % 2 === 0 ? "w-[180px]" : "w-[240px]", // Alternating message widths
    }));

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
      {skeletonMessages.map((msg, idx) => (
        <div
          key={idx}
          className={`chat ${
            idx % 2 === 0 ? "chat-start" : "chat-end"
          } animate-pulse`}
        >
          <div className="chat-image avatar">
            <div className="size-8 rounded-full">
              <div className="skeleton w-full h-full rounded-full bg-gray-200" />
            </div>
          </div>

          <div className="chat-header flex items-center space-x-2 mb-1">
            <div className="skeleton h-3 w-20 bg-gray-200 rounded" />
            <div className="skeleton h-2 w-12 bg-gray-200 rounded" />{" "}
            {/* Timestamp */}
          </div>

          <div className="chat-bubble bg-transparent p-0">
            <div
              className={`skeleton h-12 ${msg.width} bg-gray-200 rounded-lg`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
