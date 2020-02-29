import { Props } from '.';
import { useMemo } from 'react';
import { isEqual, format } from 'date-fns';

export function useEnhance(props: Props) {
  const createLogs = useMemo(
    () =>
      props.logs
        .filter((log) => isEqual(log.createdAt, log.updatedAt))
        .map((log) => ({
          ...log,
          date: format(log.createdAt, 'yyyy/MM/dd'),
        })),
    [props.logs],
  );
  const updateLogs = useMemo(
    () =>
      props.logs
        .filter((log) => !isEqual(log.createdAt, log.updatedAt))
        .map((log) => ({
          ...log,
          date: format(log.updatedAt, 'yyyy/MM/dd'),
        })),
    [props.logs],
  );

  return {
    createLogs,
    updateLogs,
  };
}
