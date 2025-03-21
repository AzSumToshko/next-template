import { DateTime, DateTimeFormatOptions } from 'luxon';

const formatDateTime = (
  date: string | Date,
  format: DateTimeFormatOptions = DateTime.DATETIME_FULL
): string => {
  const dt = typeof date === 'string' ? DateTime.fromISO(date) : DateTime.fromJSDate(date);
  return dt.toLocaleString(format);
};

const toRelativeTime = (date: string | Date): string | null => {
  const dt = typeof date === 'string' ? DateTime.fromISO(date) : DateTime.fromJSDate(date);
  return dt.toRelative();
};

const getWeekNumber = (date: string | Date): number => {
  const dt = typeof date === 'string' ? DateTime.fromISO(date) : DateTime.fromJSDate(date);
  return dt.weekNumber;
};

const getStartOfWeek = (
  date: string | Date,
  format: DateTimeFormatOptions = DateTime.DATE_FULL
): string => {
  const dt = typeof date === 'string' ? DateTime.fromISO(date) : DateTime.fromJSDate(date);
  return dt.startOf('week').toLocaleString(format);
};

const getEndOfWeek = (
  date: string | Date,
  format: DateTimeFormatOptions = DateTime.DATE_FULL
): string => {
  const dt = typeof date === 'string' ? DateTime.fromISO(date) : DateTime.fromJSDate(date);
  return dt.endOf('week').toLocaleString(format);
};

const addDays = (date: string | Date, days: number): string => {
  const dt = typeof date === 'string' ? DateTime.fromISO(date) : DateTime.fromJSDate(date);
  return dt.plus({ days }).toISO() || 'Invalid Date';
};

const subtractDays = (date: string | Date, days: number): string => {
  const dt = typeof date === 'string' ? DateTime.fromISO(date) : DateTime.fromJSDate(date);
  return dt.minus({ days }).toISO() || 'Invalid Date';
};

const getDayOfMonth = (date: string | Date): number => {
  const dt = typeof date === 'string' ? DateTime.fromISO(date) : DateTime.fromJSDate(date);
  return dt.day;
};

const getMonth = (date: string | Date): number => {
  const dt = typeof date === 'string' ? DateTime.fromISO(date) : DateTime.fromJSDate(date);
  return dt.month;
};

const getYear = (date: string | Date): number => {
  const dt = typeof date === 'string' ? DateTime.fromISO(date) : DateTime.fromJSDate(date);
  return dt.year;
};

const getCurrentDateTime = (): string => {
  return DateTime.now().toLocaleString(DateTime.DATETIME_FULL);
};

const getCurrentDate = (): string => {
  return DateTime.now().toLocaleString(DateTime.DATE_FULL);
};

const getCurrentTime = (): string => {
  return DateTime.now().toLocaleString(DateTime.TIME_SIMPLE);
};

export const dateTimeUtils = {
  formatDateTime,
  toRelativeTime,
  getWeekNumber,
  getStartOfWeek,
  getEndOfWeek,
  addDays,
  subtractDays,
  getDayOfMonth,
  getMonth,
  getYear,
  getCurrentDateTime,
  getCurrentDate,
  getCurrentTime,
};
