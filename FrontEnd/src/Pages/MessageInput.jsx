import React, { useState, useRef } from "react";
import { useUserChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { Send, X, Image } from "lucide-react";
import { useUserStore } from "../store/userStore";

function MessageInput() {
  const [messagetext, setMessageText] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const { user } = useUserStore();
  const { sendMessages, selectedUser } = useUserChatStore();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!messagetext.trim() && !previewImage) return;

    if (!user?.id || !selectedUser?.id) {
      toast.error("Sender or Receiver id missing");
      return;
    }

    try {
      await sendMessages({
        senderId: user.id,
        receiverId: selectedUser.id,
        content: messagetext,
        image: previewImage,
      });

      setPreviewImage(null);
      setMessageText("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast.error("Error occurred while sending the message");
      console.error("Error occurred while sending the message:", error);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white border-t border-gray-200">
      {/* Image Preview */}
      {previewImage && (
        <div className="relative mb-4 max-w-xs">
          <img
            src={previewImage}
            alt="preview"
            className="w-full h-auto rounded-lg shadow-md"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            aria-label="Remove image"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 shadow-sm">
          {/* Text Input */}
          <input
            value={messagetext}
            placeholder="Type your message"
            type="text"
            onChange={(e) => setMessageText(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-sm"
          />

          {/* Image Upload Button */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
            ref={fileInputRef}
          />
          <button
            type="button"
            onClick={openFilePicker}
            className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
            aria-label="Upload image"
          >
            <Image size={20} />
          </button>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!messagetext.trim() && !previewImage}
          className={`p-2 rounded-full transition-colors ${
            messagetext.trim() || previewImage
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
