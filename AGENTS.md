# AGENTS.md

## Project Identity

- This repository is the personal main website of `Jizhao Lu`.
- It is intended to be deployed on GitHub Pages.
- GitHub repository: `https://github.com/jizhaolu27-maker/jizhaolu27-maker.github.io`
- The site is a clean, lightweight personal homepage focused on:
  - personal identity
  - recent learning logs
  - study notes

## Core Goals

- Keep the site minimal, calm, and professional.
- Preserve the current white-background, blue-accent visual direction.
- Prioritize clarity, maintainability, and fast loading.
- Make the site easy to update without introducing unnecessary complexity.

## Tech Stack

- Use only:
  - HTML
  - CSS
  - JavaScript
- Do not introduce:
  - React
  - Vue
  - Svelte
  - TypeScript
  - build tools
  - package managers
  - UI frameworks
  - CSS frameworks
- This project should remain a static site compatible with GitHub Pages.

## Current Site Structure

- `index.html`
  - Homepage
  - Shows personal identity and the latest 3 learning logs
- `logs.html`
  - Full learning log list
- `notes.html`
  - Full study notes list
- `style.css`
  - All shared styles
  - Includes responsive layout rules
  - Includes Chinese-only typography overrides
- `app.js`
  - Handles:
    - language switching
    - loading JSON data
    - rendering logs and notes
- `data/logs.json`
  - Stores learning log entries
- `data/notes.json`
  - Stores study note entries
- `notes/`
  - Stores Markdown note files or note-related content

## Design Rules

- Keep the overall layout unchanged unless the user explicitly requests a redesign.
- Do not casually change the global color palette.
- Do not replace the current white-and-blue visual direction.
- Do not make the site visually noisy, overly decorative, or “template-like”.
- Prefer subtle, restrained, academic/professional styling.
- English typography should remain as-is unless explicitly requested.
- Chinese typography may be adjusted carefully for readability, but do not break layout consistency.

## Content Rules

- The homepage should stay focused and minimal.
- Do not add large new sections to the homepage without clear user approval.
- The homepage should continue to show only the latest 3 learning logs at most.
- If there are fewer than 3 logs, show all available logs.
- The full log history belongs on `logs.html`.
- The full note list belongs on `notes.html`.

## Language Rules

- The site supports both English and Chinese.
- Maintain bilingual support when editing user-facing text.
- Do not remove the language toggle.
- If adding new static text to HTML, make sure it is translatable through the existing language system in `app.js`.
- If adding new text rendered from JSON, provide both English and Chinese fields when appropriate.

## Data Format Rules

### Learning Logs

- Learning logs are stored in `data/logs.json`.
- Each log entry should use this structure:

```json
{
  "date": "2026-03-17",
  "topic": {
    "en": "Website",
    "zh": "网站"
  },
  "title": {
    "en": "Published my personal website",
    "zh": "发布了自己的个人网站"
  },
  "summary": {
    "en": "Built and published my personal homepage...",
    "zh": "搭建并发布了个人主页..."
  }
}
```

- Keep logs ordered from newest to oldest.
- Use ISO date format: `YYYY-MM-DD`.
- Do not add extra fields unless needed by the user.

### Study Notes

- Study notes are stored in `data/notes.json`.
- Each note entry should use this structure:

```json
{
  "title": {
    "en": "Computer Organization Study Notes",
    "zh": "计算机组成结构学习笔记"
  },
  "category": {
    "en": "Computer Organization",
    "zh": "计算机组成结构"
  },
  "updated": {
    "en": "Updated 2026-03-17",
    "zh": "更新于 2026-03-17"
  },
  "description": {
    "en": "Notes focused on basic computer organization topics...",
    "zh": "围绕计算机组成结构基础内容整理的学习笔记..."
  },
  "url": "https://github.com/jizhaolu27-maker/jizhaolu27-maker.github.io/blob/main/notes/example.md"
}
```

- `url` should point to the GitHub Markdown file in this repository when possible.
- Prefer linking to files under `notes/`.

## File Naming Rules

- Use simple lowercase file names.
- Use kebab-case for multi-word file names.
- Examples:
  - `computer-organization-basics.md`
  - `digital-ic-week-01.md`
  - `java-notes.md`
- Do not use spaces in file names.
- Do not use mixed naming styles like camelCase and snake_case unless an existing file already requires it.

## How To Add A New Learning Log

1. Open `data/logs.json`.
2. Add a new object at the top of the array.
3. Keep the newest entry first.
4. Provide both English and Chinese values for:
   - `topic`
   - `title`
   - `summary`
5. Use the correct date format: `YYYY-MM-DD`.
6. Save the file as valid JSON.

Notes:

- Do not edit `index.html` just to add a new log.
- The homepage automatically shows the latest 3 entries through `app.js`.
- `logs.html` automatically shows the full list.

## How To Add A New Study Note

1. Add the Markdown note file under `notes/`.
2. Use a clean kebab-case filename.
3. Commit or prepare the file path that will exist in GitHub.
4. Open `data/notes.json`.
5. Add a new note object to the array.
6. Provide bilingual values for:
   - `title`
   - `category`
   - `updated`
   - `description`
7. Set `url` to the GitHub Markdown URL for that file.

Recommended GitHub URL pattern:

```text
https://github.com/jizhaolu27-maker/jizhaolu27-maker.github.io/blob/main/notes/your-note-file.md
```

## Homepage Rendering Rule

- The homepage latest-log area is rendered by `app.js`.
- The rendering logic must continue to:
  - load `data/logs.json`
  - slice to the latest 3 items
  - render all items if total count is below 3
- Do not hardcode log entries in `index.html`.

## Relative Path Rules

- Use relative paths only.
- Keep file references compatible with GitHub Pages.
- When moving or adding files, re-check:
  - CSS links
  - script links
  - JSON fetch paths
  - cross-page navigation links
  - note links when relevant

## Responsive Rules

- Preserve responsive behavior on both desktop and mobile.
- After editing layout or typography, verify:
  - header wrapping
  - navigation spacing
  - hero title line breaks
  - card spacing
  - list readability on narrow screens
- Do not introduce horizontal overflow.
- Do not break the current mobile media-query behavior in `style.css`.

## Maintenance Rules

- Prefer small, targeted edits over broad redesigns.
- Do not refactor file structure unless necessary.
- Do not add dependencies for tasks that can be solved with plain HTML/CSS/JS.
- Keep code readable and easy for future agents to update.
- If changing text content, preserve bilingual consistency.
- If changing styles, prefer additive overrides over risky global rewrites.

## Validation Checklist After Changes

- Confirm all edited JSON files are valid.
- Confirm all relative links still work.
- Confirm `index.html`, `logs.html`, and `notes.html` still load `style.css` and `app.js` correctly.
- Confirm homepage still shows at most 3 latest logs.
- Confirm notes still link to the intended GitHub Markdown files.
- Confirm Chinese and English language switching still works.
- Confirm mobile layout still reads cleanly.

## Things Agents Should Avoid

- Do not introduce frameworks.
- Do not introduce a backend.
- Do not convert this into a multi-step build project.
- Do not add unnecessary animations or visual effects.
- Do not replace the current design with a flashy portfolio style.
- Do not remove bilingual support.
- Do not break GitHub Pages compatibility.

## Preferred Change Philosophy

- Respect the existing structure.
- Keep the homepage minimal.
- Treat logs and notes as data-driven content.
- Make updates easy for long-term personal maintenance.

## Links Page Maintenance

- `links.html` is a minimal standalone page with only two sections:
  - `Fixed`
  - `Recent`
- Keep the links page calm, simple, and list-based.
- Do not turn it into a multi-column portal, card wall, or filtered resource directory unless explicitly requested.
- `Fixed` links are manually maintained in `data/links-fixed.json`.
- `Recent` links are rendered from `data/links-recent.json`.
- `data/links-recent.json` is generated by `scripts/generate-links-recent.py`.
- The GitHub Actions workflow `.github/workflows/update-links.yml` is responsible for automatically refreshing recent links on GitHub.
- Frontend pages must not fetch external websites directly at runtime.
- Keep recent items compact:
  - prefer title + URL only
  - source may be included as a very short label
  - do not fetch article body content
  - do not include long summaries
- If adding new recent-link sources, prefer stable and public official sources such as:
  - official Atom/RSS feeds
  - official release pages
  - official changelog or release-note pages
- When extending the generator:
  - prefer adding a new source entry to `SOURCES` first
  - add a new handler only when the source format truly differs
  - keep output objects in the same minimal structure: `title`, `source`, `url`
- Keep `Recent` limited to a small number of items, normally 5.
- If updating links data manually, validate JSON and ensure `links.html` still works with bilingual navigation and the shared `app.js` logic.

