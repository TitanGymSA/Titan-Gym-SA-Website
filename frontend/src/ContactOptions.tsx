import { ButtonLink } from "./components";
import { EmailAddress } from "./EmailAddress";
import { PhoneNumber } from "./PhoneNumber";
import { site } from "./siteData";

export function ContactOptions() {
  return (
    <div className="contact-options">
      <p>Questions about joining or training? Email or call us.</p>
      <div className="button-row">
        <ButtonLink href={`mailto:${site.email}`}>Email Titan Gym</ButtonLink>
        <ButtonLink href={site.phoneHref} variant="outline"><PhoneNumber label="Call" /></ButtonLink>
      </div>
      <p className="fine-print"><a href={`mailto:${site.email}`}><EmailAddress /></a></p>
    </div>
  );
}
