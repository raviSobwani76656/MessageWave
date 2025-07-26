import React, { useState } from "react";

function MessageInput() {
  const [messageText, setMessageText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const useInputRef = useRef(null);

  const sendMessage = () => {};

  const handleImage = (e) => {};

  const removeImage = () => {};

  return (
    <div>
      <div>
        <img src={imagePreview} />
        <button onClick={removeImage}></button>
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type Your Message...."
          value={messageText}
        ></input>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <button
          type="button"
          className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
          onClick={() => fileInputRef.current?.click()}
        >
          <Image size={20} />
        </button>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
