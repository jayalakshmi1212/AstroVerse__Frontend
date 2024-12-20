import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axiosInstance';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../../tutor/Profile/ProfileSidebar'

const TutorProfile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    phone_number: '',
    qualification: '',
    profile_image: '',
   
    bio: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(75);

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchTutorProfile = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/tutor/profile/', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const flattenedProfile = {
          ...response.data,
          phone_number: response.data.profile?.phone_number || '',
          qualification: response.data.profile?.qualification || '',
        profile_image: response.data.profile?.profile_image ,
          location: response.data.profile?.location || '',
          website: response.data.profile?.website || '',
          bio: response.data.profile?.bio || '',
        };

        setProfile(flattenedProfile);
      } catch (err) {
        console.error('Error fetching tutor profile:', err);
        toast.error('Failed to load profile');
      }
    };

    fetchTutorProfile();
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
    uploadData.append('file', file);
    uploadData.append('upload_preset', 'jayalakshmi');
    uploadData.append('cloud_name', 'dwv9coxek');

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dwv9coxek/image/upload`,
      { method: 'POST', body: uploadData }
    );

    if (!res.ok) throw new Error('Image upload failed');

    const data = await res.json();
    return data.url;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

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
          location: profile.location,
          website: profile.website,
          bio: profile.bio,
        },
      };

      const response = await axios.put(
        'http://127.0.0.1:8000/tutor/profile/',
        updatedProfile,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      toast.success('Profile updated successfully!');
      setProfile({
        ...response.data,
        phone_number: response.data.profile?.phone_number || '',
        qualification: response.data.profile?.qualification || '',
        profile_image: response.data.profile?.profile_image || imageUrl,
        location: response.data.profile?.location || '',
        website: response.data.profile?.website || '',
        bio: response.data.profile?.bio || '',
      });
      console.log('profileeeyy',profile.profile_image);
      console.log('blaaaaaaaaaa',response.data)
      
    } catch (err) {
      toast.error('Failed to update profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
 
 
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
  profileImage={profile.profile_image} 
  username={profile.username} 
/>

      <div className="flex-1 p-8">
        <Toaster position="top-center" />
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-800">Profile</h1>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-semibold">
                {progress}%
              </div>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NAME
                </label>
                <input
                  name="username"
                  type="text"
                  value={profile.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  EMAIL
                </label>
                <input
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PHONE NUMBER
                </label>
                <input
                  name="phone_number"
                  type="text"
                  value={profile.phone_number}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

        

           

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  BIO
                </label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Tell us about yourself"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PROFILE IMAGE
                </label>
                <div className="flex items-center gap-4">
                  {profile.profile_image && (
                    <img
                      src={profile.profile_image}
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;

