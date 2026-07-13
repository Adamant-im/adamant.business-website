import { getCollection, type CollectionEntry } from 'astro:content';

import { localePath, type LocaleId } from '../i18n';

export const HOME_NOTES_GRID_CELLS = 4;
export const NOTES_GRID_CELLS = 12;
const GRID_UNITS_PER_CELL = 2;

export type NoteEntry = CollectionEntry<'notes'>;

export interface NoteCardData {
  title: string;
  description: string;
  category: NoteEntry['data']['category'];
  source: NoteEntry['data']['source'];
  publishedAt: string;
  author: string;
  repo?: string;
  tag?: string;
  discussionCategory?: string;
  coverImage?: string;
  cardSpan: NoteEntry['data']['cardSpan'];
  href: string;
}

export async function getNotesForLocale(locale: LocaleId): Promise<NoteEntry[]> {
  const entries = await getCollection('notes', ({ data }) => data.locale === locale);
  return entries.sort(
    (left, right) => right.data.publishedAt.getTime() - left.data.publishedAt.getTime(),
  );
}

function paginateNotes(entries: NoteEntry[], cellCapacity: number): NoteEntry[][] {
  const unitCapacity = cellCapacity * GRID_UNITS_PER_CELL;
  const pages: NoteEntry[][] = [];
  let page: NoteEntry[] = [];
  let usedUnits = 0;

  for (const entry of entries) {
    const entryUnits = entry.data.cardSpan === 'half' ? 1 : GRID_UNITS_PER_CELL;
    if (page.length > 0 && usedUnits + entryUnits > unitCapacity) {
      pages.push(page);
      page = [];
      usedUnits = 0;
    }
    page.push(entry);
    usedUnits += entryUnits;
  }

  if (page.length > 0) pages.push(page);
  return pages.length > 0 ? pages : [[]];
}

export function getNotesPageCount(entries: NoteEntry[], cellCapacity = NOTES_GRID_CELLS): number {
  return paginateNotes(entries, cellCapacity).length;
}

export function getNotesPage(
  entries: NoteEntry[],
  page: number,
  cellCapacity = NOTES_GRID_CELLS,
): NoteEntry[] {
  return paginateNotes(entries, cellCapacity)[page - 1] ?? [];
}

export function noteIndexPath(locale: LocaleId, page = 1): string {
  const base = localePath(locale, '/engineering-notes');
  return page === 1 ? base : `${base}/page/${page}`;
}

export function noteDetailPath(locale: LocaleId, slug: string): string {
  return localePath(locale, `/engineering-notes/${slug}`);
}

export function toNoteCard(entry: NoteEntry, locale: LocaleId): NoteCardData {
  return {
    title: entry.data.title,
    description: entry.data.description,
    category: entry.data.category,
    source: entry.data.source,
    publishedAt: entry.data.publishedAt.toISOString(),
    author: entry.data.author,
    repo: entry.data.repo,
    tag: entry.data.tag,
    discussionCategory: entry.data.discussionCategory,
    coverImage: entry.data.coverImage,
    cardSpan: entry.data.cardSpan,
    href: noteDetailPath(locale, entry.data.slug),
  };
}
