import { useEffect, useId, useRef, useState } from 'react';
import { siteConfig } from '../../../config/site.ts';
import type { UiStrings } from '../../i18n/types.ts';

type Variant = 'header' | 'primary' | 'secondary';

interface Props {
  variant?: Variant;
  label?: string;
  strings: UiStrings['contact'];
}

export default function ContactModal({ variant = 'primary', label, strings }: Props) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const { contact } = siteConfig;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  const buttonClass =
    variant === 'header'
      ? 'btn-secondary !px-3 !py-1.5 text-xs sm:text-sm'
      : variant === 'secondary'
        ? 'btn-secondary'
        : 'btn-primary';

  const buttonLabel = label ?? strings.primaryCta;

  return (
    <>
      <button type="button" className={buttonClass} onClick={() => setOpen(true)}>
        {buttonLabel}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="fixed top-1/2 left-1/2 w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-card p-0 text-text shadow-xl backdrop:bg-black/40 open:flex open:flex-col"
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setOpen(false);
        }}
      >
        <div className="border-b border-border px-6 py-4">
          <h2 id={titleId} className="text-lg font-semibold">
            {strings.title}
          </h2>
          <p className="mt-1 text-sm text-muted">{strings.subtitle}</p>
        </div>

        <div className="space-y-4 px-6 py-5 text-sm">
          <div>
            <div className="font-medium text-text">{strings.email}</div>
            <a className="text-accent" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </div>
          <div>
            <div className="font-medium text-text">{strings.adamant}</div>
            <a className="text-accent break-all" href={contact.adamantMessenger}>
              {strings.openAdamant}
            </a>
          </div>
          <div>
            <div className="font-medium text-text">{strings.telegram}</div>
            <a className="text-accent" href={contact.telegramUrl}>
              {contact.telegram}
            </a>
          </div>
        </div>

        <div className="border-t border-border px-6 py-4">
          <button type="button" className="btn-secondary w-full" onClick={() => setOpen(false)}>
            {strings.close}
          </button>
        </div>
      </dialog>
    </>
  );
}
