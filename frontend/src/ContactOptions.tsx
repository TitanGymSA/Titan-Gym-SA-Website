import { ButtonLink } from "./components";
import { PhoneNumber } from "./PhoneNumber";
import { site } from "./siteData";

export function ContactOptions() {
  return (
    <div className="contact-options">
      <p>Questions about joining or training? Email or call our team.</p>
      <div className="button-row">
        <ButtonLink href={`mailto:${site.email}`}>Email Titan Gym</ButtonLink>
        <ButtonLink href={site.phoneHref} variant="outline"><PhoneNumber label="Call" /></ButtonLink>
      </div>
      <p className="fine-print">Email opens your email app. You can also write to <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </div>
  );
}
