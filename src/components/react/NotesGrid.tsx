import type { NoteCardData } from '../../lib/notes';

interface Props {
  notes: NoteCardData[];
  localeCode: string;
  labels: {
    article: string;
    release: string;
    released: string;
    discussion: string;
    github: string;
  };
  compact?: boolean;
}

function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 fill-current">
      <path d="M12 .7A11.5 11.5 0 0 0 8.36 23.1c.58.1.79-.25.79-.56v-2.22c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.29-5.27-5.68 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.82 1.18 3.08 0 4.4-2.71 5.38-5.29 5.67.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}

function formatDate(value: string, localeCode: string) {
  const date = new Date(value);
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
  if (date.getUTCFullYear() !== new Date().getUTCFullYear()) options.year = 'numeric';
  return new Intl.DateTimeFormat(localeCode, { ...options, timeZone: 'UTC' }).format(date);
}

function getCategoryLabel(note: NoteCardData, labels: Props['labels']) {
  if (note.category === 'release') return note.repo || labels.release;
  if (note.category === 'discussion') return note.discussionCategory || labels.discussion;
  return labels.article;
}

function NoteCard({ note, localeCode, labels }: { note: NoteCardData; localeCode: string; labels: Props['labels'] }) {
  const isGithub = note.source === 'github';
  const releaseTag = note.tag ? `v${note.tag.replace(/^v/i, '')}` : '';
  const title = note.category === 'release' ? `${labels.released} ${releaseTag}`.trim() : note.title;
  return (
    <a
      href={note.href}
      className={`notes-card group no-underline hover:no-underline ${
        note.cardSpan === 'full' ? 'notes-card-full' : 'notes-card-half'
      }`}
    >
      {note.cardSpan === 'full' && note.coverImage && (
        <div className="notes-card-cover">
          <img src={note.coverImage} alt="" loading="lazy" decoding="async" />
        </div>
      )}
      <div className="flex min-h-0 flex-1 flex-col p-5">
        <div className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-accent">
          {isGithub && <GithubMark />}
          <span>{getCategoryLabel(note, labels)}</span>
        </div>
        <h3 className={`mt-3 font-semibold tracking-tight text-text ${note.cardSpan === 'full' ? 'text-lg' : 'text-sm leading-snug'}`}>
          {title}
        </h3>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4 font-mono text-[0.68rem] text-muted">
          <span className="truncate">{note.author}</span>
          <time dateTime={note.publishedAt}>{formatDate(note.publishedAt, localeCode)}</time>
        </div>
      </div>
    </a>
  );
}

function arrangeCells(notes: NoteCardData[]) {
  const cells: Array<{ notes: NoteCardData[]; order: number }> = [];
  let pendingHalf: { note: NoteCardData; order: number } | undefined;

  notes.forEach((note, order) => {
    if (note.cardSpan === 'full') {
      cells.push({ notes: [note], order });
      return;
    }
    if (pendingHalf) {
      cells.push({ notes: [pendingHalf.note, note], order: pendingHalf.order });
      pendingHalf = undefined;
      return;
    }
    pendingHalf = { note, order };
  });

  if (pendingHalf) cells.push({ notes: [pendingHalf.note], order: pendingHalf.order });
  return cells.sort((left, right) => left.order - right.order).map((cell) => cell.notes);
}

export default function NotesGrid({ notes, localeCode, labels, compact = false }: Props) {
  const cells = arrangeCells(notes);
  return (
    <div className={`notes-grid ${compact ? 'notes-grid-compact' : ''}`}>
      {cells.map((cell) => (
        <div
          className={
            cell[0].cardSpan === 'half'
              ? `notes-half-stack ${cell.length === 1 ? 'notes-half-stack-single' : ''}`
              : 'notes-full-cell'
          }
          key={cell.map((note) => note.href).join('|')}
        >
          {cell.map((note) => (
            <NoteCard key={note.href} note={note} localeCode={localeCode} labels={labels} />
          ))}
        </div>
      ))}
    </div>
  );
}
