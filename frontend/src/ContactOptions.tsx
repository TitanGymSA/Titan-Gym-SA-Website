import { ButtonLink } from "./components";
import { PhoneNumber } from "./PhoneNumber";
import { site } from "./siteData";

export function ContactOptions() {
  return (
    <div className="contact-options">
      <p>Have questions? Email or call us.</p>
      <div className="button-row">
        <ButtonLink href={`mailto:${site.email}`}>Email Titan Gym</ButtonLink>
        <ButtonLink href={site.phoneHref} variant="outline"><PhoneNumber label="Call" /></ButtonLink>
      </div>
    </div>
  );
}
