import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/apiSlice/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
