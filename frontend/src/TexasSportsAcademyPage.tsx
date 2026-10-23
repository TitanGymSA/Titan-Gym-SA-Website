import { AcademyHeadline } from "./AcademyHeadline";
import { academyUrl, studentPlans } from "./academyData";
import { ButtonLink, Callout, SectionHeading } from "./components";
import { ArrowIcon, PhoneIcon } from "./Icons";
import { ResponsiveImage } from "./ResponsiveImage";
import { site } from "./siteData";

const fundingUrl = "https://educationfreedom.texas.gov/families/";

function AcademyLink() {
  return <a className="academy-name-link" href={academyUrl} target="_blank" rel="noopener noreferrer">Texas Sports Academy Online</a>;
}

const trainingTopics = [
  { title: "Start with their goals", text: "A stronger foundation for their sport, learning their way around the gym, or building a steady routine. Tell us what your student wants to work on." },
  { title: "Build with a coach", text: "Coached training is available for students ages 8 and up. Talk with us about their experience and goals so we can plan their starting point." },
  { title: "Keep their routine going", text: "Open gym and nutrition support are included in both options at no extra cost. Choose one or two coached sessions each week to fit their routine." },
];

const parentSteps = [
  { title: "Explore the school", text: <>Talk with <AcademyLink /> about academic fit, admissions, at-home supervision, tuition, and any funding application. The Academy handles school enrollment and academics.</> },
  { title: "Come see Titan", text: "Visit with your student, meet us, and take a look around. Share their age, training experience, sport, and goals so we can discuss suitable options and availability." },
  { title: "Choose their training option", text: "Choose one coached session per week through the $200 monthly option, or two through the $400 monthly option. The school pays for either option. Open gym and nutrition support are included; parents only pay if they request extra sessions." },
  { title: "Sign up by phone or in person", text: "Call Titan or come into the gym to sign your student up for training. We'll confirm their school authorization, training option, weekly schedule, and start date with you." },
];

const parentQuestions = [
  { question: "How do we sign up for training?", answer: <>Call Titan Gym at {site.phone} or visit us in person. We'll help you choose a training option and arrange your student's start date. School enrollment is handled separately by <AcademyLink />.</> },
  { question: "Does my student need to be an experienced athlete?", answer: "Tell us where they're starting. We can discuss their goals and experience, then confirm whether Titan has a suitable training option. Ask the Academy separately about its school admissions requirements." },
  { question: "Which ages can train with a coach?", answer: <>Coached sessions at Titan are available for students ages 8 and up. <AcademyLink /> advertises grades 3–12; school admission and Titan's coaching age requirement are separate. Ask us about open gym access and supervision for your student's age.</> },
  { question: "What training does the program cover?", answer: "The school-paid $200 monthly option includes one coached session per week. The $400 monthly option includes two coached sessions per week. Both include open gym and nutrition support." },
  { question: "Do parents pay anything for training?", answer: "No. The school pays the monthly program amount, and there is no parent-paid cost for the included training, open gym, or nutrition support. Parents only pay if they choose additional sessions beyond their student's program." },
  { question: "Does Titan provide the school day?", answer: <><AcademyLink /> provides the academic program. Contact Titan about local gym training; this page does not offer an on-site classroom or supervised school-day program.</> },
  { question: "Can we visit before deciding?", answer: "Please do! Stop by with your student to see the space and ask questions. Call ahead if you'd like to discuss student training so we can arrange a good time to talk." },
];

export function TexasSportsAcademyPage() {
  return (
    <div className="academy-page">
      <section className="academy-hero home-hero section--dark" aria-labelledby="academy-title">
        <div className="home-hero__image" aria-hidden="true">
          <ResponsiveImage src="./images/hero.jpg" alt="" sizes="100vw" preferredWidth={1920} fetchPriority="high" />
        </div>
        <div className="container academy-hero__content">
          <div className="academy-hero__copy">
            <AcademyHeadline />
            <p className="academy-hero__intro">Coached training for ages 8 and up, open gym, and nutrition support. All included with <strong>100% school-paid training</strong>, right here in Alamo Ranch.</p>
            <div className="button-row">
              <ButtonLink href={site.phoneHref}><span className="phone-number"><PhoneIcon />Call to sign up</span></ButtonLink>
              <ButtonLink href="#training-options" variant="outline">See training options</ButtonLink>
            </div>
            <p className="academy-hero__location">Alamo Ranch, San Antonio <span aria-hidden="true">/</span> Student training</p>
          </div>
          <div className="academy-collab" role="group" aria-label="Texas Sports Academy and Titan Gym">
            <a className="academy-collab__school" href={academyUrl} target="_blank" rel="noopener noreferrer">
              <ResponsiveImage src="./images/texas-sports-academy-logo.png" alt="Texas Sports Academy" sizes="(min-width: 560px) 450px, calc(100vw - 120px)" preferredWidth={720} />
            </a>
            <span className="academy-collab__ampersand" aria-hidden="true">&amp;</span>
            <a className="academy-collab__gym" href="./index.html">
              <ResponsiveImage src="./images/logo-horizontal.png" alt="Titan Gym" sizes="(min-width: 560px) 620px, calc(100vw - 32px)" preferredWidth={900} />
            </a>
          </div>
        </div>
      </section>

      <nav className="academy-jump-nav" aria-label="On this page">
        <div className="container">
          <a href="#academy-program"><ArrowIcon direction="down" /><span>The program</span></a>
          <a href="#student-training"><ArrowIcon direction="down" /><span>Student training</span></a>
          <a href="#parent-guide"><ArrowIcon direction="down" /><span>Parent guide</span></a>
          <a href="#parent-questions"><ArrowIcon direction="down" /><span>Common questions</span></a>
        </div>
      </nav>

      <section className="section section--light" id="academy-program" aria-labelledby="academy-program-title">
        <div className="container academy-overview">
          <SectionHeading id="academy-program-title" eyebrow="The big picture" title="Their education, their training, their next chapter" />
          <div className="academy-overview__copy">
            <p className="lead">Online academics through the Academy. Local training here at Titan.</p>
            <p><AcademyLink /> combines an online academic program with local sports training. Its focused academic model creates room in the day for athletics, personal development, and life outside the screen.</p>
            <p>At Titan, the school pays for your student's training option. Both include open gym and nutrition support, plus one or two coached sessions per week. Come meet us and find a routine that works for your student.</p>
            <dl className="academy-facts">
              <div><dt>School grade range</dt><dd>3–12</dd></div>
              <div><dt>Academy's learning model</dt><dd>2 hours<span>of focused academics per day</span></dd></div>
            </dl>
            <p className="academy-source-note">School model described by <AcademyLink />. Review your child's full daily routine and support needs with the school.</p>
          </div>
        </div>
        <div className="container academy-options" id="training-options" aria-labelledby="training-options-title">
          <div className="academy-options__heading">
            <div><p className="eyebrow">Two ways to get started</p><h3 id="training-options-title">Their training covered</h3></div>
            <p>Coaching for ages 8+.<br />Both options paid by the school.</p>
          </div>
          <div className="plan-grid plan-grid--preview">
            {studentPlans.map((plan) => (
              <article className="plan-card academy-plan" key={plan.id}>
                <p className="plan-card__label">Paid by the school</p>
                <h4>{plan.title}</h4>
                <p className="plan-card__price">$0<span>parent cost</span></p>
                <p className="academy-plan__school-cost">${plan.schoolPaidMonthlyAmount} per month · school-paid</p>
                <ul className="plan-card__features">
                  <li>{plan.sessions}</li>
                  <li>Open gym included</li>
                  <li>Nutrition support included</li>
                </ul>
                <ButtonLink href="#student-visit" variant="outline">How to sign up</ButtonLink>
              </article>
            ))}
          </div>
          <p className="academy-options__note">No parent-paid cost for included services. Additional sessions are parent-paid if requested. Contact us to confirm Academy authorization and arrange your student's start date.</p>
        </div>
      </section>

      <section className="section section--dark" id="student-training" aria-labelledby="student-training-title">
        <div className="container academy-training">
          <figure className="academy-training__photo">
            <ResponsiveImage src="./images/gym-floor.jpg" alt="Green power racks, benches, and strength equipment inside Titan Gym" sizes="(min-width: 900px) min(44vw, 550px), calc(100vw - 28px)" loading="lazy" />
            <figcaption>Your local gym. Come take a look.</figcaption>
          </figure>
          <div>
            <SectionHeading id="student-training-title" eyebrow="Student training at Titan" title="Build a routine that fits them" description="Every student starts somewhere different. Let's talk about their starting point and where they'd like to go." />
            <ol className="academy-training__topics">
              {trainingTopics.map((topic, index) => (
                <li key={topic.title}>
                  <span className="academy-step-number" aria-hidden="true">0{index + 1}</span>
                  <div><h3>{topic.title}</h3><p>{topic.text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section section--light" id="parent-guide" aria-labelledby="parent-guide-title">
        <div className="container">
          <SectionHeading id="parent-guide-title" eyebrow="A guide for parents" title="From questions to a plan" description="Start with a conversation. These four steps help you sort out school, training, and coverage before committing." />
          <div className="academy-parent-grid">
            <ol className="academy-parent-steps">
              {parentSteps.map((step, index) => (
                <li key={step.title}>
                  <span className="academy-step-number" aria-hidden="true">0{index + 1}</span>
                  <div><h3>{step.title}</h3><p>{step.text}</p></div>
                </li>
              ))}
            </ol>
            <aside className="academy-checklist" aria-labelledby="academy-checklist-title">
              <p className="eyebrow">For your first conversation</p>
              <h3 id="academy-checklist-title">Bring your questions and we'll talk it through</h3>
              <p>A few details help us get started:</p>
              <ul>
                <li>Your student's age and grade</li>
                <li>Their sport, interests, and training goals</li>
                <li>Any previous gym experience</li>
                <li>Days and times that fit your family</li>
                <li>Academy enrollment and funding status</li>
              </ul>
              <ButtonLink href={site.phoneHref} variant="text">Call to sign up</ButtonLink>
            </aside>
          </div>
        </div>
      </section>

      <section className="academy-funding section--light" aria-labelledby="academy-funding-title">
        <div className="container academy-funding__inner">
          <div><p className="eyebrow">Understand the funding</p><h2 id="academy-funding-title">School pays<br />They show up</h2></div>
          <div className="academy-funding__copy">
            <p><strong>The school pays Titan's $200 or $400 monthly program amount.</strong> Your family pays nothing for the included coached sessions, open gym, and nutrition support. Extra sessions are available at a parent-paid cost if you'd like more.</p>
            <p>Talk with the Academy about school enrollment and tuition. Eligible families may be able to use Texas Education Freedom Account (TEFA) funding toward Academy tuition, subject to state approval. Contact Titan to confirm your student's training authorization and arrange their start date.</p>
            <div className="academy-resource-links">
              <a href={`${academyUrl}pricing/`} target="_blank" rel="noopener noreferrer">Academy tuition &amp; training <ArrowIcon direction="up-right" /></a>
              <a href={fundingUrl} target="_blank" rel="noopener noreferrer">Official Texas funding guidance <ArrowIcon direction="up-right" /></a>
            </div>
            <p className="academy-source-note">Application windows and program terms change. Check the official guidance for current availability.</p>
          </div>
        </div>
      </section>

      <section className="section section--light" id="parent-questions" aria-labelledby="parent-questions-title">
        <div className="container academy-questions">
          <SectionHeading id="parent-questions-title" eyebrow="Before you get started" title="Good questions, clear next steps" description="A few things parents often want to know before arranging student training." />
          <div className="academy-questions__list">
            {parentQuestions.map(({ question, answer }) => (
              <details key={question}>
                <summary>{question}<span className="academy-question-toggle" aria-hidden="true" /></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div id="student-visit">
        <Callout eyebrow="Student training signup" title="Ready to sign up?" text={`Call ${site.phone} or visit Titan Gym in person to sign up for student training. We'll help you choose an option and arrange your student's first session.`}>
          <ButtonLink href={site.phoneHref}><span className="phone-number"><PhoneIcon />Call to sign up</span></ButtonLink>
          <ButtonLink href={site.mapsUrl} external variant="outline">Visit to sign up</ButtonLink>
        </Callout>
      </div>
    </div>
  );
}
