import { hours, site } from "./siteData";

export function businessStructuredData(siteUrl: string) {
  return {
    "@type": "HealthClub",
    "@id": new URL("#gym", siteUrl).href,
    name: site.name,
    url: new URL("index.html", siteUrl).href,
    telephone: site.phoneHref.slice("tel:".length),
    email: site.email,
    address: { "@type": "PostalAddress", ...site.address },
    logo: new URL("images/logo-horizontal.png", siteUrl).href,
    image: new URL("images/hero.jpg", siteUrl).href,
    hasMap: site.mapsUrl,
    sameAs: Object.values(site.social),
    openingHoursSpecification: hours.map(({ days, opens, closes }) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: days.map((day) => `https://schema.org/${day}`),
      opens,
      closes,
    })),
  };
}

export function BusinessStructuredData({ siteUrl = site.url }: { siteUrl?: string }) {
  const business = { "@context": "https://schema.org", ...businessStructuredData(siteUrl) };
  // Keep JSON valid inside an HTML script element, including future copy edits.
  const json = JSON.stringify(business).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
