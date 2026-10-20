# Titan Gym website

## VS Code Live Server

```powershell
cd frontend
npm ci
npm run build
```

Requires Node.js 22 and npm. Open **`titan-gym/` as your VS Code folder**, then click **Go Live**. Workspace settings point Live Server at the generated `public/` folder. If your VS Code workspace is the parent `titan-gym-projects/` folder, right-click **`titan-gym/public/index.html`** and choose **Open with Live Server** instead. The generated folder contains eight HTML pages plus a 404 page, CSS, images, videos, and browser scripts. Pages are generated from React templates; the published site has no React runtime or server application.

Edit the templates in `frontend/src/`. Run `npm run watch` from `frontend/` to rebuild `public/` as templates, styles, and images change; Live Server reloads the generated files. Use `npm run build` for a one-time rebuild. Do not edit generated `public/` files.

Add media under `frontend/public/images/` or `frontend/public/videos/`, using the matching `open-gym`, `pt`, `nutrition-coaching`, `body-building`, or `shake-bar` folder and descriptive lowercase filenames. Gallery entries and ordering live in `frontend/src/siteData.ts`; a video's poster belongs in the matching images folder.

## GitHub Pages

`.github/workflows/deploy-pages.yml` builds, checks, and publishes `public/` when the default branch is pushed, or when run manually from that branch. In repository **Settings → Pages**, set **Source → GitHub Actions**. See [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

The workflow gets the Pages URL from GitHub for canonical URLs and the sitemap. To override it, set Actions variable `SITE_URL` to the complete site root, including any project path. Relative links support project subpaths. Local builds omit canonical URLs and the sitemap unless `SITE_URL` is set.

Contact links open the visitor's email or phone app. Membership signup continues through Gymdesk. There is no server-side inquiry form.

## Google reviews temporarily disabled

The homepage review section is not rendered. Builds do not read or publish the Google Maps API key, load the reviews script, or ship that script in generated public files. Deployment does not consume the Actions key secret. Integration source is retained for later restoration after website and API restrictions work reliably.

Previously published keys remain exposed in old pages and caches. Disable or rotate the old key in Google Cloud.

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
