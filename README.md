# Titan Gym website

## VS Code Live Server

```powershell
cd frontend
npm ci
npm run build
```

Requires Node.js 22 and npm. Open **`titan-gym/` as your VS Code folder**, then click **Go Live**. Workspace settings point Live Server at the generated `public/` folder. If your VS Code workspace is the parent `titan-gym-projects/` folder, right-click **`titan-gym/public/index.html`** and choose **Open with Live Server** instead. The generated folder contains ten HTML pages plus a 404 page, CSS, images, videos, and browser scripts. Pages are generated from React templates; the published site has no React runtime or server application.

Edit the templates in `frontend/src/`. Run `npm run watch` from `frontend/` to rebuild `public/` as templates, styles, and images change; Live Server reloads the generated files. Use `npm run build` for a one-time rebuild. Do not edit generated `public/` files.

Add media under `frontend/public/images/` or `frontend/public/videos/`, using the matching `open-gym`, `pt`, `nutrition-coaching`, `body-building`, or `shake-bar` folder and descriptive lowercase filenames. Gallery entries and ordering live in `frontend/src/siteData.ts`; a video's poster belongs in the matching images folder.

## GitHub Pages

`.github/workflows/deploy-pages.yml` builds, checks, and publishes `public/` when the default branch is pushed, or when run manually from that branch. In repository **Settings → Pages**, set **Source → GitHub Actions**. Add repository secret `GOOGLE_MAPS_API_KEY` under **Settings → Secrets and variables → Actions → Secrets**. Deployment stops if that secret is missing. See [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

The workflow gets the Pages URL from GitHub for canonical URLs and the sitemap. To override it, set Actions variable `SITE_URL` to the complete site root, including any project path. Optional Actions variable `GOOGLE_MAPS_PLACE_ID` overrides the configured gym ID. Relative links support project subpaths. Local builds omit canonical URLs and the sitemap unless `SITE_URL` is set.

Contact links open the visitor's email or phone app. Membership signup continues through Gymdesk. There is no server-side inquiry form.

## Live Google reviews

In `frontend/.env.local` (ignored by Git), set:

```dotenv
GOOGLE_MAPS_API_KEY=
GOOGLE_MAPS_PLACE_ID=
```

Paste the browser key after the first `=`. Titan Gym's verified Place ID (`ChIJrzXJpY9hJaYR6H4EusAGIEs`) is already configured in `src/googleReviewsConfig.ts`; the Place ID variable is only an optional override. A blank template is available at `frontend/.env.google-template`.

Enable billing, **Maps JavaScript API**, and **Places API (New)** in the key's Google Cloud project. Restrict the key to those two APIs and approved website referrers: the published site origin, `http://localhost:5500/*`, and `http://127.0.0.1:5500/*` for Live Server. Add the actual port if different, or port 5173 for Vite. Set usage quotas in Google Cloud; requests can incur charges. See [Google's key restrictions](https://developers.google.com/maps/api-security-best-practices#recommended-api-restrictions).

Rebuild after changing configuration; restart watch/dev mode after editing `.env.local`. GitHub deployments use the Actions secret and optional variable described above. GitHub Pages never reads `.env.local`: Vite reads configuration during the build and embeds the browser settings in generated HTML. This key is intentionally visible to visitors; website/API restrictions protect its use. Do not use an unrestricted server key. Never commit `.env.local`.

The homepage requests fresh data as the reviews section approaches the viewport. It shows three of up to five reviews chosen by Google, preserves their order and author attribution, and updates the overall rating. It does not persist API review content. Static reviews remain available without a key, JavaScript, or successful API access. Live responses replace the static cards; errors retain fallback cards and show a dismissible toast. Google attribution, privacy, and terms accompany the integration. See [Google's review API](https://developers.google.com/maps/documentation/javascript/place-reviews).

## Checks

```powershell
cd frontend
npm run typecheck
npm run build
npm run check:static
```

## Project files

- `frontend/src/`: React templates used at build time; `styles.css` holds semantic color tokens.
- `frontend/public/`: source images, videos, and browser scripts.
- `frontend/scripts/`: static build and checks.
- `public/`: generated static site, ignored by Git.
- `docs/DESIGN_BRIEF.md` and `docs/UNANSWERED_QUESTIONS.md`: ongoing design decisions and research.
- `.github/workflows/deploy-pages.yml`: builds, checks, and publishes GitHub Pages.

Original site captures, copy research, archived media, conversion tools, and the retired database are preserved outside this repository in `../titan-gym-reference/`. They are not needed to build or publish the website.

Confirm public prices, terms, staffing and service claims, and photo consent before publication. The design brief contains newer business details that have not yet been applied to all website copy.
