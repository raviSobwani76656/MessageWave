import React, { useState, useRef } from "react";
import { useUserChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { Send, X, Image } from "lucide-react";

function MessageInput() {
  const [messagetext, setMessageText] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const { sendMessages } = useUserChatStore();

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

    try {
      await sendMessages({
        message: messagetext,
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
    <>
      {previewImage && (
        <>
          <img src={previewImage} alt="preview" />
          <button onClick={removeImage}>
            <X />
          </button>
        </>
      )}

      <form onSubmit={handleSendMessage}>
        <div>
          <input
            value={messagetext}
            placeholder="Type your message"
            type="text"
            onChange={(e) => setMessageText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
            ref={fileInputRef}
          />
          <button onClick={openFilePicker}>
            {" "}
            <Image />
          </button>

          <button type="submit" disabled={!messagetext.trim() && !previewImage}>
            <Send size={22} />
          </button>
        </div>
      </form>
    </>
  );
}

export default MessageInput;
