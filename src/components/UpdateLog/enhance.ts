import { Props, Log } from '.';
import { useMemo } from 'react';
import { format } from 'date-fns';

export function useEnhance(props: Props) {
  const createLogs = useMemo(
    () =>
      props.logs
        .filter((log) => !log.updatedAt)
        .map((log) => ({
          ...log,
          date: format(log.createdAt, 'yyyy/MM/dd'),
        }))
        .sort((log1, log2) => (log1.createdAt < log2.createdAt ? 1 : -1))
        .slice(0, 7),
    [props.logs],
  );
  const updateLogs = useMemo(
    () =>
      props.logs
        .filter((log): log is Required<Log> => !!log.updatedAt)
        .map((log) => ({
          ...log,
          date: format(log.updatedAt, 'yyyy/MM/dd'),
        }))
        .sort((log1, log2) => (log1.updatedAt < log2.updatedAt ? 1 : -1))
        .slice(0, 7),
    [props.logs],
  );

  return {
    createLogs,
    updateLogs,
  };
}
