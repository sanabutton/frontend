import { useEffect, useRef, useState, useCallback } from 'react';
import { Props } from '.';

export function useEnhance(props: Props) {
  const [value, setValue] = useState('');
  const timeoutId = useRef<number | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);

  useEffect(() => {
    timeoutId.current = setTimeout(() => props.onSearch && props.onSearch(value), 1000);

    return () => {
      timeoutId.current && clearTimeout(timeoutId.current);
    };
  }, [props.onSearch, value]);

  useEffect(() => {
    const handler = () => {
      const top = document.documentElement.scrollTop;
      const el = ref.current;

      if (!el) return;

      if (top > 0) el.style.opacity = '1';
      else el.style.opacity = '0';
    };

    document.addEventListener('scroll', handler, true);

    return () => document.removeEventListener('scroll', handler);
  }, []);

  return {
    ref,
    value,
    onChange,
  };
}
