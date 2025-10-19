import axios from "axios";
import { getTokens, clearTokens, setTokens } from "./tokenManager.js";

// Your global default settings
console.log("axios.defaults.baseURL", import.meta.env.VITE_API_URL);
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
console.log("Axios Base URL:", axios.defaults.baseURL);
axios.defaults.withCredentials = true;

// Request interceptor to add auth token
axios.interceptors.request.use(
  (config) => {
    const tokens = getTokens();
    if (tokens && tokens.accessToken) {
      // Remove 'Bearer ' prefix if it exists
      const accessToken = tokens.accessToken.replace('Bearer ', '');
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const tokens = getTokens();
        if (tokens && tokens.refreshToken) {
          // Try to refresh the token
          const response = await axios.post('/users/refresh-token', {
            refreshToken: tokens.refreshToken
          }, {
            withCredentials: true,
          });
          
          if (response.data.tokens) {
            // Update tokens in token manager
            setTokens(response.data.tokens);
            
            // Retry the original request with new token
            const newToken = response.data.tokens.accessToken.replace('Bearer ', '');
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axios(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // If refresh fails, clear tokens and redirect to login
        clearTokens();
        sessionStorage.removeItem('persist:auth');
        window.location.href = '/';
      }
    }
    
    return Promise.reject(error);
  }
);

export default axios;