import { useEffect } from "react";
import { ButtonLink } from "./components";
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_PLACE_ID } from "./googleReviewsConfig";
import { googleReviews, reviews } from "./siteData";

export function MemberReviews() {
  useEffect(() => {
    window.dispatchEvent(new Event("titan-google-reviews-ready"));
  }, []);

  return (
    <section className="section section--quote member-reviews" aria-labelledby="member-reviews-title" data-google-reviews="" data-reviews-state="static" data-api-key={GOOGLE_MAPS_API_KEY} data-place-id={GOOGLE_MAPS_PLACE_ID}>
      <div className="container">
        <div className="member-reviews__header">
          <div><p className="eyebrow">Member voices</p><h2 id="member-reviews-title">What members say</h2></div>
          <a className="member-reviews__rating" data-reviews-link="" data-reviews-rating="" href={googleReviews.url} target="_blank" rel="noopener noreferrer" aria-label={`${googleReviews.rating.toFixed(1)} out of 5 stars on Google. Read reviews.`}>
            <strong data-reviews-rating-value="">{googleReviews.rating.toFixed(1)}<span> / 5</span></strong>
            <span className="member-reviews__stars" data-reviews-stars="" aria-hidden="true">★★★★★</span>
            <span>On Google</span>
          </a>
        </div>
        <div className="member-reviews__grid" data-reviews-grid="">
          {reviews.slice(0, 3).map((review) => (
            <figure className="member-review" key={review.author}>
              <p className="member-review__source">Google review</p>
              <blockquote>“{review.quote}”</blockquote>
              <figcaption><strong>{review.author}</strong><span>{review.date}</span></figcaption>
            </figure>
          ))}
        </div>
        <p className="member-reviews__note" data-reviews-status="" role="status">Selected member reviews. See all reviews on Google Maps.</p>
        <div className="member-reviews__attribution" data-reviews-attributions="" />
        <div className="member-reviews__attribution" data-reviews-google-attribution="" hidden><span translate="no">Google Maps</span></div>
        <div className="section-end"><ButtonLink href={googleReviews.url} external variant="outline">Read more on Google</ButtonLink></div>
      </div>
    </section>
  );
}
