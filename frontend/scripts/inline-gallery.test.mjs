import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import { test } from "node:test";

const script = await readFile(new URL("../public/inline-gallery.js", import.meta.url), "utf8");

function fixture(reduceMotion = false, { visible = true, near = visible, withObserver = true } = {}) {
  function element(extra = {}) {
    const handlers = new Map();
    return {
      ...extra,
      handlers,
      addEventListener(name, handler) {
        if (!handlers.has(name)) handlers.set(name, []);
        handlers.get(name).push(handler);
      },
      fire(name, event = {}) { for (const handler of handlers.get(name) ?? []) handler(event); },
    };
  }
  const makeVideo = () => ({
    playing: false,
    playCount: 0,
    loadCount: 0,
    preload: "none",
    load() { this.loadCount++; this.playing = false; },
    play() { this.playing = true; this.playCount++; return Promise.resolve(); },
    pause() { this.playing = false; },
  });
  const video = makeVideo();
  const secondVideo = makeVideo();
  const image = { loading: "lazy" };
  const slides = Array.from({ length: 3 }, (_, index) => ({
    hidden: index !== 0,
    attributes: {},
    setAttribute(name, value) { this.attributes[name] = value; },
    querySelector: (selector) => selector === "video"
      ? [video, secondVideo, null][index]
      : (index === 2 ? image : null),
  }));
  const status = {};
  const thumbnails = slides.map(() => element({
    attributes: {},
    setAttribute(name, value) { this.attributes[name] = value; },
  }));
  const previous = element();
  const next = element();
  const captures = new Set();
  const stripClasses = new Set();
  const thumbnailStrip = element({
    scrollLeft: 100,
    classList: { add: (name) => stripClasses.add(name), remove: (name) => stripClasses.delete(name), contains: (name) => stripClasses.has(name) },
    setPointerCapture: (id) => captures.add(id),
    hasPointerCapture: (id) => captures.has(id),
    releasePointerCapture: (id) => captures.delete(id),
  });
  const stage = {
    rect: { top: visible ? 100 : 2000, bottom: visible ? 700 : 2600, left: 0, right: 500 },
    getBoundingClientRect() { return this.rect; },
  };
  const gallery = element({
    dataset: {},
    querySelectorAll: (selector) => selector === "[data-media-thumbnail]" ? thumbnails : slides,
    querySelector: (selector) => ({
      "[data-media-status]": status,
      "[data-media-previous]": previous,
      "[data-media-next]": next,
      ".inline-media-gallery__thumbnails": thumbnailStrip,
      ".feature-card__media": stage,
    })[selector],
  });
  const motion = element({ matches: reduceMotion });
  const document = element({ readyState: "complete", hidden: false, querySelectorAll: () => [gallery] });
  const observers = [];
  class MockObserver {
    constructor(callback, options) { this.callback = callback; this.options = options; observers.push(this); }
    observe(target) { this.target = target; }
    emit(isIntersecting, intersectionRatio = isIntersecting ? 1 : 0) {
      this.callback([{ target: this.target, isIntersecting, intersectionRatio }]);
    }
  }
  const window = element({
    matchMedia: () => motion, innerHeight: 768, innerWidth: 1024,
    ...(withObserver ? { IntersectionObserver: MockObserver } : {}),
  });
  runInNewContext(script, { document, window });
  const preloadObserver = observers.find((observer) => observer.options.rootMargin);
  const playbackObserver = observers.find((observer) => !observer.options.rootMargin);
  if (withObserver) {
    preloadObserver.emit(near);
    playbackObserver.emit(visible);
  }
  return { slides, thumbnails, thumbnailStrip, video, secondVideo, image, stage, preloadObserver, playbackObserver, status, previous, next, gallery, document, window, motion };
}

test("mouse drag scrolls thumbnails without selecting; clicks and keyboard activation stay usable", () => {
  const { thumbnailStrip: strip, thumbnails, slides } = fixture();
  const pointer = { pointerType: "mouse", isPrimary: true, button: 0, buttons: 1, pointerId: 1, clientX: 100 };
  strip.fire("pointerdown", pointer);
  strip.fire("pointermove", { ...pointer, clientX: 97, preventDefault: () => assert.fail("A small movement keeps click behavior") });
  assert.equal(strip.scrollLeft, 100);
  strip.fire("pointermove", { ...pointer, clientX: 60, preventDefault() {} });
  assert.equal(strip.scrollLeft, 140);
  assert.ok(strip.hasPointerCapture(1));
  assert.ok(strip.classList.contains("is-dragging"));
  strip.fire("pointerup", pointer);
  assert.equal(strip.hasPointerCapture(1), false);
  assert.equal(strip.classList.contains("is-dragging"), false);
  let stopped = false;
  strip.fire("click", { detail: 1, preventDefault() {}, stopPropagation() { stopped = true; } });
  assert.equal(stopped, true);
  assert.equal(slides[0].hidden, false);
  strip.fire("pointerdown", pointer);
  strip.fire("pointerup", pointer);
  strip.fire("click", { detail: 1, preventDefault: () => assert.fail("A click must select") });
  thumbnails[1].fire("click");
  assert.equal(slides[1].hidden, false);
  strip.fire("click", { detail: 0, preventDefault: () => assert.fail("Keyboard activation must select") });
});

test("touch uses native swipe, and canceled or released mouse drags clean up", () => {
  const { thumbnailStrip: strip } = fixture();
  const pointer = { pointerType: "touch", isPrimary: true, button: 0, buttons: 1, pointerId: 2, clientX: 100 };
  strip.fire("pointerdown", pointer);
  strip.fire("pointermove", { ...pointer, clientX: 20, preventDefault: () => assert.fail("Touch scrolling must remain native") });
  assert.equal(strip.scrollLeft, 100);
  assert.equal(strip.hasPointerCapture(2), false);
  strip.fire("pointerdown", { ...pointer, pointerType: "mouse" });
  strip.fire("pointermove", { ...pointer, clientX: 50, preventDefault() {} });
  strip.fire("pointercancel", pointer);
  assert.equal(strip.classList.contains("is-dragging"), false);
  assert.equal(strip.hasPointerCapture(2), false);
  strip.fire("pointerdown", { ...pointer, pointerType: "mouse" });
  strip.fire("pointermove", { ...pointer, clientX: 10, buttons: 0 });
  assert.equal(strip.scrollLeft, 150);
});

test("thumbnails select media directly and stay synchronized with arrow navigation", () => {
  const { slides, thumbnails, video, next, status } = fixture();
  assert.deepEqual(thumbnails.map((thumbnail) => thumbnail.attributes["aria-pressed"]), ["true", "false", "false"]);
  thumbnails[2].fire("click");
  assert.equal(slides[2].hidden, false);
  assert.equal(video.playing, false);
  assert.equal(status.textContent, "Slide 3 of 3");
  assert.deepEqual(thumbnails.map((thumbnail) => thumbnail.attributes["aria-pressed"]), ["false", "false", "true"]);
  next.fire("click");
  assert.equal(slides[0].hidden, false);
  assert.equal(video.playing, true);
  assert.deepEqual(thumbnails.map((thumbnail) => thumbnail.attributes["aria-pressed"]), ["true", "false", "false"]);
});

test("inline gallery switches and wraps media, pausing hidden video and resuming it when selected", () => {
  const { slides, video, next, previous, status } = fixture();
  assert.equal(video.playing, true);
  next.fire("click");
  assert.equal(slides[0].hidden, true);
  assert.equal(slides[0].attributes["aria-hidden"], "true");
  assert.equal(slides[1].hidden, false);
  assert.equal(video.playing, false);
  assert.equal(status.textContent, "Slide 2 of 3");
  next.fire("click");
  next.fire("click");
  assert.equal(slides[0].hidden, false);
  assert.equal(video.playing, true);
  previous.fire("click");
  assert.equal(slides[2].hidden, false);
  assert.equal(video.playing, false);
});

test("inline gallery supports unmodified arrow keys and initializes handlers only once", () => {
  const { slides, gallery, window, next } = fixture();
  let prevented = 0;
  gallery.fire("keydown", { key: "ArrowRight", preventDefault: () => prevented++ });
  assert.equal(slides[1].hidden, false);
  gallery.fire("keydown", { key: "ArrowLeft", preventDefault: () => prevented++ });
  assert.equal(slides[0].hidden, false);
  gallery.fire("keydown", { key: "ArrowRight", ctrlKey: true, preventDefault: () => assert.fail("Modified keys keep browser behavior") });
  assert.equal(slides[0].hidden, false);
  assert.equal(prevented, 2);
  window.fire("titan-inline-gallery-ready");
  assert.equal(next.handlers.get("click").length, 1);
});

test("inline gallery respects reduced motion and pauses while the page is hidden", () => {
  const { motion, video, document } = fixture(true);
  assert.equal(video.playCount, 0);
  motion.matches = false;
  motion.fire("change");
  assert.equal(video.playing, true);
  document.hidden = true;
  document.fire("visibilitychange");
  assert.equal(video.playing, false);
  document.hidden = false;
  document.fire("visibilitychange");
  assert.equal(video.playing, true);
  motion.matches = true;
  motion.fire("change");
  assert.equal(video.playing, false);
});

test("nearby galleries preload selected and next media without offscreen playback or repeated loads", () => {
  const { video, secondVideo, image, next, preloadObserver, playbackObserver } = fixture(false, { visible: false });
  assert.equal(video.loadCount, 0);
  assert.equal(video.playCount, 0);
  preloadObserver.emit(true);
  assert.equal(video.preload, "auto");
  assert.equal(video.loadCount, 1);
  assert.equal(secondVideo.loadCount, 1);
  assert.equal(video.playing, false);
  assert.equal(image.loading, "lazy");
  playbackObserver.emit(true);
  assert.equal(video.playing, true);
  next.fire("click");
  assert.equal(video.playing, false);
  assert.equal(secondVideo.playing, true);
  assert.equal(image.loading, "eager");
  playbackObserver.emit(false);
  assert.equal(secondVideo.playing, false);
  playbackObserver.emit(true);
  assert.equal(secondVideo.playing, true);
  assert.equal(video.loadCount, 1);
  assert.equal(secondVideo.loadCount, 1);
});

test("tab visibility and reduced-motion changes never restart offscreen videos", () => {
  const { video, motion, document, preloadObserver, playbackObserver } = fixture(true, { visible: false });
  preloadObserver.emit(true);
  assert.equal(video.loadCount, 0);
  document.hidden = true;
  motion.matches = false;
  motion.fire("change");
  assert.equal(video.loadCount, 0);
  document.hidden = false;
  document.fire("visibilitychange");
  assert.equal(video.loadCount, 1);
  assert.equal(video.playCount, 0);
  // Edge contact alone is not enough to start a video.
  playbackObserver.emit(true, 0);
  assert.equal(video.playCount, 0);
  playbackObserver.emit(true);
  assert.equal(video.playing, true);
  playbackObserver.emit(false);
  document.fire("visibilitychange");
  motion.fire("change");
  assert.equal(video.playing, false);
});

test("scroll fallback preloads nearby video and pauses it outside the viewport", () => {
  const { stage, video, window } = fixture(false, { visible: false, withObserver: false });
  assert.equal(video.playCount, 0);
  stage.rect = { top: 1000, bottom: 1600, left: 0, right: 500 };
  window.fire("scroll");
  assert.equal(video.loadCount, 1);
  assert.equal(video.playing, false);
  stage.rect = { top: 500, bottom: 1100, left: 0, right: 500 };
  window.fire("scroll");
  assert.equal(video.playing, true);
  stage.rect = { top: -700, bottom: -100, left: 0, right: 500 };
  window.fire("resize");
  assert.equal(video.playing, false);
});
