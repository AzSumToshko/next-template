import { useEffect } from 'react';
import useTimeout from './useTimeout';

// For more info, refer to this: https://dev.to/arafat4693/15-useful-react-custom-hooks-that-you-can-use-in-any-project-2ll8

export default function useDebounce(callback: () => void, delay: number, dependencies: any[]) {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
}
