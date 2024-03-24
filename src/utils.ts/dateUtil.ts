import { formatInTimeZone } from 'date-fns-tz';

export const formatDateTimeForApi = (dateTime: string) => {
  const format = "yyyy-MM-dd'T'HH:mm:ss";
  const date = new Date(dateTime);

  return formatInTimeZone(date, 'Asia/Singapore', format);
};

export const formatAddNewQueryDateTime = (dateTime: string) => {
  const format = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
  const date = new Date(dateTime);

  return formatInTimeZone(date, 'Asia/Singapore', format);
};

export const formatDateTimeForDisplay = (dateTime: string) => {
  const format = "dd MMM yyyy HH:mm:ss a";
  const date = new Date(dateTime);

  return formatInTimeZone(date, 'Asia/Singapore', format);
};
