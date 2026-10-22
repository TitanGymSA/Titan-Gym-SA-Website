import { renderToStaticMarkup } from "react-dom/server";
import { site } from "./siteData";

export const legacyRedirects = {
  facility: "index.html#gallery",
  services: "index.html#offerings-title",
  "titan-nutrition": "index.html#nutrition-coaching",
  about: "index.html#about",
  socials: "index.html#socials",
  reviews: "index.html",
  "exercise-tutorial-videos": "index.html",
} as const;

export function renderRedirect(target: string, nested: boolean, siteUrl = site.url) {
  const destination = `${nested ? "../" : "./"}${target}`;
  const canonical = new URL(target, siteUrl);
  canonical.hash = "";

  return "<!doctype html>\n" + renderToStaticMarkup(
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="refresh" content={`0; url=${destination}`} />
        <link rel="canonical" href={canonical.href} />
        <title>Redirecting | Titan Gym</title>
      </head>
      <body><p>Continue to <a href={destination}>Titan Gym</a>.</p></body>
    </html>,
  );
}
