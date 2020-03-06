import { useEffect, useRef, useState, useCallback } from 'react';
import { Props } from '.';

export function useEnhance(props: Props) {
  const [value, setValue] = useState('');
  const timeoutId = useRef<number | null>(null);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);

  useEffect(() => {
    timeoutId.current = setTimeout(() => props.onSearch && props.onSearch(value), 1000);

    return () => {
      timeoutId.current && clearTimeout(timeoutId.current);
    };
  }, [props.onSearch, value]);

  return {
    value,
    onChange,
  };
}
