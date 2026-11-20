# SQL School

A self-contained illustrated SQL course inspired by the visual reference Designed to Scale. The implementation and SQL curriculum are original.

- 40 lessons in nine modules, with 202 guided steps.
- Animated SVG diagrams and data-flow scenes for filters, joins, projection, groups, sorting and mutations.
- A real SQLite (SQL.js 1.17.0) sandbox running in a Web Worker, with a five-second query limit.
- 40 practice challenges graded by their result sets on the sample data.
- Query Lab with schema browser, errors and editable SQL; ten runnable cheatsheet patterns.
- Course search, keyboard shortcuts, responsive layouts, light/dark themes and local progress.

## Run locally

Requires Node.js. No package installation or build is required.

```powershell
npm run dev
```

Open http://127.0.0.1:4180. `dist/` contains all deployable assets, including SQL.js, WebAssembly and fonts. Serve over HTTP; browser modules and workers do not work by opening index.html directly from disk.

## Project structure

- `dist/app.js`: shell, navigation, lesson player, search, practice and playground.
- `dist/course.js`: original course content and challenge solutions.
- `dist/database.js`: four sample tables and seed data.
- `dist/data-scene.js`: actual input/result table visualizations.
- `dist/sql-worker.js`: isolated SQLite execution; each query run starts with a fresh database.
- `dist/style.css`: design tokens, themes and responsive layouts.
- `.openai/hosting.json`: Sites identity and static deployment configuration.

Progress, solved challenges, the last lesson, theme, and playground draft are stored locally on this browser. A lesson is marked complete when its recap is visited. No account/database synchronization is implemented. The course is in English; this implementation does not claim the reference site's translation catalog.

The sandbox uses SQLite syntax. Some behavior differs from PostgreSQL, MySQL and SQL Server. Query time measures execution in the local worker, excluding initialization. Practice checking compares result sets on the bundled sample data, not query equivalence for all possible data.

## Verification

All 85 distinct curriculum queries were executed against fresh copies of the sample database; all passed. Browser checks cover course navigation, 40 lesson query states, search, completion/resume, SQL execution/errors, practice grading, cheatsheets, dark mode and mobile navigation. QA scripts use the already-installed REA Playwright library through an absolute local path; adjust it if running elsewhere.

SQL.js and JetBrains Mono license notices are in `dist/assets/`.
