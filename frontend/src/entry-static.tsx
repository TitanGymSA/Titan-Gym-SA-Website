import { renderToStaticMarkup } from "react-dom/server";
import { App, routes } from "./App";
import { BusinessStructuredData } from "./BusinessStructuredData";
import { site } from "./siteData";
import { imageVariant } from "./ResponsiveImage";

export const pagePaths = [...Object.keys(routes), "/404"];
export const pageFilename = (pathname: string) => pathname === "/" ? "index.html" : `${pathname.slice(1)}.html`;

export function renderPage(pathname: string, siteUrl?: string) {
  const route = routes[pathname];
  const publicSiteUrl = siteUrl ?? site.url;
  const pageUrl = new URL(pageFilename(pathname), publicSiteUrl).href;
  const shareImageUrl = new URL(site.shareImage.src, publicSiteUrl).href;
  return "<!doctype html>\n" + renderToStaticMarkup(
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={route?.description ?? "Titan Gym in Alamo Ranch, San Antonio."} />
        {!route && siteUrl ? <base href={siteUrl} /> : null}
        {!route ? <meta name="robots" content="noindex" /> : null}
        {route ? (
          <>
            <link rel="canonical" href={pageUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={site.name} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:title" content={route.title} />
            <meta property="og:description" content={route.description} />
            <meta property="og:url" content={pageUrl} />
            <meta property="og:image" content={shareImageUrl} />
            <meta property="og:image:type" content={site.shareImage.type} />
            <meta property="og:image:width" content={String(site.shareImage.width)} />
            <meta property="og:image:height" content={String(site.shareImage.height)} />
            <meta property="og:image:alt" content={site.shareImage.alt} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={route.title} />
            <meta name="twitter:description" content={route.description} />
            <meta name="twitter:image" content={shareImageUrl} />
            <meta name="twitter:image:alt" content={site.shareImage.alt} />
          </>
        ) : null}
        {pathname === "/" ? <BusinessStructuredData siteUrl={publicSiteUrl} /> : null}
        <link rel="icon" type="image/webp" href={imageVariant("./images/logo-mark.png", 64).src} />
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
