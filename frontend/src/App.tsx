import type { ComponentType } from "react";
import { Footer, Header } from "./components";
import { ArrowIcon } from "./Icons";
import { CareersPage, HomePage, JoinPage } from "./pages";

export const routes: Record<string, { title: string; description: string; component: ComponentType }> = {
  "/": { title: "Titan Gym | Gym in Alamo Ranch, San Antonio", description: "A family-owned gym in Alamo Ranch, San Antonio. Explore open gym memberships, personal training, and our space. Stop by and say hi.", component: HomePage },
  "/join-now": { title: "Contact Titan Gym | Alamo Ranch, San Antonio", description: "Visit Titan Gym at 11720 Alamo Ranch Parkway, Suite 240 in San Antonio. Find our hours, phone number, email, and directions.", component: JoinPage },
  "/careers": { title: "Careers at Titan Gym | Alamo Ranch, San Antonio", description: "Interested in working at Titan Gym in Alamo Ranch, San Antonio? View listed roles and contact us about current availability.", component: CareersPage },
};

export function App({ pathname }: { pathname: string }) {
  const Page = routes[pathname]?.component;

  return (
    <>
      <Header pathname={pathname} />
      <main id="main-content" tabIndex={-1}>
        {Page ? <Page /> : <section className="not-found container"><p className="eyebrow">404</p><h1>We couldn't find that page.</h1><p>Head back to Titan Gym and keep moving.</p><a className="button-link button-link--solid" href="./index.html">Back to home <ArrowIcon direction="left" /></a></section>}
      </main>
      <Footer />
    </>
  );
}
