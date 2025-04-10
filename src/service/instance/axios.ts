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

// Flag to prevent infinite loops
let isGettingSession = false;

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  async (config) => {
    // Skip token retrieval for auth endpoints and when already fetching session
    if (
      isGettingSession ||
      config.url?.includes('auth') ||
      // Skip for auth client's own requests to prevent infinite loops
      config.url?.includes('session') ||
      // If this is a request to the auth service
      (typeof config.url === 'string' &&
        (config.url.includes('better-auth') || config.url.includes('/api/auth')))
    ) {
      return config;
    }

    try {
      isGettingSession = true;

      // Get token from localStorage first to avoid unnecessary requests
      let token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

      // Only call getSession if we don't have a token in localStorage
      if (!token) {
        try {
          // Get the token from response headers as shown in page.tsx callProtectedAPI
          await authClient.getSession({
            fetchOptions: {
              onSuccess: (ctx) => {
                token = ctx.response.headers.get('set-auth-jwt');

                // Save the token for future use
                if (token && typeof window !== 'undefined') {
                  localStorage.setItem('auth_token', token);
                }
              },
            },
          });
        } catch (sessionError) {
          console.error('Session retrieval error:', sessionError);
        }
      }

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving auth token:', error);
    } finally {
      isGettingSession = false;
    }

    return config;
  },
  (error) => {
    isGettingSession = false;
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here (401, 403, 500, etc.)
    if (error.response?.status === 401) {
      // Clear invalid token
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }

      // Handle unauthorized access
      // e.g., redirect to login page
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
