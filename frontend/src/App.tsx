import type { ComponentType } from "react";
import { Footer, Header } from "./components";
import { ArrowIcon } from "./Icons";
import { CareersPage, HomePage, JoinPage } from "./pages";

export const routes: Record<string, { title: string; description: string; component: ComponentType }> = {
  "/": { title: "Titan Gym | Family owned gym in Alamo Ranch", description: "Train your way at Titan Gym in San Antonio. Explore memberships, personal training, and our Alamo Ranch facility.", component: HomePage },
  "/join-now": { title: "Join or Contact | Titan Gym", description: "Join Titan Gym online or contact us in Alamo Ranch, San Antonio.", component: JoinPage },
  "/careers": { title: "Careers | Titan Gym", description: "Explore opportunities to work with Titan Gym in San Antonio.", component: CareersPage },
};

export function App({ pathname }: { pathname: string }) {
  const Page = routes[pathname]?.component;

  return (
    <>
      <Header pathname={pathname} />
      <main id="main-content">
        {Page ? <Page /> : <section className="not-found container"><p className="eyebrow">404</p><h1>We couldn't find that page.</h1><p>Head back to Titan Gym and keep moving.</p><a className="button-link button-link--solid" href="./index.html">Back to home <ArrowIcon direction="left" /></a></section>}
      </main>
      <Footer />
    </>
  );
}
