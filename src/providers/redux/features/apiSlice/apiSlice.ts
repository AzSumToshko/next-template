import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Base API slice for handling API requests with RTK Query
 */
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8877/api/v1',

    // Use synchronous function to avoid async issues that can cause infinite loops
    prepareHeaders: (headers, { getState }) => {
      // Get the token from localStorage only - don't make additional requests
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

      // Add authorization header if token exists
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      // Add content type for JSON
      headers.set('Content-Type', 'application/json');

      return headers;
    },

    // Add validation and error handling
    validateStatus: (response, result) => {
      return response.status >= 200 && response.status < 300;
    },
  }),

  // Define tag types for cache invalidation
  tagTypes: ['Cars', 'User', 'Settings'],

  // Endpoints will be injected in separate files
  endpoints: () => ({}),
});
