import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './config';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  return {
    messages: (await import(`../lib/translations/${locale}.json`)).default
  };
});