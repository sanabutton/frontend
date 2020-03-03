import { isDate, set } from 'date-fns';

export function toDate(s: string) {
  const d = new Date(s);
  const isCorrectDate = (d1: Date) => isDate(d1) && d.getFullYear() >= 2018;
  const setDate = {
    year: 2017,
    month: 3,
    date: 7,
  };

  return isCorrectDate(d) ? d : set(d, setDate);
}
