export type Locale = (typeof locales)[number];

export const locales = ['ru', 'uz', 'oz'] as const;
export const defaultLocale: Locale = 'uz';