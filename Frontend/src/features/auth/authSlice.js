import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendOtpAPI, verifyOtpAPI, completeProfileAPI, getProfileAPI } from "./authApi";

// Helper to parse user data from localStorage
const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const initialState = {
  user: getUserFromLocalStorage(), // Initialize user from localStorage
  token: localStorage.getItem("userToken") || null,
  status: "idle",
  error: null,
  message: null,
  step: "sendOtp", // flow control
  userId: localStorage.getItem("userId") || null, // userId for profile completion
};

// Thunks...
export const sendOtp = createAsyncThunk("auth/sendOtp", async (mobile, thunkAPI) => {
  try {
    const response = await sendOtpAPI(mobile);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
  }
});

export const verifyOtp = createAsyncThunk("auth/verifyOtp", async ({ mobile, otp }, thunkAPI) => {
  try {
    const response = await verifyOtpAPI({ mobile, otp });
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
  }
});

export const completeProfile = createAsyncThunk("auth/completeProfile", async (formData, thunkAPI) => {
  try {
    const response = await completeProfileAPI(formData);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
  }
});

// NEW THUNK: Fetch user profile
export const getProfile = createAsyncThunk("auth/getProfile", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No token found" });
    }
    const response = await getProfileAPI(token);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.step = "sendOtp";
      state.userId = null;
      state.error = null;
      state.message = null;
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("user"); // Clear user data
    },
    // Reducer to manually set user data (e.g., after initial fetch)
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.message = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
        state.step = "verifyOtp";
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to send OTP";
      })

      .addCase(verifyOtp.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.message = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        localStorage.setItem("userToken", action.payload.token);

        if (action.payload.nextStep === "completeProfile") {
          state.userId = action.payload.userId;
          state.step = "completeProfile";
          localStorage.setItem("userId", action.payload.userId);
        } else {
          // Existing user, profile is complete
          state.user = action.payload.user;
          state.step = "authenticated";
          localStorage.setItem("user", JSON.stringify(action.payload.user)); // Persist user data
          localStorage.removeItem("userId"); // Should not have userId if profile is complete
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "OTP verification failed";
      })

      .addCase(completeProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.message = null;
      })
      .addCase(completeProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token; // Ensure token is updated if returned
        state.step = "authenticated";
        localStorage.setItem("userToken", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user)); // Persist user data
        localStorage.removeItem("userId"); // Clear userId after profile complete
      })
      .addCase(completeProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Profile completion failed";
      })

      // NEW CASES for getProfile
      .addCase(getProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // Backend returns user object directly
        state.step = "authenticated"; // Assume authenticated if profile fetched
        localStorage.setItem("user", JSON.stringify(action.payload)); // Persist fetched user data
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to fetch profile";
        // Optionally, if token is invalid, log out
        if (action.payload?.message === 'Not authorized, token failed' || action.payload?.message === 'No token provided' || action.payload?.message === 'User not found') {
            state.user = null;
            state.token = null;
            state.step = "sendOtp";
            localStorage.removeItem("userToken");
            localStorage.removeItem("user");
        }
      });
  },
});

export const { logout, setUser } = authSlice.actions; // Export setUser
export default authSlice.reducer;