import type { MembershipPlan } from "./siteData";

export function MembershipPrice({ plan }: { plan: MembershipPlan }) {
  return (
    <>
      {plan.comparisonPrice ? <p className="plan-card__comparison">One annual payment <del>{plan.comparisonPrice}</del></p> : null}
      <p className="plan-card__price">{plan.price}<span>{plan.period}</span></p>
      {plan.offer ? <p className="plan-card__offer">{plan.offer}</p> : null}
    </>
  );
}
