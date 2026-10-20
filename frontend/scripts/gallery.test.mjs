import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import { test } from "node:test";

const script = await readFile(new URL("../public/gallery.js", import.meta.url), "utf8");

function fixture(readyState = "complete") {
  function element(extra = {}) {
    const handlers = new Map();
    return {
      ...extra,
      handlers,
      focusCount: 0,
      focus() { this.focusCount++; },
      addEventListener(name, handler) {
        if (!handlers.has(name)) handlers.set(name, []);
        handlers.get(name).push(handler);
      },
      fire(name, event = {}) { for (const handler of handlers.get(name) ?? []) handler(event); },
    };
  }
  const thumbnails = Array.from({ length: 6 }, (_, index) => element({
    dataset: { gallerySrc: `./images/photo-${index}.jpg`, galleryAlt: `Gym photo ${index}` },
  }));
  const image = {};
  const status = {};
  const closeButton = element();
  const previous = element();
  const next = element();
  const dialog = element({
    open: false,
    modalCount: 0,
    closeCount: 0,
    showModal() { this.open = true; this.modalCount++; },
    close() { this.open = false; this.closeCount++; this.fire("close"); },
    querySelector: (selector) => ({
      "[data-gallery-image]": image,
      "[data-gallery-status]": status,
      "[data-gallery-close]": closeButton,
      "[data-gallery-previous]": previous,
      "[data-gallery-next]": next,
    })[selector],
  });
  const gallery = {
    dataset: {},
    querySelector: () => dialog,
    querySelectorAll: () => thumbnails,
  };
  const document = element({ readyState, getElementById: () => gallery, querySelectorAll: () => thumbnails });
  const window = element();
  runInNewContext(script, { document, window });
  return { thumbnails, image, status, dialog, closeButton, previous, next, document, window };
}

test("gallery opens modally, ignores background thumbnail activation, and backdrop closes without opening another photo", () => {
  const { thumbnails, image, status, dialog } = fixture();
  thumbnails[2].fire("click");
  assert.equal(dialog.modalCount, 1);
  assert.equal(dialog.open, true);
  assert.equal(image.src, thumbnails[2].dataset.gallerySrc);
  assert.match(status.textContent, /Photo 3 of 6/);
  thumbnails[0].fire("click");
  assert.equal(dialog.modalCount, 1);
  assert.equal(image.src, thumbnails[2].dataset.gallerySrc);
  let stopped = false;
  dialog.fire("click", { target: dialog, stopPropagation: () => { stopped = true; } });
  assert.equal(stopped, true);
  assert.equal(dialog.open, false);
  assert.equal(dialog.closeCount, 1);
  assert.equal(thumbnails[2].focusCount, 1);
  assert.equal(image.src, thumbnails[2].dataset.gallerySrc);
});

test("gallery arrows and keyboard navigate both directions and wrap at either end", () => {
  const { thumbnails, image, dialog, previous, next } = fixture();
  thumbnails[0].fire("click");
  previous.fire("click");
  assert.equal(image.src, thumbnails[5].dataset.gallerySrc);
  next.fire("click");
  assert.equal(image.src, thumbnails[0].dataset.gallerySrc);
  let prevented = 0;
  dialog.fire("keydown", { key: "ArrowRight", preventDefault: () => prevented++ });
  assert.equal(image.src, thumbnails[1].dataset.gallerySrc);
  dialog.fire("keydown", { key: "ArrowLeft", preventDefault: () => prevented++ });
  assert.equal(image.src, thumbnails[0].dataset.gallerySrc);
  dialog.fire("keydown", { key: "ArrowRight", altKey: true, preventDefault: () => assert.fail("Modified keys retain browser behavior") });
  assert.equal(image.src, thumbnails[0].dataset.gallerySrc);
  assert.equal(prevented, 2);
});

test("gallery initializes for static and React rendering without duplicate handlers; image clicks stay open and close returns focus", () => {
  const { thumbnails, image, dialog, closeButton, document, window } = fixture("loading");
  assert.equal(thumbnails[0].handlers.has("click"), false);
  document.fire("DOMContentLoaded");
  window.fire("titan-gallery-ready");
  assert.equal(thumbnails[0].handlers.get("click").length, 1);
  thumbnails[0].fire("click");
  dialog.fire("click", { target: image });
  assert.equal(dialog.open, true);
  closeButton.fire("click");
  assert.equal(dialog.open, false);
  assert.equal(thumbnails[0].focusCount, 1);
});
