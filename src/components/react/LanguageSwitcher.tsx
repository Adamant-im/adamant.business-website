import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../../../config/site.ts';
import { localePath, type LocaleId } from '../../i18n';

interface Props {
  locale: LocaleId;
  label: string;
  currentPath: string;
}

export default function LanguageSwitcher({ locale, label, currentPath }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = siteConfig.locales.find((item) => item.id === locale);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="rounded-md border border-border px-3 py-1.5 font-mono text-xs text-text transition hover:border-ember/50"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((value) => !value)}
      >
        {current?.label ?? locale.toUpperCase()}
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute end-0 z-50 mt-1 min-w-[10rem] rounded-md border border-border bg-card py-1 shadow-lg"
        >
          {siteConfig.locales
            .filter((item) => item.id !== locale)
            .map((item) => {
            const href = localePath(item.id, currentPath);
            return (
              <li key={item.id} role="option">
                <a
                  href={href}
                  className="block px-3 py-2 text-sm text-text no-underline hover:bg-bg hover:no-underline"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
