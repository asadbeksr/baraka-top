export type Locale = (typeof locales)[number];

export const locales = ['ru', 'uz-Latn', 'uz-Cyrl'] as const;
export const defaultLocale: Locale = 'uz-Latn';