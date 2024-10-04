export const DEFAULT_LOCALE: string = 'it-IT';
export const DEFAULT_LOCALE_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
};

export const formatDate = (timestamp: string, locale = DEFAULT_LOCALE, localeOptions = DEFAULT_LOCALE_OPTIONS) => {
  return new Date(parseInt(timestamp) * 1000).toLocaleString(locale, localeOptions);
};
