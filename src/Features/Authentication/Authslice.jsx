// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Action for signing up and sending OTP to the user's email
// export const signup = createAsyncThunk(
//   'auth/signup',
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('http://localhost:8000/signup/', formData);
//       console.log('response in authslice signup', response)
//       return response.data; // This should return user data if signup is successful
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Action for verifying the OTP
// export const verifyOtp = createAsyncThunk(
//   'auth/verifyOtp',
//   async ({ email, otp }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('http://localhost:8000/verify-otp/', { email, otp });
//       return response.data; // Return success message if OTP is valid
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     loading: false,
//     error: null,
//     otpVerified: false, // Tracks if OTP has been verified
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Signup actions
//       .addCase(signup.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signup.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//       })
//       .addCase(signup.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         console.error("Signup Error:", action.payload);
//       })

//       // OTP verification actions
//       .addCase(verifyOtp.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(verifyOtp.fulfilled, (state) => {
//         state.loading = false;
//         state.otpVerified = true; // OTP successfully verified
//       })
//       .addCase(verifyOtp.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Action for signing up and sending OTP to the user's email
export const signup = createAsyncThunk(
  'auth/signup',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/signup/', formData);
      console.log('Signup API Response:', response.data);
      return response.data; // Return user data if signup is successful
    } catch (error) {
      console.error('Signup Error Response:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Action for verifying the OTP
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/verify-otp/', { email, otp });
      console.log('OTP Verification Response:', response.data);
      return response.data; // Return success message if OTP is valid
    } catch (error) {
      console.error('Verify OTP Error Response:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userFromStorage = JSON.parse(sessionStorage.getItem('user'));
const accessTokenFromStorage = sessionStorage.getItem('accessToken');
const refreshTokenFromStorage = sessionStorage.getItem("refreshToken");
const roleFromStorage = sessionStorage.getItem('role');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: userFromStorage || null,
    accessToken: accessTokenFromStorage || null,
    refreshToken: refreshTokenFromStorage || null,
    role: roleFromStorage || null,
    loading: false,
    error: null,
    otpVerified: false, // Tracks if OTP has been verified
  },
  reducers: {
    setUser: (state, action) => {
      console.log('Payload in setUser:', action.payload); // Log payload received

      // Store user information and access token separately
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.role = action.payload.role;
      sessionStorage.setItem('role', action.payload.role);
      console.log('Saving Refresh Token:', action.payload.refreshToken); // Log refresh token
      console.log('Current State after setUser:', state); // Log state after mutation

      // Save to localStorage
      sessionStorage.setItem('user', JSON.stringify(action.payload.user));
      sessionStorage.setItem('accessToken', action.payload.accessToken);
      sessionStorage.setItem("refreshToken", action.payload.refreshToken);
      sessionStorage.setItem('role', action.payload.role);
    },
    clearUser: (state) => {
      console.log('Clearing User State'); // Debugging when clearUser is triggered
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null; 
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem('role');
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup actions
      .addCase(signup.pending, (state) => {
        console.log('Signup Request Pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        console.log('Signup Request Fulfilled:', action.payload); // Log data after signup success
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(signup.rejected, (state, action) => {
        console.error('Signup Request Rejected:', action.payload); // Log error when signup fails
        state.loading = false;
        state.error = action.payload;
      })

      // OTP verification actions
      .addCase(verifyOtp.pending, (state) => {
        console.log('OTP Verification Request Pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        console.log('OTP Verification Successful');
        state.loading = false;
        state.otpVerified = true; // OTP successfully verified
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        console.error('OTP Verification Failed:', action.payload); // Log error when OTP verification fails
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
