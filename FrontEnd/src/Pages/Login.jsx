import { Camera, Mail, User } from "lucide-react";
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
    <div className="min-h-screen w-full flex items-center justify-center bg-blue-600 p-4">
      <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl font-semibold text-gray-800">Profile</h1>
            <p className="text-gray-500">Your profile information</p>
            <div className="relative">
              <img
                src={previewImage || user.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-all duration-200 ${
                  isUserUpdating ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleChange}
                  disabled={isUserUpdating}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">
              {isUserUpdating
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
            <button
              type="button"
              onClick={handleUploadImage}
              disabled={!selectedImage || isUserUpdating}
              className="w-full max-w-xs bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Upload
            </button>
          </div>

          {/* User details */}
          <div className="flex-1 space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
                {user.name}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
