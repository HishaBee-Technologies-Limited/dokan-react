import { format, startOfMonth } from 'date-fns';

export const formatDate = (date: string) => {
  return format(new Date(date), 'dd MMM yyyy');
};

export const getFormattedStartOfMonth = () =>
  format(startOfMonth(new Date()), 'yyyy-MM-dd');

export const getFormattedToday = () => format(new Date(), 'yyyy-MM-dd');
