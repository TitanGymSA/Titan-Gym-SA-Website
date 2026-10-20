import { useState } from "react";
import { ArrowIcon } from "./Icons";
import { PhoneNumber } from "./PhoneNumber";
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
      {children}
      <ArrowIcon direction={external ? "up-right" : "right"} />
    </a>
  );
}

export function Header({ pathname }: { pathname: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const membershipHref = pathname === "/" ? "#membership" : "./index.html#membership";

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
            <img src="./images/Logo_Dark_V2_w_Text.png" alt="" width="1589" height="1222" />
          </a>

          <nav className={`site-nav ${menuOpen ? "site-nav--open" : ""}`} id="primary-navigation" aria-label="Main navigation">
            {navigation.map((item) => {
              const href = item.href === "/#gallery"
                ? (pathname === "/" ? "#gallery" : "./index.html#gallery")
                : (item.href === "/" ? "./index.html" : `.${item.href}.html`);
              return (
                <a key={item.href} href={href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              );
            })}
            <a className="site-nav__mobile-cta" href={membershipHref} onClick={() => setMenuOpen(false)}>Join now <ArrowIcon direction="down" /></a>
          </nav>

          <a className="site-header__cta" href={membershipHref}>Join now <ArrowIcon direction="down" /></a>
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
            <img src="./images/logo-mark.png" alt="" width="70" height="70" />
            <span><strong>TITAN GYM</strong><small>ALAMO RANCH, TX</small></span>
          </a>
          <p>A family owned gym built for the work, the people, and the progress that matters to you.</p>
          <div className="footer-socials">
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={site.social.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>
        <div>
          <h2>Explore</h2>
          <ul className="footer-links">
            <li><a href="./index.html#gallery">Gallery</a></li>
            <li><a href="./services.html">Membership & training</a></li>
            <li><a href="./reviews.html">Member stories</a></li>
            <li><a href="./about.html">About</a></li>
            <li><a href="./exercise-tutorial-videos.html">Exercise tutorials</a></li>
            <li><a href="./socials.html">Socials</a></li>
            <li><a href="./careers.html">Careers</a></li>
            <li><a href="./privacy.html">Privacy policy</a></li>
            <li><a href="./terms.html">Website terms</a></li>
          </ul>
        </div>
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
          <a className="footer-contact" href={`mailto:${site.email}`}>{site.email}</a>
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
      <div className="page-hero__media"><img src={image} alt={imageAlt} /></div>
      <div className="container page-hero__content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero__description">{description}</p>
        {children ? <div className="button-row">{children}</div> : null}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
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
