import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Action for registering a tutor
export const registerTutor = createAsyncThunk(
  'tutor/registerTutor',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/tutor/signup/', formData);
      return response.data; // Return tutor data if registration is successful
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Action for fetching tutor data
export const fetchTutor = createAsyncThunk(
  'tutor/fetchTutor',
  async (tutorId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8000/tutor/${tutorId}/`);
      return response.data; // Return tutor data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Action for updating tutor profile
export const updateTutor = createAsyncThunk(
  'tutor/updateTutor',
  async ({ tutorId, profileData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:8000/tutor/${tutorId}/`, profileData);
      return response.data; // Return updated tutor data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Action for tutor signup
export const tutorSignup = createAsyncThunk(
  'tutor/tutorSignup',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/tutors/signup/', formData);
      return response.data; // Return tutor signup data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Action for verifying OTP
export const verifyTutorOtp = createAsyncThunk(
  'tutor/verifyTutorOtp',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/tutors/verify-otp/', { email, otp });
      return response.data; // Return success message
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const tutorSlice = createSlice({
  name: 'tutor',
  initialState: {
    tutor: null, // To store tutor details
    loading: false,
    error: null,
  },
  reducers: {
    clearTutor: (state) => {
      state.tutor = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register tutor
      .addCase(registerTutor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerTutor.fulfilled, (state, action) => {
        state.loading = false;
        state.tutor = action.payload; // Save registered tutor details
      })
      .addCase(registerTutor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch tutor
      .addCase(fetchTutor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTutor.fulfilled, (state, action) => {
        state.loading = false;
        state.tutor = action.payload; // Save fetched tutor details
      })
      .addCase(fetchTutor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update tutor
      .addCase(updateTutor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTutor.fulfilled, (state, action) => {
        state.loading = false;
        state.tutor = action.payload; // Save updated tutor details
      })
      .addCase(updateTutor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Tutor signup
      .addCase(tutorSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(tutorSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.tutor = action.payload; // Save tutor signup details
      })
      .addCase(tutorSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify OTP
      .addCase(verifyTutorOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyTutorOtp.fulfilled, (state) => {
        state.loading = false;
        state.error = null; // OTP verified successfully
      })
      .addCase(verifyTutorOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearTutor } = tutorSlice.actions;
export default tutorSlice.reducer;

