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
import { imageVariant, ResponsiveImage } from "./ResponsiveImage";
import { bodybuildingMedia, hours, nutritionCoachingMedia, openGymMedia, personalTrainingMedia, plans, roles, site } from "./siteData";

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

function CoachingOffer({ id, label, title, summary, details }: { id: string; label: string; title: string; summary?: string; details: string[] }) {
  return (
    <details
      className="coaching-offer"
      onClick={(event) => {
        if (event.currentTarget.open && event.target instanceof Element && !event.target.closest("summary")) {
          event.currentTarget.open = false;
        }
      }}
    >
      <summary id={`${id}-toggle`} aria-controls={`${id}-details`}>
        <span className="eyebrow coaching-offer__label">{label}</span>
        <span className="coaching-offer__title" role="heading" aria-level={3}>{title}</span>
        {summary ? <span className="coaching-offer__summary">{summary}</span> : null}
        <span className="coaching-offer__action">
          <span className="coaching-offer__open-label">Learn more</span>
          <span className="coaching-offer__close-label">Show less</span>
          <span className="coaching-offer__indicator" aria-hidden="true" />
        </span>
      </summary>
      <div className="coaching-offer__details" id={`${id}-details`} aria-labelledby={`${id}-toggle`}>
        <ul className="coaching-offer__list">
          {details.map((detail) => <li key={detail}><ResponsiveImage src="./images/logo-mark.png" alt="" aria-hidden="true" sizes="24px" preferredWidth={32} /><span>{detail}</span></li>)}
        </ul>
      </div>
    </details>
  );
}

export function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero__image"><ResponsiveImage src="./images/hero.jpg" alt="Wide view of Titan Gym's training floor in Alamo Ranch" sizes="(max-width: 760px) max(100vw, 854px), 100vw" preferredWidth={1920} fetchPriority="high" /></div>
        <div className="container home-hero__content">
          <HomeHeadline />
          <p>Find your rhythm with a family-owned gym in Alamo Ranch</p>
          <div className="button-row">
            <ButtonLink href="#membership">Join now</ButtonLink>
            <ButtonLink href="#gallery" variant="outline">Explore the gym</ButtonLink>
          </div>
        </div>
        <aside className="home-hero__contact" aria-label="Titan Gym hours and contact information">
          <p className="eyebrow">Plan your visit</p>
          <h2>Hours &amp; location</h2>
          <dl className="home-hero__hours">
            {hours.map((period) => <div key={period.day}><dt>{period.day === "Monday – Friday" ? "Mon – Fri" : period.day}</dt><dd>{period.time}</dd></div>)}
          </dl>
          <address>
            <a href={site.mapsUrl} target="_blank" rel="noreferrer">11720 Alamo Ranch Pkwy, Ste 240<br />San Antonio, TX 78253</a>
          </address>
          <div className="home-hero__contact-links">
            <a href={site.phoneHref}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </aside>
      </section>

      <GymHighlights />

      <section className="section section--light home-intro" id="about">
        <div className="home-intro__media" aria-hidden="true"><ResponsiveImage src="./images/community.jpg" alt="" sizes="(max-width: 760px) 100vw, 58vw" loading="lazy" /></div>
        <div className="container intro-grid intro-grid--home">
          <div className="home-intro__heading"><p className="eyebrow membership-options-eyebrow">Welcome to Titan Gym</p><h2>Family owned<br />In Alamo Ranch</h2></div>
          <div><p className="lead">A family tradition of health &amp; wellness</p><p>We believe taking care of yourself should fit into everyday life. We built Titan Gym as a place to do that with familiar faces and room to work towards your goals.</p></div>
        </div>
      </section>

      <section className="section section--dark home-offerings" aria-labelledby="offerings-title">
        <div className="container">
          <SectionHeading id="offerings-title" eyebrow="At Titan Gym" eyebrowClassName="membership-options-eyebrow" className="membership-options-heading" title="Your Gym, Your Way" />
          <div className="feature-grid">
            <InlineMediaGallery title="Open gym" slides={openGymMedia} />
            <InlineMediaGallery title="Personal training" slides={personalTrainingMedia} />
            <InlineMediaGallery id="nutrition-coaching" title="Nutrition coaching" slides={nutritionCoachingMedia} />
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
              <div className="offering-card__media"><video autoPlay loop muted playsInline preload="none" poster={imageVariant("./images/shake-bar/shake-handoff.jpg").src} width="540" height="960" aria-hidden="true"><source src="./videos/shake-bar/shake-handoff.mp4" type="video/mp4" media="(prefers-reduced-motion: no-preference)" /></video></div>
            </article>}
          </div>
        </div>
      </section>

      <section className="academy-home-link section--dark" aria-labelledby="academy-home-title">
        <div className="container academy-home-link__inner">
          <div className="academy-home-link__heading membership-options-heading"><p className="eyebrow membership-options-eyebrow">Texas Sports Academy</p><h2 id="academy-home-title">Their next chapter starts here</h2><p>Explore student training at Titan and a guide to getting started for parents</p></div>
          <ButtonLink href="./texas-sports-academy.html" variant="solid" className="academy-home-link__cta">Explore student training</ButtonLink>
        </div>
      </section>

      <PhotoGallery />

      <section className="section section--light" id="membership" tabIndex={-1} aria-labelledby="membership-title">
        <div className="container"><SectionHeading id="membership-title" eyebrow="Membership" eyebrowClassName="membership-options-eyebrow" className="membership-options-heading" title="Invest in yourself" /><MembershipPreview /><h2 className="membership-specials">Visit for current specials!</h2></div>
      </section>

      <Callout eyebrow="Visit Titan Gym" eyebrowClassName="membership-options-eyebrow" className="membership-options-heading" title="Still deciding?" text={["Stop by and check out the gym for yourself. Day and week passes can be purchased at the front desk, in person only.", "Give us a call with any questions before you visit. We’re happy to help."]}>
        <ButtonLink href={site.mapsUrl} external>Get directions</ButtonLink>
        <ButtonLink href={site.phoneHref} variant="outline"><span className="phone-number"><PhoneIcon />Call us</span></ButtonLink>
        <ButtonLink href="#membership" variant="outline" className="callout__signup">Sign up</ButtonLink>
      </Callout>
    </>
  );
}

export function MembershipPage() {
  return (
    <div className="membership-page">
      <PageHero eyebrow="Membership" eyebrowClassName="membership-options-eyebrow" title={<><span className="membership-hero__spacer" aria-hidden="true" /><span className="membership-hero__options">Options</span><span className="membership-hero__side-stack"><span className="membership-hero__choose">Choose</span><span className="membership-hero__how-you"><span>How</span><span>You</span></span></span><span className="membership-hero__train">Train</span></>} description="Whether you’re building a long-term routine or visiting for a few sessions, there’s an option for you." image="./images/hero.jpg" imageAlt="Training floor at Titan Gym in Alamo Ranch">
        <ButtonLink href="#membership-options">Compare options</ButtonLink>
      </PageHero>
      <section className="section section--light" id="membership-options" tabIndex={-1} aria-labelledby="membership-options-title">
        <div className="container">
          <SectionHeading id="membership-options-title" eyebrow="Membership options" eyebrowClassName="membership-options-eyebrow" className="membership-options-heading" title="Find your fit" />
          <div className="plan-grid">
            {plans.map((plan) => (
              <article className={`plan-card ${plan.featured ? "plan-card--featured" : ""}`} key={plan.name}>
                <p className="plan-card__label">{plan.featured ? "Best value" : plan.name.includes("pass") ? "Short-term access" : "Flexible training"}</p>
                <h3>{plan.name}</h3>
                <MembershipPrice plan={plan} />
                <MembershipDetails plan={plan} />
                {plan.name.includes("pass")
                  ? <ButtonLink href={site.mapsUrl} external variant="outline">Visit the front desk</ButtonLink>
                  : <ButtonLink href={site.signupUrl} external>Join online</ButtonLink>}
              </article>
            ))}
          </div>
          <p className="fine-print">Visit us for current specials or contact us with questions about choosing a plan.</p>
        </div>
      </section>
      <section className="section section--dark coaching-services" aria-label="Personal training, nutrition coaching, and bodybuilding coaching">
        <div className="container">
          <div className="coaching-services__grid">
            <section className="coaching-service coaching-service--personal-training coaching-service--unframed" aria-labelledby="personal-training-title">
              <div className="coaching-service__intro">
                <h2 id="personal-training-title">Personal training</h2>
                <p>Choose a 30-minute or 60-minute session to work with a personal trainer</p>
              </div>
              <div className="coaching-service__tiles">
                <CoachingOffer id="focused-session" label="Focused session" title="30 minutes" details={["One-on-one training with a personal trainer", "Your program is tailored to your goals, experience, and fitness level", "Choose the number of sessions you want to train each week", "Work with a nutrition coach to align your diet with your goals"]} />
                <CoachingOffer id="extended-session" label="Extended session" title="60 minutes" details={["One-on-one training with a personal trainer", "Your program is custom built to match your goals, experience, and fitness level", "Choose the number of sessions you want to train each week", "Work with a nutrition coach to align your diet with your goals"]} />
              </div>
            </section>
            <section className="coaching-service coaching-service--labeled-tile" aria-labelledby="nutrition-coaching-title">
              <div className="coaching-service__intro">
                <h2 id="nutrition-coaching-title">Nutrition coaching</h2>
              </div>
              <div className="coaching-service__tiles">
                <CoachingOffer id="nutrition-support" label="Nutrition Coaching" title="Build daily habits" summary="Get support with nutrition habits that fit your training and daily routine" details={["Set nutrition goals that support your figure and fitness goals", "Identify daily calorie and macro targets, including protein, carbohydrates, and fats", "Learn basic nutrition tracking and how to track calories and macros", "Find practical ways to meet your daily calorie, protein, carb, and fat targets", "Get meal-planning support and ideas for adjusting the meals you already enjoy", "Make manageable changes to your current diet so it better aligns with your goals, without overhauling your lifestyle", "Build sustainable nutrition habits that fit into your life"]} />
              </div>
            </section>
            <section className="coaching-service coaching-service--labeled-tile" aria-labelledby="bodybuilding-coaching-title">
              <div className="coaching-service__intro">
                <h2 id="bodybuilding-coaching-title">Bodybuilding coaching</h2>
              </div>
              <div className="coaching-service__tiles">
                <CoachingOffer id="bodybuilding-support" label="Bodybuilding Coaching" title="Build towards your goals" summary="Begin working with one of our bodybuilding coaches toward your competition goals" details={["Work with a bodybuilding coach on your preparation", "Get help with posing practice and presentation", "Get nutrition guidance to support your bodybuilding goals", "Tailor your workout program to the federation and division you are competing in"]} />
              </div>
            </section>
          </div>
          <div className="button-row coaching-services__cta">
            <ButtonLink href="./join-now.html" variant="outline">Ask about coaching</ButtonLink>
          </div>
        </div>
      </section>
      <Callout eyebrow="Come see us" eyebrowClassName="membership-options-eyebrow" className="membership-options-heading" title={<>Your next workout<br />Starts here</>} text="Stop by Titan Gym in Alamo Ranch to see the space and ask our team about membership options.">
        <ButtonLink href={site.mapsUrl} external>Get directions</ButtonLink>
        <ButtonLink href={site.phoneHref} variant="outline"><span className="phone-number"><PhoneIcon />Call us</span></ButtonLink>
      </Callout>
    </div>
  );
}

export function JoinPage() {
  return (
    <>
      <PageHero className="join-page-hero" eyebrow="Join Titan Gym" eyebrowClassName="membership-options-eyebrow" title="Stop by, say hi" description="We're happy to chat! Email, Call, or best of all, stop by to check out our gym in person" image="./images/hero.jpg" imageAlt="Titan Gym's free weight and strength training floor"><ButtonLink href={site.signupUrl} external>Join online</ButtonLink></PageHero>
      <section className="section section--light contact-section" aria-labelledby="contact-title">
        <div className="contact-section__media" aria-hidden="true"><ResponsiveImage src="./images/owners.jpg" alt="" sizes="(max-width: 760px) 100vw, 68vw" loading="lazy" decoding="async" /></div>
        <div className="container join-grid">
          <div>
            <div className="join-grid__intro membership-options-heading">
              <p className="eyebrow membership-options-eyebrow">Get in touch</p>
              <h2 id="contact-title">Let's talk about your fitness goals</h2>
            </div>
            <p>Questions about memberships, coaching, or getting started? Reach us here.</p>
            <dl className="contact-methods">
              <div><dt>Call</dt><dd><a href={site.phoneHref}><PhoneNumber /></a></dd></div>
              <div><dt>Email</dt><dd><a href={`mailto:${site.email}`}><EmailAddress /></a></dd></div>
              <div><dt>Visit</dt><dd><address>{site.addressLine}<br />{site.cityLine}</address></dd></div>
            </dl>
            <ButtonLink href={site.mapsUrl} external variant="text">Get directions</ButtonLink>
          </div>
          <div className="join-grid__contact"><h3>Talk with us</h3><ContactOptions /></div>
        </div>
      </section>
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
