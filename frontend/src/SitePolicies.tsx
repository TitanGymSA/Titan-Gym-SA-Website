import { site } from "./siteData";

export function PrivacyPage() {
  return (
    <section className="section section--light">
      <div className="container policy-copy">
        <p className="eyebrow">Website information</p><h1>Privacy policy</h1>
        <p>This website provides information about Titan Gym and links to our contact details and membership signup.</p>
        <h2>Contacting the gym</h2>
        <p>If you call or email us, we receive the information you choose to share and use it to respond to your inquiry. Membership signup opens Gymdesk, which handles information submitted through its service.</p>
        <h2>Google Maps reviews</h2>
        <p>When the reviews section approaches your screen, this site connects to Google Maps to request current ratings and reviews. Your browser sends connection information, including your IP address and website referrer, to Google. Google processes information under its <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>, which applies to these Google features.</p>
        <p>This site does not save live Google review responses in your browser’s local storage. Google Maps may use its own cookies and storage as described in its Privacy Policy.</p>
        <h2>Other websites and hosting</h2>
        <p>Directions, membership signup, and social links open services with their own privacy policies. Our hosting provider also processes information needed to deliver the website; see <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub’s Privacy Statement</a>.</p>
        <h2>Questions</h2>
        <p>For questions about this website or information you shared with Titan Gym, email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      </div>
    </section>
  );
}

export function TermsPage() {
  return (
    <section className="section section--light">
      <div className="container policy-copy">
        <p className="eyebrow">Website information</p><h1>Website terms</h1>
        <p>This website provides information about Titan Gym. Contact the gym for current prices, hours, availability, and membership terms before purchasing. Membership and training agreements are provided separately when you sign up.</p>
        <h2>Google Maps features</h2>
        <p>Google Maps ratings, reviews, and directions are subject to the <a href="https://maps.google.com/help/terms_maps/" target="_blank" rel="noopener noreferrer">Google Maps/Google Earth Additional Terms of Service</a>, incorporated here for those features, and the <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Google Terms of Service</a>. Google selects which reviews its API makes available; this website does not display every review.</p>
        <h2>Privacy and other services</h2>
        <p>Read our <a href="./privacy.html">Privacy Policy</a> for information about Google Maps and other services used by this website. External services, including Gymdesk and social platforms, have their own terms.</p>
        <h2>Questions</h2>
        <p>Contact <a href={`mailto:${site.email}`}>{site.email}</a> with questions about this website.</p>
      </div>
    </section>
  );
}
