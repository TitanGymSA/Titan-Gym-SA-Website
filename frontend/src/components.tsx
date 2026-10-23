import { useState } from "react";
import { EmailAddress } from "./EmailAddress";
import { ArrowIcon, FacebookIcon, InstagramIcon, YouTubeIcon } from "./Icons";
import { PhoneNumber } from "./PhoneNumber";
import { ResponsiveImage } from "./ResponsiveImage";
import { hours, navigation, site } from "./siteData";

type ButtonLinkProps = {
  children: React.ReactNode;
  href: string;
  variant?: "solid" | "outline" | "text";
  external?: boolean;
  className?: string;
};

export function ButtonLink({ children, href, variant = "solid", external = false, className = "" }: ButtonLinkProps) {
  return (
    <a
      className={`button-link button-link--${variant} ${className}`.trim()}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {href.startsWith("mailto:") ? <EmailAddress label={children} /> : children}
      <ArrowIcon direction={external ? "up-right" : "right"} />
    </a>
  );
}

export function Header({ pathname }: { pathname: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isStudentTraining = pathname === "/texas-sports-academy";
  const signupHref = isStudentTraining ? site.phoneHref : pathname === "/" ? "#membership" : "./index.html#membership";
  const signupLabel = isStudentTraining ? "Call to sign up" : "Join now";
  const signupDirection = isStudentTraining ? "right" : "down";

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="utility-bar">
        <div className="container utility-bar__inner">
          <span>Family owned. Alamo Ranch, San Antonio.</span>
          <a href={site.phoneHref}><PhoneNumber label="Call" /></a>
        </div>
      </div>
      <header className="site-header">
        <div className="container site-header__inner">
          <a className="brand brand--header" href="./index.html" aria-label="Titan Gym home">
            <ResponsiveImage src="./images/Logo_Dark_V2_w_Text.png" alt="" sizes="(max-width: 760px) 71px, 86px" preferredWidth={192} />
          </a>

          <nav className={`site-nav ${menuOpen ? "site-nav--open" : ""}`} id="primary-navigation" aria-label="Main navigation">
            {navigation.map((item) => {
              const href = item.href.startsWith("/#")
                ? (pathname === "/" ? item.href.slice(1) : `./index.html${item.href.slice(1)}`)
                : (item.href === "/" ? "./index.html" : `.${item.href}.html`);
              return (
                <a key={item.href} href={href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              );
            })}
            <a className="site-nav__mobile-cta" href={signupHref} onClick={() => setMenuOpen(false)}>{signupLabel} <ArrowIcon direction={signupDirection} /></a>
          </nav>

          <a className="site-header__cta" href={signupHref}>{signupLabel} <ArrowIcon direction={signupDirection} /></a>
          <button
            className="menu-toggle"
            type="button"
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a className="brand brand--footer" href="./index.html" aria-label="Titan Gym home">
            <ResponsiveImage src="./images/logo-horizontal.png" alt="" sizes="(max-width: 328px) calc(100vw - 28px), 300px" preferredWidth={600} />
          </a>
          <p>A family gym, right here in Alamo Ranch.</p>
          <div className="footer-socials" id="socials">
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Titan Gym on Facebook" title="Facebook"><FacebookIcon /></a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Titan Gym on Instagram" title="Instagram"><InstagramIcon /></a>
            <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="Titan Gym on YouTube" title="YouTube"><YouTubeIcon /></a>
          </div>
        </div>
        <nav aria-labelledby="footer-explore-title">
          <h2 id="footer-explore-title">Explore</h2>
          <ul className="footer-links">
            <li><a href="./index.html#gallery">Gallery</a></li>
            <li><a href="./index.html#membership">Membership</a></li>
            <li><a href="./texas-sports-academy.html">Student training</a></li>
            <li><a href="./careers.html">Careers</a></li>
          </ul>
        </nav>
        <div>
          <h2>Visit us</h2>
          <address>{site.addressLine}<br />{site.cityLine}</address>
          <ul className="footer-hours">
            {hours.map((item) => <li key={item.day}><span>{item.day}</span><span>{item.time}</span></li>)}
          </ul>
          <a className="footer-direction" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">Get directions <ArrowIcon direction="up-right" /></a>
        </div>
        <div>
          <h2>Get in touch</h2>
          <a className="footer-contact" href={site.phoneHref}><PhoneNumber /></a>
          <a className="footer-contact" href={`mailto:${site.email}`}><EmailAddress /></a>
          <a className="footer-direction" href="./join-now.html">Ask a question <ArrowIcon /></a>
        </div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Titan Gym. San Antonio, Texas.</span><span>“As iron sharpens iron, so one person sharpens another.” — Proverbs 27:17</span></div>
    </footer>
  );
}

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  children?: React.ReactNode;
};

export function PageHero({ eyebrow, title, description, image, imageAlt, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero__media"><ResponsiveImage src={image} alt={imageAlt} sizes="100vw" preferredWidth={1920} /></div>
      <div className="container page-hero__content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero__description">{description}</p>
        {children ? <div className="button-row">{children}</div> : null}
      </div>
    </section>
  );
}

export function SectionHeading({ id, eyebrow, title, description }: { id?: string; eyebrow: string; title: string; description?: string }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export function Callout({ eyebrow, title, text, children }: { eyebrow: string; title: string; text: string | readonly string[]; children?: React.ReactNode }) {
  return (
    <section className="callout">
      <div className="container callout__inner">
        <div className="callout__copy"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{(typeof text === "string" ? [text] : text).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <div className="button-row">
          {children ?? <>
            <ButtonLink href="./index.html#membership">Join Titan Gym</ButtonLink>
            <ButtonLink href="./join-now.html" variant="outline">Ask a question</ButtonLink>
          </>}
        </div>
      </div>
    </section>
  );
}
