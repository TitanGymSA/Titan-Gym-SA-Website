import { renderToStaticMarkup } from "react-dom/server";
import { App, routes } from "./App";

export const pagePaths = [...Object.keys(routes), "/404"];
export const pageFilename = (pathname: string) => pathname === "/" ? "index.html" : `${pathname.slice(1)}.html`;

export function renderPage(pathname: string, siteUrl?: string) {
  const route = routes[pathname];
  return "<!doctype html>\n" + renderToStaticMarkup(
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={route?.description ?? "Titan Gym in Alamo Ranch, San Antonio."} />
        {!route && siteUrl ? <base href={siteUrl} /> : null}
        {!route ? <meta name="robots" content="noindex" /> : null}
        {siteUrl && route ? <link rel="canonical" href={new URL(pageFilename(pathname), siteUrl).href} /> : null}
        <link rel="icon" type="image/png" href="./images/logo-mark.png" />
        <link rel="stylesheet" href="./styles.css" />
        <title>{route?.title ?? "Page not found | Titan Gym"}</title>
      </head>
      <body>
        <App pathname={pathname} />
        {pathname === "/" ? <script src="./headline.js" defer /> : null}
        {pathname === "/" ? <script src="./gallery.js" defer /> : null}
        {pathname === "/" ? <script src="./inline-gallery.js" defer /> : null}
        <script src="./site.js" defer />
      </body>
    </html>,
  );
}
