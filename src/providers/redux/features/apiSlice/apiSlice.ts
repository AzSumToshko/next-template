import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',

    // eslint-disable-next-line no-unused-vars
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('authorization', `${token}`);
      }

      return headers;
    },
  }),
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});
