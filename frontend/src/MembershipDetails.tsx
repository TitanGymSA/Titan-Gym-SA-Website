import type { MembershipPlan } from "./siteData";

export function MembershipDetails({ plan }: { plan: MembershipPlan }) {
  if (plan.features?.length) {
    return <ul className="plan-card__features">{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>;
  }
  return plan.description ? <p className="plan-card__description">{plan.description}</p> : null;
}
