# NVazen Official Website (azen.dev)

Source code for the official **NVazen™ Linux** website — a static site built with a Windows 11 Fluent design language.

Live site: **https://azen.dev**

## Pages

| File | Description |
|---|---|
| `index.html` | Home: NVazen Arc introduction, ALRM 4 technology, news, download, reviews, hardware requirements |
| `downloads.html` | Download center: ISO version list |
| `support.html` | GitHub repository list (the whole Azen ecosystem) |
| `distro.html` | Distribution list (cards render same-directory Markdown files as details) |
| `search.html` | Search portal (search engine, quick links, clock, open-meteo weather) |
| `azen/` | **Legacy archive** of the Azen Linux LTS era website (kept for history only) |

## Layout

Every page uses a **collapsible left sidebar** for navigation. Click the double-chevron button at the bottom of the sidebar to expand / collapse it; the state is remembered in `localStorage`. On narrow screens the sidebar stays in its compact rail form.

## Design system (`assets/`)

| File | Purpose |
|---|---|
| `assets/css/base.css` | Win11 design tokens (dark/light themes), sidebar layout, buttons, cards, chips, footer and other shared components |
| `assets/css/home.css` | Home page styles (hero, screenshot frame, carousel, sections). Note: the CSS for the old laptop mockup is intentionally kept here for future reuse |
| `assets/css/distro.css` | Distro list page styles (including Markdown rendering styles) |
| `assets/css/search.css` | Search portal styles |
| `assets/js/i18n.js` | Four-language dictionaries (en / zh / ja / ko); missing keys fall back to English |
| `assets/js/site.js` | Shared runtime: preferences (`nvazen_user_prefs`), theme, language, background effects, sidebar toggle, settings menu, scroll reveal |
| `assets/js/home.js` | Home page behaviour: title animation, screenshot carousel, news carousel, smooth scrolling |
| `assets/js/distro.js` | Distro page behaviour: detail view, dependency-free Markdown parser |
| `assets/js/search.js` | Search portal behaviour: engines, quick links, clock, weather |

## Features

- **Four languages** — English / 简体中文 / 日本語 / 한국어, switchable in the settings menu (sidebar bottom), stored in `localStorage`
- **Dark / light theme** and **background effects** (Acrylic / Full / Liquid glass) for the hero
- Screenshot carousel, news carousel, letter-bounce title animation, scroll reveal
- Search page: URL-direct navigation, hot search suggestions, custom quick links, date format toggle, open-meteo weather with geolocation or manual city entry

## How to make common changes

Most day-to-day edits do **not** require touching CSS or JavaScript. The guides below cover the usual tasks.

### Change the screenshots shown on the home page

1. Replace `scr1.png` … `scr4.png` in the repository root with your new images (keep the same file names and a 16:10-ish aspect ratio).
2. If you want a different number of slides, open `index.html`, find the `screen-carousel` block and add/remove `<div class="screen-slide"><img src="..."></div>` lines — then update the matching `.screen-dot` buttons just below it.

### Change the hero background image

1. Replace `background.png` in the repository root (any resolution; it is displayed with `background-size: cover`).
2. The overlay strength for each background effect lives in `assets/css/base.css` under `[data-bg-effect="..."]` (`--hero-overlay`); lower the alpha to show more of the image.

### Change the accent colour / theme colours

Edit the CSS variables at the top of `assets/css/base.css`:

- Dark theme: the `:root, [data-theme="dark"]` block (`--accent: #0078d4`, `--bg-body: #202020`, …)
- Light theme: the `[data-theme="light"]` block

### Add or edit news entries

Open `assets/js/i18n.js` and edit the `news_items` array inside each language block (`en`, `zh`, `ja`, `ko`). Each item is:

```js
{ tag: 'Release', title: '...', desc: '...', link: 'https://...' } // link is optional
```

### Change the version list or system components

Edit the `versionList` block and the `.components-grid` block directly in `index.html`. There is no JavaScript involved.

### Add a distribution to the list page

1. Put the distro icon in `distro-icons/<name>.png`.
2. In `distro.html`, copy an existing `<button class="distro-card">` block and change its `data-distro`, `data-md` (the Markdown file with the introduction), `data-name` and `data-sub` attributes.
3. The Markdown file must sit in the repository root next to `distro.html`.

### Add a language

1. Add a new block to `assets/js/i18n.js` (copy an existing one and translate the values).
2. Add the matching `<button class="opt-btn" data-lang-opt="...">` to the settings menu in the sidebar of each page.

### Add a repository card to the GitHub page

Copy an existing `<a class="list-card">` block in `support.html` and update the link, title, `lc-version` path and description (`data-i18n` key, then add that key to all language blocks in `i18n.js`).

### Restore the laptop mockup (removed from display, code kept)

The laptop markup is preserved as a comment inside `index.html` (search for "笔记本电脑模型"), and its styles are still in `assets/css/home.css` (`.laptop-*` classes) with the colour presets in `assets/js/site.js`. To bring it back, replace the `.hero-media` block with the commented laptop block and re-enable the laptop colour group in the settings menu.

## Maintenance notes

- All preferences share one `localStorage` key: `nvazen_user_prefs`, so returning visitors keep their settings between site versions.
- The site is fully static; deploy the repository root to any static host (GitHub Pages, Netlify, Cloudflare Pages, …).
- The search page's weather widget uses the free [open-meteo](https://open-meteo.com/) APIs (no key required).

## License

GPLv3 (following the Azen project).
