'use client';

import { Provider } from 'react-redux';
import { store } from './app/store';

interface ReduxProviderProps {
  children: React.ReactNode;
}

/**
 * Redux Provider component for wrapping the application with Redux store
 */
export function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
