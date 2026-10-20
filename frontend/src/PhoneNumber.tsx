import { PhoneIcon } from "./Icons";
import { site } from "./siteData";

export function PhoneNumber({ label }: { label?: string }) {
  return (
    <span className="phone-number">
      {label ? `${label} ` : null}
      <PhoneIcon />
      {site.phone}
    </span>
  );
}