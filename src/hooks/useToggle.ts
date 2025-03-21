import { useState } from 'react';

// For more info, refer to this: https://dev.to/arafat4693/15-useful-react-custom-hooks-that-you-can-use-in-any-project-2ll8

export default function useToggle(defaultValue: boolean) {
  const [value, setValue] = useState<boolean>(defaultValue);

  function toggleValue(value: boolean | undefined) {
    setValue((currentValue: boolean) => (typeof value === 'boolean' ? value : !currentValue));
  }

  return [value, toggleValue];
}
