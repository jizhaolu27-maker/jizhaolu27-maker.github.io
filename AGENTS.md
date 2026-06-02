# AGENTS.md

## Project

- This repository is Jizhao Lu's personal GitHub Pages homepage.
- Keep the site minimal, calm, professional, and lightweight.
- Preserve the white-background, blue-accent visual direction.
- Use only static HTML, CSS, and JavaScript.
- Do not add frameworks, package managers, build tools, a backend, or external runtime dependencies.

## Current Structure

- `index.html`: homepage with personal identity and recent learning logs.
- `logs.html`: full learning log page.
- `notes.html`: study notes list page.
- `links.html`: selected links page.
- `style.css`: shared styles and responsive rules.
- `app.js`: language switching, JSON loading, and page rendering.
- `data/logs.json`: learning log entries.
- `data/notes.json`: study note entries; use `[]` when there are no notes.
- `data/links-fixed.json`: fixed links; use `[]` when empty.
- `data/links-recent.json`: recent links; use `[]` when empty.

## Design Rules

- Keep the overall layout stable unless the user explicitly requests a redesign.
- Do not make the site flashy, noisy, or template-like.
- Prefer small, targeted style changes over broad rewrites.
- Preserve responsive behavior on desktop and mobile.
- Do not introduce horizontal overflow.

## Language Rules

- The site supports English and Chinese.
- Keep the language toggle.
- Maintain bilingual user-facing text in HTML, `app.js`, and JSON data.
- If adding static text to HTML, wire it through the existing i18n system in `app.js`.

## Learning Logs

- Store logs in `data/logs.json`.
- Keep entries ordered newest to oldest.
- Use ISO dates: `YYYY-MM-DD`.
- Keep the homepage data-driven; do not hardcode log entries in `index.html`.
- The homepage should show at most the latest 3 logs.

```json
{
  "date": "2026-06-02",
  "topic": { "en": "Website", "zh": "网站" },
  "title": { "en": "Published my personal website", "zh": "发布了自己的个人网站" },
  "summary": { "en": "Built and published a lightweight personal homepage.", "zh": "搭建并发布了个人主页。" }
}
```

## Notes And Links

- Keep `notes.html` and `links.html` functional even when their data arrays are empty.
- Notes entries are stored in `data/notes.json`.
- Each note may include a `tags` array.
- Tags are used by the Notes page for lightweight filtering.
- A note link may point either to an external document, such as a Feishu cloud document, or to a Markdown file inside the repository.
- Use external links for notes that are still being actively edited.
- Once a note becomes stable, it may be migrated into `notes/*.md`, and the corresponding URL in `data/notes.json` should be updated.
- Do not add private, permission-restricted, or sensitive links unless they are intentionally public/shareable.
- Store link entries in `data/links-fixed.json` and `data/links-recent.json`.
- Frontend pages must not fetch external websites directly at runtime.
- Keep links compact: title, source when useful, and URL.
- Use lowercase kebab-case file names for repository Markdown notes.

## Paths And Compatibility

- Use relative paths only.
- Keep links compatible with GitHub Pages.
- Re-check CSS links, script links, JSON fetch paths, navigation links, and note links after edits.
- Do not commit generated caches such as `__pycache__/` or `*.pyc`.

## Validation

- Confirm edited JSON files are valid.
- Confirm `index.html`, `logs.html`, `notes.html`, and `links.html` load `style.css` and `app.js`.
- Confirm homepage still shows at most 3 latest logs.
- Confirm language switching works in English and Chinese.
- Confirm mobile layout remains readable.
- Confirm no secrets, tokens, private keys, server IPs, or credentials are added.
