import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("userProfile")) || {}, // Initialize from localStorage
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.user = {
        ...state.user, // Retain existing user fields
        ...action.payload, // Merge with new profile data
        profile: {
          ...state.user.profile, // Retain existing profile fields
          ...action.payload.profile, // Merge new profile fields
        },
      };
      console.log('user details in slice', state.user)
      localStorage.setItem("userProfile", JSON.stringify(state.user)); // Update localStorage
    },
    clearUserProfile: (state) => {
      state.user = {};
      localStorage.removeItem("userProfile"); // Clear localStorage
    },
  },
});

export const { setUserProfile, clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
