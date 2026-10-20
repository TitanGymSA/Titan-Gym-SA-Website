import type { ComponentType } from "react";
import { Footer, Header } from "./components";
import { ArrowIcon } from "./Icons";
import { PrivacyPage, TermsPage } from "./SitePolicies";
import { CareersPage, HomePage, JoinPage, ReviewsPage, SocialsPage, TutorialsPage } from "./pages";

export const routes: Record<string, { title: string; description: string; component: ComponentType }> = {
  "/": { title: "Titan Gym | Family owned gym in Alamo Ranch", description: "Train your way at Titan Gym in San Antonio. Explore memberships, personal training, and our Alamo Ranch facility.", component: HomePage },
  "/reviews": { title: "Member Stories | Titan Gym", description: "Read what members say about Titan Gym's family owned community in Alamo Ranch.", component: ReviewsPage },
  "/join-now": { title: "Join or Contact | Titan Gym", description: "Join Titan Gym online or contact our team in Alamo Ranch, San Antonio.", component: JoinPage },
  "/socials": { title: "Follow Titan Gym", description: "Find Titan Gym on Facebook, Instagram, and YouTube.", component: SocialsPage },
  "/exercise-tutorial-videos": { title: "Exercise Tutorials | Titan Gym", description: "Find Titan Gym's exercise guidance and YouTube channel.", component: TutorialsPage },
  "/careers": { title: "Careers | Titan Gym", description: "Explore opportunities to work with Titan Gym in San Antonio.", component: CareersPage },
  "/privacy": { title: "Privacy Policy | Titan Gym", description: "How this website uses Google Maps and other services.", component: PrivacyPage },
  "/terms": { title: "Website Terms | Titan Gym", description: "Information about using the Titan Gym website and its Google Maps features.", component: TermsPage },
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
