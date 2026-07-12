# cryptofoundry Business Website: AI Agent Operating Manual

This document defines how AI agents must work in this repository.

## Mission

This repository hosts the cryptofoundry business website — the public-facing site for cryptofoundry.

**cryptofoundry** creates, maintains, and develops delightful software in the crypto space. It is an organization that provides such services to interested clients and receives compensation in cryptocurrency.

cryptofoundry is a **separate and independent organization** from the ADAMANT developer community. It actively participates in ADAMANT development, but it is not the same entity as the ADAMANT community or its governance.

Agent output must optimize for:

1. Clarity and accuracy of public-facing content
2. Security and privacy in forms, integrations, and deployment
3. Maintainability and contributor-friendly structure
4. Consistency with ADAMANT organization conventions where this repository follows them

If tradeoffs are required, preserve correctness and security first.

## Language Policy

- Developers may communicate with AI in any language
- All repository artifacts must be in English only
- Write all code, comments, commit messages, docs, and PR text in English

## Writing Style

- Use concise, operational wording over marketing language
- Write the organization name as **cryptofoundry** (all lowercase) in all repository artifacts — not `Cryptofoundry`, `CryptoFoundry`, or `CRYPTOFOUNDRY`
- In bullet and numbered lists, do not add a trailing period when an item contains one sentence
- If an item contains two or more sentences, end every sentence with a period

## Markdown Lint Rules for AI-Generated Docs

- For every Markdown list, keep one blank line before the list and one blank line after the list
- Always keep a blank line between a heading and the list that follows it to satisfy MD032 (`blanks-around-lists`)
- Use fenced code blocks with matching opening and closing fences and include a language tag when applicable
- Follow other best-practice Markdown rules used in this repository

## Product Context and Values

cryptofoundry builds and maintains self-hosted crypto software, bots, payments, and infrastructure for clients. It is independent from the ADAMANT developer community, while many of its engineers also contribute to the ADAMANT open-source ecosystem (since 2016).

When making decisions in this repository, agents should:

- Keep public content accurate, current, and easy to maintain
- Use the lowercase name **cryptofoundry** consistently
- Do not present cryptofoundry as identical to, or synonymous with, the ADAMANT community or ADAMANT governance
- Avoid introducing tracking, analytics, or hidden third-party data collection unless explicitly requested and justified
- Prefer simple, accessible implementations over premature complexity
- Preserve alignment with ADAMANT organization documentation and governance where applicable to shared workflows (issues, labels, PRs)

## Sources of Truth

Use these sources when implementing or reviewing changes:

- This repository: `README.md`, current code, and passing validation commands
- ADAMANT organization agent baseline: [adamant/AGENTS.md](https://github.com/Adamant-im/adamant/blob/dev/AGENTS.md)
- Org-wide issue and label governance: [Adamant-im/.github](https://github.com/Adamant-im/.github)
- Recommended issue title prefixes: [org discussion #5](https://github.com/orgs/Adamant-im/discussions/5)
- Recommended labels: [org discussion #1](https://github.com/orgs/Adamant-im/discussions/1)

If sources disagree:

1. Treat current repository behavior and passing validation as implementation truth
2. Do not silently ignore mismatches; document them and propose synchronized fixes

## Issue, Label, and PR Conventions

Follow organization-wide conventions:

- Governance repository: [Adamant-im/.github](https://github.com/Adamant-im/.github)
- Prefix guidance: [org discussion #5](https://github.com/orgs/Adamant-im/discussions/5)
- Label guidance: [org discussion #1](https://github.com/orgs/Adamant-im/discussions/1)

### Issue workflow

When creating an issue in this repository:

1. Search existing issues first to avoid duplicates
2. Use org issue forms (Bug / Feature request / Task) from org defaults where available
3. Start the title with one concise prefix
4. Apply labels from the org label catalog (`labels.json`) when they exist in this repository
5. Link related issues and PRs explicitly

### Recommended title prefixes for Issues

Use one or two prefixes maximum:

- `[Bug]` bug, crash, wrong behavior
- `[Feat]` new functionality
- `[Enhancement]` improvement of existing functionality
- `[Refactor]` internal refactoring without behavior change
- `[Docs]` documentation updates
- `[Test]` testing work
- `[Chore]` maintenance and routine technical tasks
- `[Task]` general task (including operations, release, or admin work)
- `[Composite]` multi-part task with sub-tasks
- `[UX/UI]` user experience or interface work
- `[Proposal]`, `[Idea]`, `[Discussion]` mostly for forum-level ideation

### Label policy

- `labels.json` in `Adamant-im/.github` is the source of truth for names, colors, and descriptions
- Use a minimal but informative set:
  - one type or status label (for example: `bug`, `enhancement`, `Task`, `Composite task`)
  - one or more domain labels (for example: `Web`, `documentation`, `Guideline`, `CI/CD`, `Security`)
  - optional priority labels (for example: `High priority`) when needed
- Keep repository-specific label casing as configured in the target repository

### PR linking policy

- Link the issue in the PR body using closing keywords where applicable (`Closes #<issue>`)
- In the issue body, link back to the PR URL
- Keep PR and issue titles consistent with prefix taxonomy for searchability

### Branch workflow (repository-specific)

Unlike the usual ADAMANT workflow, **this repository does not use a `dev` branch**.

- Default branch: `master`
- Open pull requests directly against `master`
- Do not create, push to, or target a `dev` branch unless maintainers explicitly request it

Most ADAMANT code repositories use `dev` as the integration branch and merge to `master` for releases. Here the integration branch is `master`.

### PR conventions

- Target `master` as the PR base branch
- Use org PR template sections (`Description`, `Related issue`, `How to test`, `Checklist`, etc.)
- Reference issues with closing keywords where appropriate (`Closes #<id>`)
- Use this repository's PR title taxonomy: `Type: Short summary` (for example: `Docs: Add AGENTS.md`)
- Do not use issue-style square-bracket prefixes in PR titles (`[Docs]`, `[Bug]`, etc. are for Issues)
- Keep the PR title type aligned with issue intent (`Docs:`, `Fix:`, `Feat:`, `Refactor:`, `Test:`, `Chore:`)
- Include testing or verification steps and mention risk areas (security, privacy, public content accuracy)

## Documentation Drift Policy

AI agents are allowed and expected to propose documentation updates when mismatches are found.

When behavior and docs diverge:

1. Document the mismatch with exact file or path references
2. Propose synchronized updates in this repository
3. If related changes belong in other ADAMANT repositories, create linked follow-up issues with clear scope

## Security Rules

- Do not log, print, or expose secrets, API keys, credentials, or private configuration
- Do not introduce dynamic code execution, unsafe deserialization, or unvalidated shell execution paths
- Keep form handling, external integrations, and deployment configuration secure by default
- Minimize dependencies; prefer proven libraries already used in the repository when a dependency is needed

## AI Change Workflow

1. Read the relevant files before editing
2. Identify invariants that must stay unchanged unless the task explicitly approves a breaking change
3. Make the smallest safe change
4. Run relevant validation commands once they are defined for this repository
5. Report risks, assumptions, and any intentional scope cuts

## Working with Command-Line Tools

When a CLI tool accepts multi-line input, use a temporary file in `.ai-ignored/` instead of inline multi-line shell strings. This avoids quoting bugs and behaves consistently across shells.

Avoid:

```bash
gh pr create --body "Line 1
Line 2
Line 3"
```

Recommended:

```bash
cat > .ai-ignored/temp.2026-07-08.pr-description.md <<'EOF'
Line 1
Line 2
Line 3
EOF

gh pr create --body-file .ai-ignored/temp.2026-07-08.pr-description.md
rm .ai-ignored/temp.2026-07-08.pr-description.md
```

Benefits:

- avoids shell escaping issues with quotes, newlines, and special characters
- is easier to debug and review
- works predictably across `bash`, `zsh`, and `fish`
- keeps scratch files under `.ai-ignored/`, which is already git-ignored

Common use cases:

- PR descriptions: `gh pr create --body-file .ai-ignored/temp.YYYY-MM-DD.pr-description.md --label "label1,label2"`
- Commit messages: `git commit -F .ai-ignored/temp.YYYY-MM-DD.commit-message.md`
- Issue creation: `gh issue create --body-file .ai-ignored/temp.YYYY-MM-DD.issue-body.md --label "label1,label2"`
- Any other CLI that accepts file-based input for multi-line content

## Project Technical Baseline

### Stack

- Astro 7, static output (`output: 'static'`)
- Tailwind CSS 4 via `@tailwindcss/vite`
- React islands: `@astrojs/react`
- Content: Astro Content Collections (`src/content.config.ts`)
- SEO: `@astrojs/sitemap`, JSON-LD, `public/llms.txt`
- Hosting: GitHub Pages (`master` branch), custom domain `adamant.business`

### Configuration

- Committed public config: `config/site.ts` (repos, locales, contact, OpenRouter model list, sync settings)
- Secrets: `OPENROUTER_API_KEY`, `PAT_GITHUB_TOKEN` in GitHub Actions secrets only
- Generated data: `src/data/repos.json` via `npm run sync:stars`

### Commands

| Command | Purpose |
| --- | --- |
| `npm ci --ignore-scripts` | Install dependencies safely |
| `npm run dev` | Local dev server |
| `npm run build` | Production build to `dist/` |
| `npm run lint` | `astro check` |
| `npm run validate:config` | Validate `config/site.ts` |
| `npm run sync:stars` | Refresh GitHub star counts |

### Content policy

Read fully before writing site copy: `.ai-tasks/2026-07-08 (Task) Create website.md`

### Branch workflow

- Default branch: `master`
- PRs target `master` directly (no `dev` branch)

## Definition of Done

A change is done when:

- The requested behavior or content is implemented correctly
- Relevant validation was run, or an explicit blocker was reported
- Documentation updates are included for behavioral changes
- No secrets or sensitive data exposure was introduced
- Issues and PRs follow organization conventions

## Related Repositories

| Repository | Relevance |
| --- | --- |
| [adamant](https://github.com/Adamant-im/adamant) | ADAMANT blockchain node; baseline for org agent conventions |
| [adamant-im](https://github.com/Adamant-im/adamant-im) | ADAMANT Messenger PWA; reference for client-side and UX agent patterns |
| [adamant-console](https://github.com/Adamant-im/adamant-console) | ADAMANT CLI tool; reference for concise agent workflow and CLI conventions |
| [Adamant-im/.github](https://github.com/Adamant-im/.github) | Organization-wide issue, label, and governance defaults |
