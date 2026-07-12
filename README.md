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
npm run sync:stars
npm run dev
npm run build
npm run lint
npm run preview
```

## Project layout

```text
config/site.ts          Public site configuration (source of truth)
src/pages/              Routes (English at root)
src/content/services/   Service page Markdown
src/components/         Astro and React UI
src/data/repos.json     GitHub star counts (generated)
scripts/                Sync and validation utilities
public/                 Static assets, robots.txt, llms.txt, CNAME
```

## Deploy

Push to `master` triggers `.github/workflows/deploy.yml` (GitHub Pages).
