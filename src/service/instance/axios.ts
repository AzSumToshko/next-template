import axios from 'axios';
import { authClient } from '@/auth/auth-client';

/**
 * Configured Axios instance with default settings
 * for all API requests in the application
 */
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8877/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // Get token from authClient session
      let token = null;

      await authClient.getSession({
        fetchOptions: {
          onSuccess: (ctx) => {
            token = ctx.response.headers.get('set-auth-jwt');
          },
        },
      });

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving auth token:', error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here (401, 403, 500, etc.)
    if (error.response?.status === 401) {
      // Handle unauthorized access
      // e.g., redirect to login page
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
