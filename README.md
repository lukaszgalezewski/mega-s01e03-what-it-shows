# mega-s01e03-what-it-shows

MEGA.dev Challenge S01E03 "what it shows" — support desk ticket #4471 merged 412 reports
about dates into one issue, marked known. Reading the kb export's own `causes.ts` and
`desk-notes.json` shows it is really three separate bugs:

| cause | reports | issue |
|---|---|---|
| parser | 379 | [#1](../../issues/1) |
| hint | 33 | [#2](../../issues/2) |
| one-day move | 5 (subset of parser's 379) | [#3](../../issues/3) |

The kb page is at `src/routes/kb/decisions/0002-4471-is-three-bugs/+page.svx`, source of truth.
A static render of that same page, as the support desk would see it, is at
`rendered/0002-4471-is-three-bugs.html`.
