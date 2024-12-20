import React, { useState, useEffect } from "react";
import axios from "../../../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../../Features/Authentication/UserSlice";
import Sidebar from "../../User/Profile/Sidebar"
import toast, { Toaster } from "react-hot-toast";
const UserProfile = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone_number: "",
    qualification: "",
    profile_image: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem("accessToken");
  const user = useSelector((state) => state.user.user)
  console.log('userdetails........', user);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
        if (storedProfile) {
          const flattenedProfile = {
            ...storedProfile,
            phone_number: storedProfile.profile?.phone_number || "",
            qualification: storedProfile.profile?.qualification || "",
            profile_image: storedProfile.profile?.profile_image || "",
          };
          setProfile(flattenedProfile);
        } else {
          const response = await axios.get("http://127.0.0.1:8000/profile/", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const flattenedProfile = {
            ...response.data,
            phone_number: response.data.profile?.phone_number || "",
            qualification: response.data.profile?.qualification || "",
            profile_image: response.data.profile?.profile_image || "",
          };
          setProfile(flattenedProfile);
          localStorage.setItem("userProfile", JSON.stringify(flattenedProfile));
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
  
    fetchProfile();
  }, [accessToken]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadImageToCloudinary = async (file) => {
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "jayalakshmi");
    uploadData.append("cloud_name", "dwv9coxek");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dwv9coxek/image/upload`,
      { method: "POST", body: uploadData }
    );

    if (!res.ok) throw new Error("Image upload failed");

    const data = await res.json();
    return data.url;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      let imageUrl = profile.profile_image;
  
      if (selectedFile) {
        imageUrl = await uploadImageToCloudinary(selectedFile);
      }
  
      const updatedProfile = {
        username: profile.username,
        email: profile.email,
        profile: {
          phone_number: profile.phone_number,
          qualification: profile.qualification,
          profile_image: imageUrl,
        },
      };
  
      const response = await axios.put(
        "http://127.0.0.1:8000/profile/",
        updatedProfile,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
  
      toast.success("Profile updated successfully!");
      const updatedData = {
        ...response.data,
        phone_number: response.data.profile?.phone_number || profile.phone_number,
        qualification: response.data.profile?.qualification || profile.qualification,
        profile_image: response.data.profile?.profile_image || imageUrl,
      };
  
      setProfile(updatedData);
      dispatch(setUserProfile(updatedData));
      localStorage.setItem("userProfile", JSON.stringify(updatedData));
    } catch (err) {
      setMessage("Failed to update profile.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100">
      <Sidebar />
     

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Toaster position="top-center" />
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                {profile.profile_image ? (
                  <img
                    src={profile.profile_image}
                    alt="Profile"
                    className="rounded-full w-full h-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                    <img
                      src="/placeholder.svg?height=48&width=48"
                      alt="User"
                      className="w-12 h-12 text-gray-400"
                    />
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-semibold mb-2">{profile.username}</h2>
              <p className="text-gray-500 mb-4">{profile.email}</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  Active
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Professional
                </span>
              </div>
            </div>
          </div>

          {/* Edit Form Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={profile.username}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phone_number"
                  name="phone_number"
                  type="number"
                  value={profile.phone_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">
                  Qualification
                </label>
                <input
                  id="qualification"
                  name="qualification"
                  type="number"
                  value={profile.qualification}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="profile_image" className="block text-sm font-medium text-gray-700">
                  Profile Image
                </label>
                <input
                  id="profile_image"
                  name="profile_image"
                  type="file"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-md shadow-md hover:from-pink-600 hover:to-orange-600"
              >
                Update Profile
              </button>
            </form>
            {message && <div className="mt-4 text-sm text-green-500">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
