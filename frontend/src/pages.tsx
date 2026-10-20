import { ButtonLink, Callout, PageHero, SectionHeading } from "./components";
import { ContactOptions } from "./ContactOptions";
import { HomeHeadline } from "./HomeHeadline";
import { ArrowIcon, PhoneIcon } from "./Icons";
import { InlineMediaGallery } from "./InlineMediaGallery";
import { MembershipPrice } from "./MembershipPrice";
import { MembershipDetails } from "./MembershipDetails";
import { MemberReviews } from "./MemberReviews";
import { PhotoGallery } from "./PhotoGallery";
import { PhoneNumber } from "./PhoneNumber";
import { bodybuildingMedia, nutritionCoachingMedia, openGymMedia, personalTrainingMedia, plans, reviews, roles, site } from "./siteData";

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
          <div><p className="lead">A family tradition of health &amp; wellness</p><p>We’re a family team who believe taking care of yourself should fit into everyday life. We built Titan Gym as a place to do that with familiar faces and room to work towards your goals.</p></div>
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

      <MemberReviews />
      <Callout eyebrow="Visit Titan Gym" title="Still deciding?" text={["Stop by and check out the gym for yourself. Day and week passes can be purchased at the front desk, in person only.", "Give us a call with any questions before you visit. We’re happy to help."]}>
        <ButtonLink href={site.mapsUrl} external>Get directions</ButtonLink>
        <ButtonLink href={site.phoneHref} variant="outline"><span className="phone-number"><PhoneIcon />Call us</span></ButtonLink>
        <ButtonLink href="#membership" variant="outline" className="callout__signup">Sign up</ButtonLink>
      </Callout>
    </>
  );
}

export function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Membership & training" title="Find your way to strong." description="Open gym access and personal support for the goals that matter to you." image="./images/strength-racks.jpg" imageAlt="Power racks and barbells inside Titan Gym"><ButtonLink href={site.signupUrl} external>Join online</ButtonLink></PageHero>
      <section className="section section--light"><div className="container"><SectionHeading eyebrow="Open gym" title="Choose your way in." description="Memberships and passes currently listed by Titan Gym." /><div className="plan-grid">{plans.map((plan) => <article className={`plan-card ${plan.featured ? "plan-card--featured" : ""}`} key={plan.name}><p className="plan-card__label">{plan.featured ? "Annual plan" : "Open gym"}</p><h3>{plan.name}</h3><MembershipPrice plan={plan} /><MembershipDetails plan={plan} /><ButtonLink href={site.signupUrl} external variant={plan.featured ? "solid" : "outline"}>Join online</ButtonLink></article>)}</div><p className="fine-print">Ask our team for current billing, access, and cancellation terms before joining.</p></div></section>
      <section className="section section--dark"><div className="container training-grid"><div><SectionHeading eyebrow="Personal training" title="A plan built around you." /><p>Trainers start with your goals, daily routine, and experience. From there, they can help you create a workout plan and build habits that last.</p><ButtonLink href="./join-now.html">Talk to a trainer</ButtonLink></div><div className="training-options"><article><span>01</span><h3>Initial consultation</h3><p>Start with a conversation about your goals.</p><strong>Free</strong></article><article><span>02</span><h3>30-minute session</h3><p>Focused coaching that fits a tighter schedule.</p><strong>Pricing depends on frequency</strong></article><article><span>03</span><h3>60-minute session</h3><p>More time for a full coaching session.</p><strong>Pricing depends on frequency</strong></article></div></div></section>
      <section className="section section--light"><div className="container support-grid"><div><p className="eyebrow">Beyond the workout</p><h2>Support for the whole journey.</h2></div><p>Titan Gym's current coaching copy includes personalized training, nutrition guidance, and ongoing check-ins. Ask a trainer which services fit your goals and plan.</p></div></section>
      <Callout eyebrow="Ready when you are" title="Let's get to work." text="Join online or reach out to find the right fit." />
    </>
  );
}

export function ReviewsPage() {
  return (
    <>
      <PageHero eyebrow="Member stories" title="The people make the place." description="Hear from members who found their place at Titan Gym." image="./images/community.jpg" imageAlt="Titan Gym members training in the weight room" />
      <section className="section section--light"><div className="container"><SectionHeading eyebrow="In their words" title="What members are saying." /><div className="review-grid">{reviews.map((review) => <figure key={review.author}><span className="review-grid__quote" aria-hidden="true">“</span><blockquote>{review.quote}</blockquote><figcaption><strong>{review.author}</strong><span>{review.date}</span></figcaption></figure>)}</div><div className="section-end"><ButtonLink href="https://www.google.com/maps/search/Titan+Gym+Alamo+Ranch+San+Antonio" external variant="outline">See more on Google</ButtonLink></div></div></section>
      <Callout eyebrow="Join the community" title="Experience it for yourself." text="We'd love to meet you at Titan Gym." />
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Our story" title="A gym with people at its center." description="Family owned, rooted in faith, and built for the Alamo Ranch community." image="./images/facility-wide.jpg" imageAlt="Inside Titan Gym's training floor and weight area" />
      <section className="section section--light"><div className="container intro-grid"><div><p className="eyebrow">Why we started</p><h2>Everybody deserves a place to grow stronger.</h2></div><div><p className="lead">Titan Gym began with a simple belief: fitness should feel personal and rooted in community.</p><p>We set out to create a space where first timers and experienced athletes alike feel at home. The work is yours, but you don't have to do it alone.</p></div></div></section>
      <section className="section section--dark"><div className="container"><SectionHeading eyebrow="What guides us" title="The values behind the work." /><div className="values-grid"><article><span>01</span><h3>Family first</h3><p>We welcome and support people at every stage of their fitness journey.</p></article><article><span>02</span><h3>Faith driven</h3><p>Our faith shapes the way we care for this community and the people in it.</p></article><article><span>03</span><h3>Progress focused</h3><p>We pay attention to your goals and the steps that move you toward them.</p></article><article><span>04</span><h3>Community built</h3><p>San Antonio is home. We are proud to serve our Alamo Ranch neighbors.</p></article></div></div></section>
      <section className="section section--image-quote"><div className="container"><p className="eyebrow">Philippians 4:13</p><blockquote>“I can do all this through him who gives me strength.”</blockquote></div></section>
      <Callout eyebrow="Come visit" title="Get to know Titan Gym in person." text="Stop by our Alamo Ranch facility. We'd love to meet you." />
    </>
  );
}

export function JoinPage() {
  return (
    <>
      <PageHero eyebrow="Join Titan Gym" title="Your place is here." description="Ready to get started? Join online, call us, or send a message to find your next step." image="./images/hero.jpg" imageAlt="Titan Gym's free weight and strength training floor"><ButtonLink href={site.signupUrl} external>Join online</ButtonLink></PageHero>
      <section className="section section--light"><div className="container join-grid"><div><p className="eyebrow">Get in touch</p><h2>Let's talk about your goals.</h2><p>Questions about memberships, coaching, or getting started? Reach our team here.</p><div className="contact-methods"><div><span>Call</span><a href={site.phoneHref}><PhoneNumber /></a></div><div><span>Email</span><a href={`mailto:${site.email}`}>{site.email}</a></div><div><span>Visit</span><address>{site.addressLine}<br />{site.cityLine}</address></div></div><ButtonLink href={site.mapsUrl} external variant="text">Get directions</ButtonLink></div><div className="join-grid__contact"><h3>Talk with our team</h3><ContactOptions /></div></div></section>
    </>
  );
}

export function SocialsPage() {
  const channels = [
    { name: "Facebook", handle: "Titan Gym SA", detail: "Community updates and gym news.", url: site.social.facebook },
    { name: "Instagram", handle: "@titangymsa", detail: "Training moments and a look inside the gym.", url: site.social.instagram },
    { name: "YouTube", handle: "Titan Gym", detail: "Videos, tutorials, and fitness content.", url: site.social.youtube },
  ];
  return (
    <>
      <PageHero eyebrow="Stay connected" title="The community keeps moving." description="Follow along and share your Titan Gym journey." image="./images/community.jpg" imageAlt="Titan Gym members working out together" />
      <section className="section section--light"><div className="container"><SectionHeading eyebrow="Find us online" title="Follow Titan Gym." /><div className="social-grid">{channels.map((channel) => <a key={channel.name} href={channel.url} target="_blank" rel="noopener noreferrer"><span>{channel.name}</span><h3>{channel.handle}</h3><p>{channel.detail}</p><strong>Follow <ArrowIcon direction="up-right" /></strong></a>)}</div><p className="social-tag">Tag your gym moments with <strong>#TitanGymSA</strong>.</p></div></section>
    </>
  );
}

export function TutorialsPage() {
  return (
    <>
      <PageHero eyebrow="Train with confidence" title="Keep learning. Keep moving." description="Explore exercise guidance from the Titan Gym team." image="./images/facility-01.jpg" imageAlt="Member training with weights at Titan Gym"><ButtonLink href={site.social.youtube} external>Visit our YouTube channel</ButtonLink></PageHero>
      <section className="section section--light"><div className="container"><SectionHeading eyebrow="Exercise guidance" title="Start with the fundamentals." description="Build good habits in every part of your training." /><div className="feature-grid feature-grid--light"><article className="feature-card"><span className="feature-card__number">01</span><h3>Strength training</h3><p>Practice the movements that form a solid foundation, from squats and deadlifts to presses.</p></article><article className="feature-card"><span className="feature-card__number">02</span><h3>Conditioning</h3><p>Build your capacity with purposeful cardio and full body work.</p></article><article className="feature-card"><span className="feature-card__number">03</span><h3>Mobility & recovery</h3><p>Give attention to movement quality and the time your body needs between sessions.</p></article></div><div className="section-end"><ButtonLink href={site.social.youtube} external>Watch on YouTube</ButtonLink></div></div></section>
    </>
  );
}

export function CareersPage() {
  return (
    <>
      <PageHero eyebrow="Join the team" title="Help people get stronger." description="Bring your skills and your care for people to the Titan Gym community." image="./images/facility-wide.jpg" imageAlt="Training floor at Titan Gym in Alamo Ranch" />
      <section className="section section--light"><div className="container"><SectionHeading eyebrow="Current site listings" title="Explore opportunities." description="Roles listed on Titan Gym's current website. Contact the team to confirm availability." /><div className="careers-grid">{roles.map((role) => <article key={role.title}><p className="eyebrow">Titan Gym team</p><h3>{role.title}</h3><p>{role.summary}</p><h4>What we're looking for</h4><ul>{role.requirements.map((item) => <li key={item}>{item}</li>)}</ul><ButtonLink href={`mailto:${site.email}?subject=${encodeURIComponent(role.subject)}`} variant="outline">Apply by email</ButtonLink></article>)}</div></div></section>
      <Callout eyebrow="Don't see your role?" title="Tell us what you bring." text="We'd like to hear from people who care about fitness and community." />
    </>
  );
}
