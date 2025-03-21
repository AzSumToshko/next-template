import { useRef } from 'react';

// For more info, refer to this: https://dev.to/arafat4693/15-useful-react-custom-hooks-that-you-can-use-in-any-project-2ll8

export default function usePrevious<T>(value: T): T | undefined {
  const currentRef = useRef(value);
  const previousRef = useRef<T | undefined>();

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
}
