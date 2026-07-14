# cryptofoundry

cryptofoundry: We build and maintain self-hosted crypto software, bots, payments and infrastructure — by the engineers behind an open-source blockchain ecosystem developed since 2016.

Public site: [adamant.business](https://adamant.business)

## Stack

- [Astro](https://astro.build/) 7 (static output)
- Tailwind CSS 4
- React islands (contact modal, repo carousel)
- Astro Content Collections (Markdown)
- GitHub Pages + Cloudflare (DNS)

## Commands

```bash
npm ci --ignore-scripts
npm run validate:config
npm run validate:notes
npm run sync:stars
npm run dev
npm run build
npm run validate:seo
npm run lint
npm run preview
```

## Project layout

```text
config/site.ts          Public site configuration (source of truth)
src/pages/              Routes (English at root)
src/content/services/   Service page Markdown
src/content/notes/      Engineering notes by locale
content/original/       Imported English source material
src/components/         Astro and React UI
src/data/repos.json     GitHub star counts (generated)
scripts/                Sync and validation utilities
public/                 Static assets, robots.txt, CNAME
src/pages/llms.txt.ts   Generated multilingual AI-readable site index
```

## Historical engineering notes import

The one-time historical import runs without OpenRouter or other AI processing. English notes preserve source content. The other seven locales receive the same metadata and an explicit lorem-ipsum placeholder body until the later summary and translation stage.

Medium exports are read from `.ai-ignored/medium-posts/<user>/posts/`. Only posts published through `news.adamant.im` are imported; personal posts and Medium responses are excluded. Publication checks are cached in the ignored archive directory. Missing source images are cached under `.ai-ignored/medium-posts/<user>/images/<post_name>/`; optimized WebP copies are generated under `public/images/engineering-notes/medium/` and committed for later summaries.

GitHub imports require an authenticated token in `PAT_GITHUB_TOKEN`. The token must include access to organization membership and public repository data. Import scripts never print the token.

```bash
npm run import:medium
PAT_GITHUB_TOKEN=<token> npm run import:releases
PAT_GITHUB_TOKEN=<token> npm run import:discussions
npm run validate:notes
```

To run all three sources in order:

```bash
PAT_GITHUB_TOKEN=<token> npm run import:historical
```

The Discussions importer refreshes current `Adamant-im` organization membership on every run and imports only initial posts authored by those members. Historical imports are idempotent through stable source IDs and `content/.sync-state.json`.

Imported original source files under `content/original/` are local-only and git-ignored. Generated site content and optimized publication images remain versioned.

Scheduled source synchronization, AI summaries, and translated summaries are intentionally not part of this branch.

## Deploy

Push to `master` triggers `.github/workflows/deploy.yml` (GitHub Pages).
