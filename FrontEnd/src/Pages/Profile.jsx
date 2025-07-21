import { Camera } from "lucide-react";
import React, { useState } from "react";
import { useUserStore } from "../store/userStore";

function Profile() {
  // Get user data and profile update method from global state
  const { user, isUserUpdating, updateProfile } = useUserStore();

  // Store the selected image file (used later for uploading)
  const [selectedImage, setSelectedImage] = useState(null);

  // Store the image preview URL (for displaying selected image before upload)
  const [previewImage, setPreviewImage] = useState("");

  // When a file is selected, store it and create a preview URL
  const handleChange = (e) => {
    const image = e.target.files[0]; // get the first file
    setSelectedImage(image); // store the image file

    if (!image) return;

    // Generate a temporary URL for the preview image
    setPreviewImage(URL.createObjectURL(image));
  };

  // Convert selected image to base64 and upload it
  const handleUploadImage = () => {
    const reader = new FileReader();

    // Read the selected image as a Data URL (base64 string)
    reader.readAsDataURL(selectedImage);

    // When reading is done, update the profile with new profilePic
    reader.onload = async () => {
      const base64Image = reader.result;
      setPreviewImage(base64Image); // update preview with final image
      await updateProfile({ profilePic: base64Image }); // upload
    };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Profile</h1>
        <p className="text-gray-600 mb-6">Your Account Info</p>

        {/* Profile image preview */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={previewImage || user.profilePic}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
            />
            <label
              htmlFor="image-upload"
              className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 transition"
            >
              <Camera className="w-5 h-5 text-white" />
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleChange}
                disabled={isUserUpdating}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Uploading status or prompt */}
        <p className="text-center text-gray-500 mb-4">
          {isUserUpdating
            ? "Loading..."
            : "Click the camera icon to select a file"}
        </p>

        {/* User details */}
        <div className="space-y-4 mb-6">
          <input
            readOnly
            value={user.name}
            className="w-full p-2 border rounded-md bg-gray-50 text-gray-700 cursor-not-allowed"
          />
          <input
            readOnly
            value={user.email}
            className="w-full p-2 border rounded-md bg-gray-50 text-gray-700 cursor-not-allowed"
          />
        </div>

        {/* Upload button */}
        <button
          type="button"
          onClick={handleUploadImage}
          disabled={!selectedImage || isUserUpdating}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default Profile;
