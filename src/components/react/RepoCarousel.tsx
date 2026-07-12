import { useState } from 'react';

export interface RepoEntry {
  name: string;
  description: string;
  stars: number;
  url: string;
}

interface Props {
  repos: RepoEntry[];
}

export default function RepoCarousel({ repos }: Props) {
  const [index, setIndex] = useState(0);
  const visible = 3;
  const maxIndex = Math.max(0, repos.length - visible);

  const slice = repos.slice(index, index + visible);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {slice.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            className="group block rounded-xl border border-dark-border bg-dark-card p-5 no-underline transition hover:border-ember/60 hover:bg-white/5"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-mono text-sm font-medium text-white group-hover:text-ember-bright">
                {repo.name}
              </h3>
              <span className="shrink-0 rounded-full border border-dark-border bg-white/5 px-2 py-0.5 font-mono text-xs text-dark-muted">
                ★ {repo.stars.toLocaleString()}
              </span>
            </div>
            <p className="mt-2 text-sm text-dark-muted">{repo.description}</p>
          </a>
        ))}
      </div>

      {repos.length > visible && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            className="btn-secondary !border-dark-border !bg-transparent !text-white hover:!border-ember/60 disabled:opacity-40"
            disabled={index === 0}
            onClick={() => setIndex((value) => Math.max(0, value - 1))}
            aria-label="Previous repositories"
          >
            Previous
          </button>
          <span className="text-sm text-dark-muted">
            {index + 1}–{Math.min(index + visible, repos.length)} of {repos.length}
          </span>
          <button
            type="button"
            className="btn-secondary !border-dark-border !bg-transparent !text-white hover:!border-ember/60 disabled:opacity-40"
            disabled={index >= maxIndex}
            onClick={() => setIndex((value) => Math.min(maxIndex, value + 1))}
            aria-label="Next repositories"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
