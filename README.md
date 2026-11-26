# NVazen Official Website (azen.dev)

Source code for the official **NVazen™ Linux** website — a static site built with a Windows 11 Fluent design language.

Live site: **https://azen.dev**

## Pages

| File | Description |
|---|---|
| `index.html` | Home: split hero banner, latest release + screenshots, NAAP technology, news, download, reviews, hardware requirements |
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
| `assets/css/home.css` | Home page styles (split hero banner, latest-release block, screenshot frame, carousel, sections). Note: the CSS for the old laptop mockup is intentionally kept here for future reuse |
| `assets/css/distro.css` | Distro list page styles (including Markdown rendering styles) |
| `assets/css/search.css` | Search portal styles |
| `assets/js/i18n.js` | Four-language dictionaries (en / zh / ja / ko); missing keys fall back to English |
| `assets/js/site.js` | Shared runtime: preferences (`nvazen_user_prefs`), theme, language, background effects, sidebar toggle, settings menu, scroll reveal |
| `assets/js/home.js` | Home page behaviour: title animation, screenshot carousel, news carousel, smooth scrolling |
| `assets/js/distro.js` | Distro page behaviour: detail view, dependency-free Markdown parser |
| `assets/js/search.js` | Search portal behaviour: engines, quick links, clock, weather |

## Features

- **Four languages** — English / 简体中文 / 日本語 / 한국어, switchable in the settings menu (sidebar bottom), stored in `localStorage`
- **Split hero banner** — a fully transparent upper half that lets the desktop wallpaper show through with a clarity gradient towards the top, and a solid lower half for the NVazen claim and its four benefits
- **Dark / light theme** and **background effects** (Acrylic / Full / Liquid glass) for the hero
- Screenshot carousel, news carousel, letter-bounce title animation, scroll reveal
- Search page: URL-direct navigation, hot search suggestions, custom quick links, date format toggle, open-meteo weather with geolocation or manual city entry

## How to make common changes

Most day-to-day edits do **not** require touching CSS or JavaScript. The guides below cover the usual tasks.

### Change the screenshots shown on the home page

1. Replace `scr1.png` or `scr2.png` in the repository root with your new images (keep the same file names and a 16:10-ish aspect ratio). Only the first two screenshots are shown; `scr3.png` and `scr4.png` are older images that are kept in the repository but not displayed.
2. If you want a different number of slides, open `index.html`, find the `screen-carousel` block and add/remove `<div class="screen-slide"><img src="..."></div>` lines — then update the matching `.screen-dot` buttons just below it. (The commented-out laptop block contains its own copy of the carousel; keep it in sync if you ever restore it.)

### Change the hero background image

1. Replace `background.png` in the repository root (any resolution; it is displayed with `background-size: cover`).
2. The image is only shown in the transparent **upper half** of the banner (`.hero-top .hero-bg-layer`); set `background-position` there if you want a different crop of the artwork.
3. The overlay strength for each background effect lives in `assets/css/base.css` under `[data-bg-effect="..."]` (`--hero-overlay`); lower the alpha to show more of the image.
5. The `deco-semicircle` / `deco-ring` decorations were removed from the top-right corner; only the subtle `deco-dots` grid remains in the transparent area.
4. The fade from the wallpaper into the claim panel is themed by `--hero-fade-1/2/3` in `assets/css/base.css`; the extra blur at the seam is `.hero-top::before` in `home.css`.

### Change the banner brand, claim and benefit cards

1. The small brand lockup above the claim (icon + `NVazen™ Linux`) is the `.hero-brand` block in `index.html`; it is a proper name, so it is not translated.
2. The two claim lines and the paragraph under them are the `hero_claim_1`, `hero_claim_2` and `hero_claim_sub` keys in `assets/js/i18n.js` (one copy per language).
3. The four benefit cards are the `<li class="hero-benefit">` items inside `.hero-benefits` in `index.html`; their text uses the `hero_benefit1_title` … `hero_benefit4_desc` keys. Keep four items for the desktop 4-column grid (it becomes 2 columns below 1100 px and 1 column below 560 px). Note that the NAAP card is titled just `NAAP` — the acronym already expands to "New Architecture App Nap", so do not append "App Nap" again.
4. The banner height split: `.hero-bottom` is as tall as the claim panel, while `.hero-top` (`flex: 1 1 0%`) fills the rest of the first screen, with a `clamp(210px, 26vh, 420px)` floor. A `max-height: 780px` query compacts the type on short laptop screens so the whole banner still fits one screen.
5. The latest-version card and screenshot carousel live in the `#latest` section directly below the banner.

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
