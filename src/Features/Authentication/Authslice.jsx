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
      console.log('response in authslice signup', response);
      return response.data; // Return user data if signup is successful
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Action for verifying the OTP
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/verify-otp/', { email, otp });
      return response.data; // Return success message if OTP is valid
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const userFromStorage = JSON.parse(localStorage.getItem('user'));
const accessTokenFromStorage = localStorage.getItem('accessToken');


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:userFromStorage || null,
    accessToken: accessTokenFromStorage || null,
    loading: false,
    error: null,
    otpVerified: false, // Tracks if OTP has been verified
  },
  reducers: {
    setUser: (state, action) => {
      // Store user information and access token separately
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
    clearUser: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup actions
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Signup Error:", action.payload);
      })

      // OTP verification actions
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpVerified = true; // OTP successfully verified
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
