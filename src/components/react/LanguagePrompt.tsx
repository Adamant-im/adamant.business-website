import { useEffect, useState } from 'react';
import { siteConfig } from '../../../config/site.ts';
import { localePath, type LocaleId } from '../../i18n';

const STORAGE_KEY = 'preferredLanguage';

interface Props {
  locale: LocaleId;
  keepEnglish: string;
  promptPrefix: string;
}

function detectBrowserLocale(): LocaleId | null {
  if (typeof navigator === 'undefined') return null;

  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of languages) {
    const normalized = tag.toLowerCase();
    for (const locale of siteConfig.locales) {
      if (locale.id === 'en') continue;
      if (locale.codes.some((code) => normalized === code.toLowerCase() || normalized.startsWith(`${code.toLowerCase()}-`))) {
        return locale.id;
      }
    }
  }
  return null;
}

export default function LanguagePrompt({ locale, keepEnglish, promptPrefix }: Props) {
  const [suggested, setSuggested] = useState<LocaleId | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (locale !== 'en') return;

    const pathname = window.location.pathname;
    const hasLocalePrefix = siteConfig.locales.some(
      (item) => item.path && (pathname === `/${item.path}` || pathname.startsWith(`/${item.path}/`)),
    );
    if (hasLocalePrefix) return;

    const stored = localStorage.getItem(STORAGE_KEY) as LocaleId | null;
    if (stored) return;

    const detected = detectBrowserLocale();
    if (detected) setSuggested(detected);
  }, [locale]);

  if (!suggested || dismissed || locale !== 'en') return null;

  const target = siteConfig.locales.find((item) => item.id === suggested);
  if (!target) return null;

  const goToLocale = () => {
    localStorage.setItem(STORAGE_KEY, suggested);
    window.location.href = localePath(suggested, window.location.pathname);
  };

  const keepEnglishChoice = () => {
    localStorage.setItem(STORAGE_KEY, 'en');
    setDismissed(true);
  };

  return (
    <div
      aria-live="polite"
      aria-label="Language suggestion"
      className="absolute end-0 top-full z-40 mt-2 w-[min(18rem,calc(100vw-2rem))] rounded-md border border-border bg-card p-3 text-sm shadow-lg"
    >
      <p className="text-muted">
        {promptPrefix} <span className="font-medium text-text">{target.label}</span>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="btn-primary !px-3 !py-1.5 text-xs" onClick={goToLocale}>
          {target.label}
        </button>
        <button type="button" className="btn-secondary !px-3 !py-1.5 text-xs" onClick={keepEnglishChoice}>
          {keepEnglish}
        </button>
      </div>
    </div>
  );
}

export function usePreferredLanguageHighlight(locale: LocaleId): boolean {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setHighlight(stored === locale);
  }, [locale]);

  return highlight;
}
