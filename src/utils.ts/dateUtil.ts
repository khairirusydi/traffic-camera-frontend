import { formatInTimeZone } from 'date-fns-tz';

export const formatDateTimeForApi = (dateTime: string) => {
  const format = "yyyy-MM-dd'T'HH:mm:ss";
  const date = new Date(dateTime);

  return formatInTimeZone(date, 'Asia/Singapore', format);
};
