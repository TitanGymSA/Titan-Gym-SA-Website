import type { ReactNode } from "react";
import { EmailIcon } from "./Icons";
import { site } from "./siteData";

export function EmailAddress({ label = site.email }: { label?: ReactNode }) {
  return (
    <span className="email-address">
      <EmailIcon />
      <span className="email-address__text">{label}</span>
    </span>
  );
}
