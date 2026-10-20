import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import { test } from "node:test";

const script = await readFile(new URL("../public/google-reviews.js", import.meta.url), "utf8");
const settle = () => new Promise(setImmediate);

function node(tag = "div", text = "") {
  const handlers = new Map();
  return {
    tag, children: [], attributes: {}, dataset: {}, style: { setProperty(name, value) { this[name] = value; } },
    get textContent() { return text + this.children.map((child) => child.textContent).join(""); },
    set textContent(value) { text = String(value); this.children = []; },
    set innerHTML(_) { assert.fail("Google content must never be inserted as HTML"); },
    append(...children) { this.children.push(...children); },
    replaceChildren(...children) { text = ""; this.children = children; },
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener(name, handler) { handlers.set(name, handler); },
    fire(name, event) { handlers.get(name)?.(event); },
    remove() { this.removed = true; },
  };
}

function fixture(options = {}) {
  const requests = [];
  const placeIds = [];
  const warnings = [];
  const timers = new Map();
  let timerId = 0;
  const data = {
    id: "ChIJtest", displayName: "Titan Gym", formattedAddress: "11720 Alamo Ranch Pkwy, San Antonio, TX 78253",
    rating: 4.6, userRatingCount: 143, googleMapsURI: "https://maps.google.com/?cid=123",
    reviews: [
      { text: "<img src=x onerror=alert(1)>", rating: 1, authorAttribution: { displayName: "First author", uri: "https://www.google.com/maps/contrib/first" }, publishTime: "2026-10-01T12:00:00Z" },
      { text: "Second review", rating: 5, authorAttribution: { displayName: "Second author", uri: "javascript:alert(1)" }, googleMapsURI: "https://www.google.com/maps/reviews/second" },
      { text: "Third review", rating: 4, authorAttribution: { displayName: "Third author" } },
      { text: "Fourth review", rating: 5, authorAttribution: { displayName: "Fourth author" } },
    ],
    attributions: [{ provider: "Data provider", providerURI: "https://example.test/provider" }],
    ...options.data,
  };
  class Place {
    constructor({ id }) { placeIds.push(id); Object.assign(this, data, { id }); }
    async fetchFields(request) {
      requests.push(request);
      if (options.fetchError) throw new Error("Simulated SDK failure with private URL");
      if (options.hang) await new Promise(() => {});
      return { place: this };
    }
  }
  const original = node("figure", "Selected static review");
  const grid = node(); grid.append(original);
  const elements = {
    "[data-reviews-grid]": grid,
    "[data-reviews-rating]": node("a"),
    "[data-reviews-rating-value]": node("strong"),
    "[data-reviews-stars]": node("span"),
    "[data-reviews-attributions]": node(),
    "[data-reviews-google-attribution]": node(),
    "[data-reviews-status]": node("p", "Selected member reviews."),
    ".section-end a": node("a"),
  };
  const section = node("section");
  section.dataset = { apiKey: "test-browser-key", placeId: "ChIJtest", ...options.dataset };
  section.querySelector = (selector) => elements[selector];
  const document = node();
  document.readyState = "complete";
  document.head = node("head"); document.body = node("body");
  document.createElement = (tag) => node(tag);
  document.createTextNode = (text) => node("#text", text);
  document.querySelectorAll = () => [section];
  const window = node();
  window.setTimeout = (callback, delay) => { const id = ++timerId; timers.set(id, { callback, delay }); return id; };
  window.clearTimeout = (id) => timers.delete(id);
  if (!options.loadSDK) window.google = { maps: { importLibrary: async () => ({ Place }) } };
  if (options.lazy) {
    window.IntersectionObserver = class {
      constructor(callback) { this.callback = callback; window.observer = this; }
      observe(target) { this.target = target; }
      disconnect() { this.disconnected = true; }
    };
  }
  Object.defineProperty(window, "localStorage", { get() { assert.fail("Do not persist Google review content"); } });
  runInNewContext(script, { document, window, URL, URLSearchParams, console: { warn: (message) => warnings.push(message) } });
  return { section, grid, original, elements, document, window, requests, placeIds, warnings, timers, Place };
}

test("no key preserves static reviews without Google requests or a notification", async () => {
  const context = fixture({ dataset: { apiKey: "" } });
  await settle();
  assert.equal(context.grid.children[0], context.original);
  assert.equal(context.requests.length, 0);
  assert.equal(context.document.head.children.length, 0);
  assert.equal(context.document.body.children.length, 0);
});

test("live reviews load once near the viewport, preserve Google order and replace rating/count", async () => {
  const context = fixture({ lazy: true });
  const { window, section, elements, requests, grid } = context;
  await settle();
  assert.equal(requests.length, 0);
  window.observer.callback([{ isIntersecting: true }]);
  window.observer.callback([{ isIntersecting: true }]);
  await settle();
  assert.equal(window.observer.disconnected, true);
  assert.equal(section.dataset.reviewsState, "live");
  assert.equal(section.attributes["aria-busy"], "false");
  assert.deepEqual(Array.from(requests[0].fields), ["rating", "userRatingCount", "reviews", "googleMapsURI"]);
  assert.equal(grid.children.length, 3);
  assert.ok(grid.children[0].textContent.includes("First author"));
  assert.ok(grid.children[0].children.some((child) => child.attributes["aria-label"] === "1 out of 5 stars"));
  assert.equal(elements["[data-reviews-rating-value]"].textContent, "4.6 / 5");
  assert.equal(elements["[data-reviews-stars]"].style["--review-rating"], "92%");
  assert.match(elements["[data-reviews-rating]"].attributes["aria-label"], /143 reviews/);
  assert.equal(elements[".section-end a"].href, "https://maps.google.com/?cid=123");
  window.fire("titan-google-reviews-ready");
  await settle();
  assert.equal(requests.length, 1);
});

test("Google text stays text; authors, dates and provider attributions are retained with safe links", async () => {
  const { grid, elements } = fixture();
  await settle();
  assert.equal(grid.children[0].children.find((child) => child.tag === "blockquote").textContent, "<img src=x onerror=alert(1)>");
  const author = grid.children[0].children.find((child) => child.tag === "figcaption").children[0].children[0];
  assert.equal(author.href, "https://www.google.com/maps/contrib/first");
  assert.equal(author.rel, "noopener noreferrer");
  const unsafeAuthor = grid.children[1].children.find((child) => child.tag === "figcaption").children[0].children[0];
  assert.equal(unsafeAuthor.tag, "span");
  assert.equal(unsafeAuthor.href, undefined);
  const date = grid.children[0].children.find((child) => child.tag === "figcaption").children[1];
  assert.equal(date.dateTime, "2026-10-01T12:00:00.000Z");
  assert.equal(elements["[data-reviews-google-attribution]"].hidden, false);
  assert.equal(elements["[data-reviews-attributions]"].children[0].textContent, "Data provider");
});

test("the configured Place ID selects the exact gym without an additional text search", async () => {
  const context = fixture({ dataset: { placeId: "ChIJrzXJpY9hJaYR6H4EusAGIEs" } });
  await settle();
  assert.deepEqual(context.placeIds, ["ChIJrzXJpY9hJaYR6H4EusAGIEs"]);
  assert.equal(context.requests.length, 1);
});

test("API failure keeps fallback content and shows a dismissible error toast without leaking errors", async () => {
  const { section, grid, original, document, warnings } = fixture({ fetchError: true });
  await settle();
  assert.equal(section.dataset.reviewsState, "unavailable");
  assert.equal(grid.children[0], original);
  assert.equal(document.body.children[0].attributes.role, "alert");
  const toast = document.body.children[0];
  toast.children[1].fire("click");
  assert.equal(toast.removed, true);
  assert.equal(warnings.length, 1);
  assert.ok(!warnings[0].includes("private URL"));
});

test("an empty API response removes fallback reviews and does not retain a stale overall rating", async () => {
  const { section, grid, elements } = fixture({ data: { reviews: [], rating: null } });
  await settle();
  assert.equal(section.dataset.reviewsState, "live");
  assert.equal(grid.children[0].tag, "p");
  assert.match(grid.children[0].textContent, /No reviews available/);
  assert.equal(elements["[data-reviews-rating]"].hidden, true);
});

test("SDK bootstrap uses a single async callback script and handles network failure", async () => {
  const { document, window, section, requests } = fixture({ loadSDK: true });
  const sdk = document.head.children[0];
  const url = new URL(sdk.src);
  assert.equal(url.origin, "https://maps.googleapis.com");
  assert.equal(url.searchParams.get("libraries"), "places");
  assert.equal(url.searchParams.get("loading"), "async");
  assert.equal(url.searchParams.get("key"), "test-browser-key");
  assert.equal(sdk.async, true);
  window.fire("titan-google-reviews-ready");
  assert.equal(document.head.children.length, 1);
  sdk.onerror();
  await settle();
  assert.equal(section.dataset.reviewsState, "unavailable");
  assert.equal(requests.length, 0);
});

test("a stalled details request times out and releases the busy state", async () => {
  const { section, timers } = fixture({ hang: true });
  await settle();
  const timer = [...timers.values()].find((item) => item.delay === 15000);
  assert.ok(timer);
  timer.callback();
  await settle();
  assert.equal(section.dataset.reviewsState, "unavailable");
  assert.equal(section.attributes["aria-busy"], "false");
});
