import { Props } from '.';
import { useMemo } from 'react';
import { isEqual } from 'date-fns';

export function useEnhance(props: Props) {
  const createLogs = useMemo(() => props.logs.filter((log) => isEqual(log.createdAt, log.updatedAt)), [props.logs]);
  const updateLogs = useMemo(() => props.logs.filter((log) => !isEqual(log.createdAt, log.updatedAt)), [props.logs]);

  return {
    createLogs,
    updateLogs,
  };
}
