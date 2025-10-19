import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios/axiosInstance';
import { setTokens, clearTokens } from '../axios/tokenManager';

// Async thunks for API calls
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/users/login', { email, password }, {
        withCredentials: true,
      });
      
      if (response.data.user && response.data.tokens) {
        return {
          user: response.data.user,
          tokens: response.data.tokens
        };
      } else {
        return rejectWithValue(response.data.message || 'Login failed');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed! Please check your credentials.'
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.success) {
        return {
          user: response.data.user,
          emailSent: response.data.emailSent,
          message: response.data.message
        };
      } else {
        return rejectWithValue(response.data.message || 'Registration failed');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Registration failed! Please try again.'
      );
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/users/verify-email?token=${token}`);
      
      if (response.data.success) {
        return response.data.user;
      } else {
        return rejectWithValue(response.data.message || 'Email verification failed');
      }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Email verification failed'
      );
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/users/profile');
      
      if (response.data.success) {
        return response.data.user;
      } else {
        return rejectWithValue(response.data.message || 'Failed to fetch profile');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch profile'
      );
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (refreshTokenValue, { rejectWithValue }) => {
    try {
      const response = await axios.post('/users/refresh-token', {
        refreshToken: refreshTokenValue
      }, {
        withCredentials: true,
      });
      
      if (response.data.tokens) {
        return response.data.tokens;
      } else {
        return rejectWithValue('Token refresh failed');
      }
    } catch {
      return rejectWithValue('Token refresh failed');
    }
  }
);

// Initial state
const initialState = {
  user: null,
  tokens: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  emailSent: false,
  verificationMessage: null,
  fetchingProfile: false
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Logout user
    logout: (state) => {
      state.user = null;
      state.tokens = null;
      state.isAuthenticated = false;
      state.error = null;
      state.emailSent = false;
      state.verificationMessage = null;
      // Clear tokens from token manager
      clearTokens();
    },
    
    // Set user data (for persistence)
    setUserData: (state, action) => {
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      state.isAuthenticated = !!action.payload.user && !!action.payload.tokens;
    },
    
    // Clear verification message
    clearVerificationMessage: (state) => {
      state.verificationMessage = null;
      state.emailSent = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
        state.isAuthenticated = true;
        state.error = null;
        // Set tokens in token manager for axios interceptor
        setTokens(action.payload.tokens);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.emailSent = action.payload.emailSent;
        state.verificationMessage = action.payload.message;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Email verification cases
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
        if (state.user) {
          state.user.isEmailVerified = true;
        }
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Token refresh cases
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.tokens = action.payload;
        // Set tokens in token manager for axios interceptor
        setTokens(action.payload);
      })
      .addCase(refreshToken.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.tokens = null;
        state.isAuthenticated = false;
      })
      
      // Fetch user profile cases
      .addCase(fetchUserProfile.pending, (state) => {
        state.fetchingProfile = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.fetchingProfile = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.fetchingProfile = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, logout, setUserData, clearVerificationMessage } = authSlice.actions;
export default authSlice.reducer;
