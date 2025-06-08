import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeProfile, getProfile } from "../features/auth/authSlice"; // Import getProfile thunk

const dummyProfileImg = "https://cdn-icons-png.flaticon.com/512/1077/1077114.png";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, userId, status, error, token } = useSelector((state) => state.auth); // Get token from state

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(dummyProfileImg);

  // Effect to fetch user profile if it's not in Redux state but a token exists
  useEffect(() => {
    if (token && !user) {
      dispatch(getProfile());
    }
  }, [token, user, dispatch]); // Depend on token and user state

  // Load user data to form on mount or when user updates from API fetch
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setProfilePicPreview(user.profilePhoto || dummyProfileImg);
    } else {
      // If user is null (e.g., initial load before fetch completes, or after logout)
      setName("");
      setEmail("");
      setProfilePicPreview(dummyProfileImg);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Please fill in both name and email.");
      return;
    }

    const formData = {
      userId: userId || user?._id, // Use userId from state if available, else user._id
      name,
      email,
      profilePhoto: profilePicFile,
    };

    dispatch(completeProfile(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setIsEditing(false);
        setProfilePicFile(null); // Clear file input after successful upload
        // The Redux state `user` will be updated by completeProfile.fulfilled,
        // which will then trigger the useEffect above to update local state.
      } else {
        // Handle error if needed, e.g., show an alert
        console.error("Profile update failed:", res.payload);
      }
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-10 px-4">
      <img
        src={profilePicPreview}
        alt="Profile"
        className="w-40 h-40 rounded-full object-cover border-4 border-blue-600 mb-6"
      />

      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="mb-6 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          Edit Profile
        </button>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <label className="block mb-2 font-semibold text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!isEditing}
          placeholder="Your full name"
          className={`w-full p-2 border rounded mb-4 ${
            isEditing ? "border-blue-600" : "bg-gray-100 cursor-not-allowed"
          }`}
          required
        />

        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!isEditing}
          placeholder="Your email address"
          className={`w-full p-2 border rounded mb-4 ${
            isEditing ? "border-blue-600" : "bg-gray-100 cursor-not-allowed"
          }`}
          required
        />

        {isEditing && (
          <>
            <label className="block mb-2 font-semibold text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mb-4"
            />
          </>
        )}

        {status === "loading" && (
          <p className="text-blue-600 mb-4">Updating profile...</p>
        )}
        {(status === "succeeded" && error === null) && ( // Ensure message is only shown for success without error
          <p className="text-green-600 mb-4">Profile updated successfully!</p>
        )}
        {status === "failed" && error && (
          <p className="text-red-600 mb-4">{error}</p>
        )}

        {isEditing && (
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 disabled:bg-blue-400"
              disabled={status === "loading"}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                // Revert to current user data or dummy if user is null
                setName(user?.name || "");
                setEmail(user?.email || "");
                setProfilePicPreview(user?.profilePhoto || dummyProfileImg);
                setProfilePicFile(null);
              }}
              className="bg-gray-400 text-white py-2 px-6 rounded hover:bg-gray-500"
              disabled={status === "loading"}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;