(() => {
  let mapsPromise;

  function httpsURL(value) {
    try {
      const url = new URL(value);
      return url.protocol === "https:" ? url.href : "";
    } catch { return ""; }
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function externalLink(text, url) {
    const safeURL = httpsURL(url);
    const node = element(safeURL ? "a" : "span", "", text);
    if (safeURL) {
      node.href = safeURL;
      node.target = "_blank";
      node.rel = "noopener noreferrer";
    }
    return node;
  }

  function withTimeout(promise) {
    return new Promise((resolve, reject) => {
      const timer = window.setTimeout(() => reject(new Error("Google reviews timed out")), 15000);
      Promise.resolve(promise).then(resolve, reject).finally(() => window.clearTimeout(timer));
    });
  }

  function loadPlaces(apiKey) {
    if (!mapsPromise) {
      mapsPromise = withTimeout(new Promise((resolve, reject) => {
        if (window.google?.maps?.importLibrary) {
          resolve();
          return;
        }
        window.titanGoogleMapsReady = () => resolve();
        const previousAuthFailure = window.gm_authFailure;
        window.gm_authFailure = () => {
          reject(new Error("Google Maps authorization failed"));
          previousAuthFailure?.();
        };
        const script = document.createElement("script");
        const url = new URL("https://maps.googleapis.com/maps/api/js");
        url.search = new URLSearchParams({ key: apiKey, loading: "async", callback: "titanGoogleMapsReady", libraries: "places", v: "quarterly", language: "en", region: "US" }).toString();
        script.src = url.href;
        script.async = true;
        script.onerror = () => reject(new Error("Google Maps could not load"));
        document.head.append(script);
      })).then(() => withTimeout(window.google.maps.importLibrary("places")));
    }
    return mapsPromise;
  }

  function reviewCard(review) {
    const card = element("figure", "member-review");
    card.append(element("p", "member-review__source", "Google review"));
    if (Number.isFinite(review.rating) && review.rating >= 0 && review.rating <= 5) {
      const stars = element("p", "member-reviews__stars", "★".repeat(Math.round(review.rating)) + "☆".repeat(5 - Math.round(review.rating)));
      stars.setAttribute("aria-label", `${review.rating} out of 5 stars`);
      card.append(stars);
    }
    if (review.text) card.append(element("blockquote", "", review.text));
    const caption = element("figcaption");
    const author = review.authorAttribution;
    const authorName = element("strong");
    authorName.append(externalLink(author.displayName, author.uri));
    caption.append(authorName);
    const date = review.publishTime ? new Date(review.publishTime) : null;
    if (date && Number.isFinite(date.getTime())) {
      const time = element("time", "", date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }));
      time.dateTime = date.toISOString();
      caption.append(time);
    } else if (review.relativePublishTimeDescription) {
      caption.append(element("span", "", review.relativePublishTimeDescription));
    }
    if (httpsURL(review.googleMapsURI)) caption.append(externalLink("View review", review.googleMapsURI));
    card.append(caption);
    return card;
  }

  function showErrorToast() {
    const toast = element("div", "toast toast--error");
    toast.setAttribute("role", "alert");
    toast.setAttribute("popover", "manual");
    toast.append(element("span", "", "Current Google reviews couldn’t load. Use Read more on Google to see all reviews."));
    const close = element("button", "", "×");
    close.type = "button";
    close.setAttribute("aria-label", "Dismiss notification");
    close.addEventListener("click", () => toast.remove());
    toast.append(close);
    document.body.append(toast);
    // A top-layer toast stays visible even while the photo dialog is open.
    toast.showPopover?.();
    window.setTimeout(() => toast.remove(), 8000);
  }

  function renderPlace(section, place) {
    const grid = section.querySelector("[data-reviews-grid]");
    const liveReviews = (place.reviews || []).filter((review) => review.authorAttribution?.displayName).slice(0, 3);
    const cards = liveReviews.map(reviewCard);
    grid.replaceChildren(...(cards.length ? cards : [element("p", "", "No reviews available here yet. Visit Google Maps to see more.")]));

    const ratingLink = section.querySelector("[data-reviews-rating]");
    const validRating = Number.isFinite(place.rating) && place.rating >= 0 && place.rating <= 5;
    ratingLink.hidden = !validRating;
    if (validRating) {
      const count = Number.isInteger(place.userRatingCount) && place.userRatingCount >= 0 ? place.userRatingCount : null;
      section.querySelector("[data-reviews-rating-value]").replaceChildren(document.createTextNode(place.rating.toFixed(1)), element("span", "", " / 5"));
      const stars = section.querySelector("[data-reviews-stars]");
      stars.style.setProperty("--review-rating", `${place.rating / 5 * 100}%`);
      ratingLink.setAttribute("aria-label", `${place.rating.toFixed(1)} out of 5 stars on Google${count === null ? "" : `, based on ${count.toLocaleString("en-US")} reviews`}. Read reviews.`);
    }
    const mapsURL = httpsURL(place.googleMapsURI);
    if (mapsURL) {
      ratingLink.href = mapsURL;
      section.querySelector(".section-end a").href = mapsURL;
    }
    const attributions = section.querySelector("[data-reviews-attributions]");
    attributions.replaceChildren();
    for (const attribution of place.attributions || []) {
      if (attribution.provider) attributions.append(externalLink(attribution.provider, attribution.providerURI));
    }
    section.querySelector("[data-reviews-google-attribution]").hidden = false;
    section.querySelector("[data-reviews-status]").textContent = "Reviews provided by Google Maps.";
    section.dataset.reviewsState = "live";
  }

  async function fetchReviews(section) {
    section.dataset.reviewsState = "loading";
    section.setAttribute("aria-busy", "true");
    try {
      const { Place } = await loadPlaces(section.dataset.apiKey);
      const place = new Place({ id: section.dataset.placeId });
      await withTimeout(place.fetchFields({ fields: ["rating", "userRatingCount", "reviews", "googleMapsURI"] }));
      renderPlace(section, place);
    } catch {
      section.dataset.reviewsState = "unavailable";
      // Never print SDK errors/URLs, which can include the browser API key.
      console.warn("Google reviews unavailable. Check Maps/Places API access, billing, website restrictions, and Place ID.");
      showErrorToast();
    } finally {
      section.setAttribute("aria-busy", "false");
    }
  }

  function initialize() {
    for (const section of document.querySelectorAll("[data-google-reviews]")) {
      if (section.dataset.reviewsInitialized === "true" || !section.dataset.apiKey) continue;
      section.dataset.reviewsInitialized = "true";
      if ("IntersectionObserver" in window) {
        let requested = false;
        const observer = new window.IntersectionObserver((entries) => {
          if (requested || !entries.some((entry) => entry.isIntersecting)) return;
          requested = true;
          observer.disconnect();
          void fetchReviews(section);
        }, { rootMargin: "200px" });
        observer.observe(section);
      } else void fetchReviews(section);
    }
  }

  window.addEventListener("titan-google-reviews-ready", initialize);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
