import { ButtonLink, Callout, PageHero, SectionHeading } from "./components";
import { ContactOptions } from "./ContactOptions";
import { EmailAddress } from "./EmailAddress";
import { HomeHeadline } from "./HomeHeadline";
import { PhoneIcon } from "./Icons";
import { InlineMediaGallery } from "./InlineMediaGallery";
import { MembershipPrice } from "./MembershipPrice";
import { MembershipDetails } from "./MembershipDetails";
import { PhotoGallery } from "./PhotoGallery";
import { PhoneNumber } from "./PhoneNumber";
import { bodybuildingMedia, nutritionCoachingMedia, openGymMedia, personalTrainingMedia, plans, roles, site } from "./siteData";

const gymHighlights = ["Family owned", "Open gym", "Personal training", "Alamo Ranch, TX", "All fitness levels"];
const showShakeBar = false;

function GymHighlights() {
  return (
    <section className="intro-strip" aria-label="Gym highlights">
      <div className="container intro-strip__inner">
        <div className="intro-strip__viewport">
          <div className="intro-strip__track">
            {[false, true].map((duplicate) => (
              <ul className="intro-strip__group" key={String(duplicate)} aria-hidden={duplicate || undefined}>
                {gymHighlights.map((highlight) => <li key={highlight}><span>{highlight}</span></li>)}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MembershipPreview() {
  return (
    <div className="plan-grid plan-grid--preview">
      {plans.slice(0, 2).map((plan) => (
        <article className={`plan-card ${plan.featured ? "plan-card--featured" : ""}`} key={plan.name}>
          <p className="plan-card__label">{plan.featured ? "Make it a habit" : "Train your way"}</p>
          <h3>{plan.name}</h3>
          <MembershipPrice plan={plan} />
          <MembershipDetails plan={plan} />
          <ButtonLink href={site.signupUrl} external variant={plan.featured ? "solid" : "outline"}>Get started</ButtonLink>
        </article>
      ))}
    </div>
  );
}

export function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero__image"><img src="./images/hero.jpg" alt="Wide view of Titan Gym's training floor in Alamo Ranch" width="1600" height="1200" fetchPriority="high" /></div>
        <div className="container home-hero__content">
          <HomeHeadline />
          <p>Find your rhythm with a family-owned gym in Alamo Ranch.</p>
          <div className="button-row">
            <ButtonLink href="#membership">Join now</ButtonLink>
            <ButtonLink href="#gallery" variant="outline">Explore the gym</ButtonLink>
          </div>
        </div>
      </section>

      <GymHighlights />

      <section className="section section--light home-intro">
        <div className="home-intro__media" aria-hidden="true"><img src="./images/community.jpg" alt="" loading="lazy" /></div>
        <div className="container intro-grid intro-grid--home">
          <div><p className="eyebrow">Welcome to Titan Gym</p><h2>Family owned<br />In Alamo Ranch</h2></div>
          <div><p className="lead">A family tradition of health &amp; wellness</p><p>We believe taking care of yourself should fit into everyday life. We built Titan Gym as a place to do that with familiar faces and room to work towards your goals.</p></div>
        </div>
      </section>

      <section className="section section--dark home-offerings">
        <div className="container">
          <SectionHeading eyebrow="At Titan Gym" title="Your Gym, Your Way" />
          <div className="feature-grid">
            <InlineMediaGallery title="Open gym" slides={openGymMedia} />
            <InlineMediaGallery title="Personal training" slides={personalTrainingMedia} />
            <InlineMediaGallery title="Nutrition coaching" slides={nutritionCoachingMedia} />
            <InlineMediaGallery title="Bodybuilding" slides={bodybuildingMedia} />
            {showShakeBar && <article className="feature-card feature-card--secondary feature-card--video">
              <h3>Shake bar</h3>
              <div className="offering-card__copy">
                <ul className="shake-menu">
                  <li><strong>Protein Shakes</strong><span>24–36 g protein<br />200–320 Calories</span></li>
                  <li><strong>Protein Ice Coffee</strong><span>22 g protein<br />120 Calories</span></li>
                </ul>
                <p className="shake-card__addons">Add-ons: creatine, caffeine &amp; protein.</p>
              </div>
              <div className="offering-card__media"><video autoPlay loop muted playsInline preload="none" poster="./images/shake-bar/shake-handoff.jpg" width="540" height="960" aria-hidden="true"><source src="./videos/shake-bar/shake-handoff.mp4" type="video/mp4" media="(prefers-reduced-motion: no-preference)" /></video></div>
            </article>}
          </div>
        </div>
      </section>

      <PhotoGallery />

      <section className="section section--light" id="membership" tabIndex={-1} aria-label="Membership options">
        <div className="container"><SectionHeading eyebrow="Membership" title="Invest in yourself" /><MembershipPreview /><h2 className="membership-specials">Visit for current specials!</h2></div>
      </section>

      <Callout eyebrow="Visit Titan Gym" title="Still deciding?" text={["Stop by and check out the gym for yourself. Day and week passes can be purchased at the front desk, in person only.", "Give us a call with any questions before you visit. We’re happy to help."]}>
        <ButtonLink href={site.mapsUrl} external>Get directions</ButtonLink>
        <ButtonLink href={site.phoneHref} variant="outline"><span className="phone-number"><PhoneIcon />Call us</span></ButtonLink>
        <ButtonLink href="#membership" variant="outline" className="callout__signup">Sign up</ButtonLink>
      </Callout>
    </>
  );
}

export function JoinPage() {
  return (
    <>
      <PageHero eyebrow="Join Titan Gym" title="Stop by, say hi" description="We're happy to chat! Email, Call, or best of all, stop by to check out our gym in person." image="./images/hero.jpg" imageAlt="Titan Gym's free weight and strength training floor"><ButtonLink href={site.signupUrl} external>Join online</ButtonLink></PageHero>
      <section className="section section--light contact-section"><div className="contact-section__media" aria-hidden="true"><img src="./images/owners.jpg" alt="" width="2316" height="3088" loading="lazy" decoding="async" /></div><div className="container join-grid"><div><p className="eyebrow">Get in touch</p><h2>Let's talk about your goals.</h2><p>Questions about memberships, coaching, or getting started? Reach us here.</p><div className="contact-methods"><div><span>Call</span><a href={site.phoneHref}><PhoneNumber /></a></div><div><span>Email</span><a href={`mailto:${site.email}`}><EmailAddress /></a></div><div><span>Visit</span><address>{site.addressLine}<br />{site.cityLine}</address></div></div><ButtonLink href={site.mapsUrl} external variant="text">Get directions</ButtonLink></div><div className="join-grid__contact"><h3>Talk with us</h3><ContactOptions /></div></div></section>
    </>
  );
}

export function CareersPage() {
  return (
    <>
      <PageHero eyebrow="Work with us" title="Help people get stronger." description="Bring your skills and your care for people to the Titan Gym community." image="./images/facility-wide.jpg" imageAlt="Training floor at Titan Gym in Alamo Ranch" />
      <section className="section section--light"><div className="container"><SectionHeading eyebrow="Current site listings" title="Explore opportunities." description="Roles listed on Titan Gym's current website. Contact us to confirm availability." /><div className="careers-grid">{roles.map((role) => <article key={role.title}><p className="eyebrow">Work with us</p><h3>{role.title}</h3><p>{role.summary}</p><h4>What we're looking for</h4><ul>{role.requirements.map((item) => <li key={item}>{item}</li>)}</ul><ButtonLink href={`mailto:${site.email}?subject=${encodeURIComponent(role.subject)}`} variant="outline">Apply by email</ButtonLink></article>)}</div></div></section>
      <Callout eyebrow="Don't see your role?" title="Tell us what you bring." text="We'd like to hear from people who care about fitness and community." />
    </>
  );
}
