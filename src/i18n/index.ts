import { siteConfig } from '../../config/site.ts';
import type { LocaleId, UiStrings } from './types.ts';

import ar from './ar.json';
import de from './de.json';
import en from './en.json';
import es from './es.json';
import fr from './fr.json';
import ja from './ja.json';
import ru from './ru.json';
import zh from './zh.json';

const uiByLocale: Record<LocaleId, UiStrings> = { en, zh, es, ru, ar, fr, ja, de };

const ogLocaleMap: Record<LocaleId, string> = {
  en: 'en_US',
  zh: 'zh_CN',
  es: 'es_ES',
  ru: 'ru_RU',
  ar: 'ar_SA',
  fr: 'fr_FR',
  ja: 'ja_JP',
  de: 'de_DE',
};

export type { LocaleId, UiStrings };

export function getLocaleConfig(id: LocaleId) {
  const locale = siteConfig.locales.find((item) => item.id === id);
  if (!locale) throw new Error(`Unknown locale: ${id}`);
  return locale;
}

export function getLocaleFromPathParam(pathParam: string): LocaleId {
  const locale = siteConfig.locales.find((item) => item.path === pathParam);
  if (!locale || locale.id === 'en') throw new Error(`Invalid locale path: ${pathParam}`);
  return locale.id;
}

export function getUiStrings(locale: LocaleId): UiStrings {
  return uiByLocale[locale];
}

export function localePath(locale: LocaleId, pathname = '/'): string {
  const config = getLocaleConfig(locale);
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (config.path === '') return normalized === '/' ? '/' : normalized;
  if (normalized === '/') return `/${config.path}/`;
  return `/${config.path}${normalized}`;
}

export function stripLocalePrefix(pathname: string): { locale: LocaleId; path: string } {
  for (const locale of siteConfig.locales) {
    if (locale.id === 'en') continue;
    const prefix = `/${locale.path}`;
    if (pathname === prefix || pathname === `${prefix}/`) {
      return { locale: locale.id, path: '/' };
    }
    if (pathname.startsWith(`${prefix}/`)) {
      return { locale: locale.id, path: pathname.slice(prefix.length) || '/' };
    }
  }
  return { locale: 'en', path: pathname || '/' };
}

export function getOgLocale(locale: LocaleId): string {
  return ogLocaleMap[locale];
}

export interface HreflangAlternate {
  hreflang: string;
  href: string;
}

export function getHreflangAlternates(pathWithoutLocale: string): HreflangAlternate[] {
  const normalized = pathWithoutLocale.startsWith('/') ? pathWithoutLocale : `/${pathWithoutLocale}`;

  const alternates: HreflangAlternate[] = siteConfig.locales.flatMap((locale) =>
    locale.codes.map((code) => ({
      hreflang: code,
      href: new URL(localePath(locale.id, normalized), siteConfig.site.url).href,
    })),
  );

  alternates.push({
    hreflang: 'x-default',
    href: new URL(localePath('en', normalized), siteConfig.site.url).href,
  });

  return alternates;
}

export function getNonDefaultLocales() {
  return siteConfig.locales.filter((locale) => locale.id !== 'en');
}

export function formatTemplate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));
}
