# PRO_ШИНА — tire service demo template

A single-page website template for an independent, one-bay tire service. The primary customer action is to call or join the live queue. Online booking is not included.

## Авторство и использование

Автор шаблона: [Aleksn2003](https://github.com/Aleksn2003). Все права на созданные автором исходный код, структуру и дизайн шаблона сохранены за автором. Использование, копирование, изменение и распространение шаблона или его частей за пределами возможностей GitHub допускаются только с предварительного разрешения автора. Публичность репозитория позволяет просматривать и форкать его на GitHub в соответствии с [условиями GitHub](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service); это не является открытой лицензией на повторное использование шаблона.

В репозитории нет открытой лицензии (`LICENSE`). Это уведомление фиксирует намерение автора, но не заменяет юридическую консультацию или отдельную лицензию.

## Authorship and Use (English)

Template author: [Aleksn2003](https://github.com/Aleksn2003). All rights to the source code, structure, and design created by the author remain with the author. Use, copying, modification, or distribution of this template or any part of it outside GitHub's platform features requires the author's prior permission. Because the repository is public, users may view and fork it on GitHub under [GitHub's Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service); this does not grant an open license to reuse the template.

This repository has no open-source license (`LICENSE`). This notice states the author's intent but does not replace legal advice or a separate license.

## Getting started

Requires Node.js 22.12+ and npm 9.6+.

```powershell
git clone https://github.com/Aleksn2003/pro-shina-demo.git
cd pro-shina-demo
npm ci
npm run dev
```

Open the URL printed by Astro (usually http://127.0.0.1:4321).

```powershell
npm run build    # Run Astro/TypeScript checks and build the static site
npm run preview  # Preview the production build
```

The generated site is in `dist/` and can be hosted on any static hosting provider. The public site does not require a Node.js server.

## Deploy to GitHub Pages

The site is deployed from the `main` branch by `.github/workflows/deploy.yml`. In the repository, open **Settings → Pages** and select **GitHub Actions** as the source. Each push to `main` will then build and publish the site at <https://aleksn2003.github.io/pro-shina-demo/>. Local development uses root-relative paths; GitHub Actions automatically adds the repository path to links and image URLs.

## Where to edit the data

**`src/config/workshop.ts` is the single source of truth for workshop data. All values are demonstrations.** It contains the name, neighborhood, contacts, address, opening hours, directions, map links, estimated service time, services, prices, optional work, benefits, master details, images, legal links, callback form settings, and SEO metadata.

- `tariffs`: complete demo prices in RUB per set of four wheels for each rim-size / vehicle-type combination. The price table and calculator use the same array.
- `extras`: optional, separately selectable work. The total is the tariff plus the selected extras; there are no hidden multipliers or rounding rules.
- `services`: starting prices for individual services. When adapting the site, make sure they are consistent with the full tire-change package table.
- `included`, `exclusions`: what the base demo tariff includes and which cases need separate approval. Do not promise included work unless the owner confirms it.
- `images.master`, `images.entrance`: currently demo images. Replace them with real, optimized workshop and entrance photos. Images below the first screen are lazy-loaded.
- `images.hero`: a local AI-generated illustration of a fictional workshop, not a photo of a real business. Two WebP sizes are provided through `srcset`; the source image is not included.
- `routes`: generic map links without a workshop pin. Replace them with verified Yandex Navigator and 2GIS directions; no real coordinates are invented.

## SEO and launching a real workshop site

The main content, price table, address, phone number, contacts, initial calculator result, and form are included in the generated HTML. Only two Vue islands use `client:visible`. The site uses system fonts and has no third-party widgets or analytics.

Title, description, canonical URL, Open Graph metadata, `TireShop` JSON-LD (a `LocalBusiness` subtype), `robots.txt`, and `sitemap.xml` are generated from the configuration. No ratings or reviews are included. A separate social sharing image has not been created.

The demo intentionally sets `demo: true` and `seo.indexable: false`, which produce `noindex, nofollow`, a blocking `robots.txt`, and an empty sitemap. **Before launching publicly, verify and replace all demo data**, including the phone number, `seo.siteUrl` domain, business terms, photos, and legal documents. Then set `demo: false` and `seo.indexable: true`, and rebuild the site. The sitemap will include the home page and `robots.txt` will allow indexing.

Labels such as “demo,” “example,” and “placeholder” on the page are editorial markers for the template. After verifying the information, update the corresponding labels in `src/pages/index.astro`; changing the flag alone is not enough to adapt the copy. The owner's terms and quote require separate confirmation.

## Callback form: next-stage integration contract

With `demo: true`, an empty endpoint, or no real privacy policy, the button only validates the phone number and clearly states that **the number was not sent and no request was created**. Data is not stored in `localStorage` or cookies. Without JavaScript, the form button is disabled while the phone link remains available.

To connect a backend:

1. Implement a same-origin `POST /api/callback` endpoint.
2. Set `callback.endpoint: '/api/callback'`, provide a real `callback.privacyUrl` and approved consent text, and set `demo: false`.
3. The request body is JSON: `{ "phone": "+79991234567", "consent": true }`.
4. Only a confirmed HTTP 2xx response containing `{ "accepted": true, "requestId": "non-empty-id" }` displays the success state. The server must first accept the request into reliable storage or a queue. Other responses, invalid JSON, network errors, and timeouts display an error with a retry button.
5. Calls to Zvonok.ru, secret keys, normalization and validation, consent checks, rate limiting, spam and duplicate protection, logging, and delivery retries must be implemented on the server only. Never put keys in this configuration or in `PUBLIC_*` variables.

States: `idle`, `sending`, `success` (server-confirmed only), `error` (retry available), and `demo` (no request sent). Do not connect the form directly to Zvonok.ru from the browser.

## Key files

- `src/pages/index.astro` — semantic page markup and metadata.
- `src/config/workshop.ts` — demo data and prices.
- `src/components/Calculator.vue` — interactive price calculator.
- `src/components/CallbackForm.vue` — phone input, validation, and submission states.
- `src/components/Icon.astro` — lightweight SVG icons with no client-side icon library.
- `src/styles/global.css` — Tailwind CSS, visual styles, and responsive behavior.
- `src/pages/robots.txt.ts`, `src/pages/sitemap.xml.ts` — statically generated SEO files.
- `public/images/`, `public/favicon.svg` — local images and favicon.

## Accessibility

The page uses one `h1`, sequential headings, a skip link, accessible form labels, native radio buttons and checkboxes, visible focus states, and `aria-live` for the total and form status. The mobile action bar accounts for the safe area and reserves space at the bottom of the page. `prefers-reduced-motion` disables smooth scrolling and CSS transitions. No animation libraries are used.
