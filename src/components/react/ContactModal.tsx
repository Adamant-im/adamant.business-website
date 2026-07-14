import { useEffect, useId, useRef, useState } from 'react';
import { siteConfig } from '../../../config/site.ts';
import type { UiStrings } from '../../i18n/types.ts';

type Variant = 'header' | 'primary' | 'secondary';

interface Props {
  variant?: Variant;
  label?: string;
  strings: UiStrings['contact'];
  openFromHash?: boolean;
}

const CONTACT_HASH = '#contact';

export default function ContactModal({ variant = 'primary', label, strings, openFromHash = false }: Props) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const generatedDialogId = useId();
  const titleId = useId();
  const descriptionId = useId();
  const { contact } = siteConfig;
  const dialogId = openFromHash ? 'contact' : generatedDialogId;

  const closeModal = () => {
    setOpen(false);
    if (openFromHash && window.location.hash.toLowerCase() === CONTACT_HASH) {
      window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}`);
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    if (!openFromHash) return;

    const syncWithHash = () => setOpen(window.location.hash.toLowerCase() === CONTACT_HASH);
    syncWithHash();
    window.addEventListener('hashchange', syncWithHash);
    return () => window.removeEventListener('hashchange', syncWithHash);
  }, [openFromHash]);

  const buttonClass =
    variant === 'header'
      ? 'btn-secondary !px-3 !py-1.5 text-xs sm:text-sm'
      : variant === 'secondary'
        ? 'btn-secondary'
        : 'btn-primary';

  const buttonLabel = label ?? strings.primaryCta;

  return (
    <>
      <button
        type="button"
        className={buttonClass}
        aria-controls={dialogId}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        {buttonLabel}
      </button>

      <dialog
        id={dialogId}
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="fixed top-1/2 left-1/2 w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-card p-0 text-text shadow-xl backdrop:bg-black/40 open:flex open:flex-col"
        onClose={closeModal}
        onCancel={(event) => {
          event.preventDefault();
          closeModal();
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeModal();
        }}
      >
        <div className="border-b border-border px-6 py-4">
          <h2 id={titleId} className="text-lg font-semibold">
            {strings.title}
          </h2>
          <p id={descriptionId} className="mt-1 text-sm text-muted">{strings.subtitle}</p>
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
          <button type="button" className="btn-secondary w-full" onClick={closeModal}>
            {strings.close}
          </button>
        </div>
      </dialog>
    </>
  );
}
