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
npm run test:content
npm run sync:stars
npm run sync:content -- --no-pr
npm run remove:content -- --slug example-note --no-pr
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

## Incremental Engineering notes publishing

The incremental pipeline checks the configured Medium feed, every configured GitHub Release repository, and initial posts in the configured GitHub Discussions repository. Discussion comments are never imported, and an initial Discussion post is eligible only when its author is a current `Adamant-im` organization member.

Normal discovery skips stable source IDs already recorded in `content/.sync-state.json` and entries in its committed `exclusions` list. Remote Medium and GitHub-hosted images are downloaded, converted to WebP, and referenced from `public/images/engineering-notes/`. A local run also preserves the localized original under the ignored `content/original/` tree; GitHub Actions does not save original source files.

Local runs require `OPENROUTER_API_KEY`; `npm run sync:content` loads it from a local `.env` when present without overriding an exported environment variable. GitHub authentication is resolved from `PAT_GITHUB_TOKEN`, `GH_TOKEN`, `GITHUB_TOKEN`, or the active `gh` CLI session. The scheduled workflow requires repository secrets `OPENROUTER_API_KEY` and `PAT_GITHUB_TOKEN`; the PAT is used so content PR and merge events trigger the normal GitHub workflows.

Run discovery across all three sources and generate content locally without creating a PR:

```bash
OPENROUTER_API_KEY=<key> npm run sync:content -- --no-pr
```

Process one publication, overwriting an existing generated note when present:

```bash
OPENROUTER_API_KEY=<key> npm run sync:content -- --url https://github.com/Adamant-im/adamant/releases/tag/v0.10.0 --no-pr
```

Supported URLs may use HTTP or HTTPS, include or omit `www`, and include query parameters. Use `--force` with `--url` to process an explicitly excluded publication. Omit `--no-pr` to create one content branch and PR per publication. Add `--no-merge` to leave each PR open for manual review.

Content PRs target `master`, use squash merging, and include the original title, source URL, author, date, type, source ID, repository or Discussion category, and generated locales. The repository currently has no approval rule on `master`, so WRITE access can merge after local validation without an approval bypass. If protection rules are added later, use `--no-merge` or provide an ADMIN token that can satisfy the new policy.

Remove a publication from every locale, delete its owned images, and add it to exclusions:

```bash
npm run remove:content -- --url https://news.adamant.im/example-abcdef123456 --no-pr
npm run remove:content -- --slug example-abcdef123456 --no-pr
```

Removal creates and squash-merges a PR by default. It still adds the URL or slug to exclusions when no current note matches. The single-hyphen compatibility form `-slug` is also accepted.

The scheduled workflow runs from `.github/workflows/sync-content.yml` at the cron in `config/site.ts`. A merge to `master` triggers the existing Pages deployment workflow and rebuilds the site.

## Deploy

Push to `master` triggers `.github/workflows/deploy.yml` (GitHub Pages).
