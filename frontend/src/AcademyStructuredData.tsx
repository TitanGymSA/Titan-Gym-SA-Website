import { studentPlans } from "./academyData";
import { businessStructuredData } from "./BusinessStructuredData";
import { site } from "./siteData";

export function AcademyStructuredData({ siteUrl = site.url }: { siteUrl?: string }) {
  const pageUrl = new URL("texas-sports-academy.html", siteUrl).href;
  const business = businessStructuredData(siteUrl);
  const serviceId = `${pageUrl}#student-training-service`;
  const signupUrl = `${pageUrl}#student-visit`;
  const service = {
    "@type": "Service",
    "@id": serviceId,
    name: "Texas Sports Academy student training at Titan Gym",
    serviceType: "Student fitness training",
    url: pageUrl,
    description: "Coached training for Texas Sports Academy students ages 8 and up in Alamo Ranch, San Antonio. Both school-paid options include open gym and nutrition support. No parent-paid cost for included services; additional sessions are parent-paid if requested. Call or visit Titan Gym to sign up and confirm school authorization.",
    provider: { "@id": business["@id"] },
    areaServed: "Alamo Ranch, San Antonio, Texas",
    audience: { "@type": "PeopleAudience", audienceType: "Texas Sports Academy students", requiredMinAge: 8 },
    availableChannel: [
      { "@type": "ServiceChannel", servicePhone: { "@type": "ContactPoint", telephone: business.telephone, contactType: "Student training signup" }, serviceUrl: signupUrl },
      { "@type": "ServiceChannel", serviceLocation: { "@id": business["@id"] }, serviceUrl: signupUrl },
    ],
    offers: studentPlans.map((plan) => ({
      "@type": "Offer",
      "@id": `${pageUrl}#${plan.id}-offer`,
      name: `${plan.title} — school-paid student training`,
      url: signupUrl,
      seller: { "@id": business["@id"] },
      itemOffered: { "@id": serviceId },
      description: `${plan.sessions}. Open gym and nutrition support included. The school pays $${plan.schoolPaidMonthlyAmount} per month; parent cost is $0 for included services. Additional sessions are parent-paid if requested. Sign up by phone or in person; school authorization must be confirmed.`,
      // This is the school's monthly payment, not an amount charged to parents.
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        name: "School-paid monthly program amount",
        price: plan.schoolPaidMonthlyAmount,
        priceCurrency: "USD",
        billingDuration: "P1M",
        unitText: "month",
      },
    })),
  };
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": [business, service] }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
