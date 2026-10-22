import assert from "node:assert/strict";
import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import { test } from "node:test";
import { promisify } from "node:util";

const output = fileURLToPath(new URL("../../public/", import.meta.url));
const frontend = fileURLToPath(new URL("../", import.meta.url));
const execute = promisify(execFile);
const files = (await readdir(output)).filter((file) => file.endsWith(".html"));

for (const prefix of ["/", "/group/titan-gym/"]) {
  test(`local links, images, and assets resolve under ${prefix}`, async () => {
    for (const filename of files) {
      const html = await readFile(resolve(output, filename), "utf8");
      const references = [...html.matchAll(/(?:href|src|poster)="([^"]+)"/g)].map((match) => match[1]);
      for (const [, srcset] of html.matchAll(/(?:srcset|data-gallery-srcset)="([^"]+)"/g)) {
        references.push(...srcset.split(",").map((candidate) => candidate.trim().split(/\s+/)[0]));
      }
      for (const reference of references) {
        if (/^(?:https?:|mailto:|tel:|#)/.test(reference)) continue;
        assert.ok(reference.startsWith("./"), `${filename}: ${reference} must be relative`);
        const target = new URL(reference, `https://example.test${prefix}${filename}`);
        assert.ok(target.pathname.startsWith(prefix));
        const local = decodeURIComponent(target.pathname.slice(prefix.length));
        assert.ok((await stat(resolve(output, local))).isFile(), `${filename}: missing ${reference}`);
      }
    }
  });
}

test("legacy redirects preserve destinations and fragments from flat and directory paths", async () => {
  const home = await readFile(resolve(output, "index.html"), "utf8");
  for (const flat of files) {
    const flatHtml = await readFile(resolve(output, flat), "utf8");
    if (!flatHtml.includes('http-equiv="refresh"')) continue;
    const nested = `${flat.slice(0, -".html".length)}/index.html`;
    for (const filename of [flat, nested]) {
      const html = await readFile(resolve(output, filename), "utf8");
      const destination = html.match(/http-equiv="refresh" content="0; url=([^"]+)"/)?.[1];
      assert.ok(destination, `${filename}: missing immediate redirect`);
      const fallback = html.match(/<a href="([^"]+)"/)?.[1];
      assert.equal(fallback, destination);
      for (const prefix of ["/", "/group/titan-gym/"]) {
        const target = new URL(destination, `https://example.test${prefix}${filename}`);
        assert.equal(target.pathname, `${prefix}index.html`, filename);
        if (target.hash) assert.ok(home.includes(`id="${target.hash.slice(1)}"`), `${filename}: missing destination anchor`);
      }
      const canonical = new URL(html.match(/rel="canonical" href="([^"]+)"/)[1]);
      assert.equal(canonical.hash, "", "Canonical URLs must identify the page without a fragment");
    }
  }
});

test("published HTML does not expose a Google API key or load its SDK", async () => {
  for (const filename of files) {
    const html = await readFile(resolve(output, filename), "utf8");
    assert.doesNotMatch(html, /data-api-key|google-reviews\.js|maps\.googleapis\.com|AIza[0-9A-Za-z_-]{35}/, filename);
  }
  await assert.rejects(stat(resolve(output, "google-reviews.js")), { code: "ENOENT" });
});

test("mobile menu opens, closes, and returns focus on Escape", async () => {
  const attributes = { "aria-expanded": "false", "aria-label": "Open menu" };
  const classes = new Set();
  const handlers = {};
  let focused = false;
  const button = {
    getAttribute: (name) => attributes[name],
    setAttribute: (name, value) => { attributes[name] = value; },
    addEventListener: (name, handler) => { handlers[name] = handler; },
    focus: () => { focused = true; },
  };
  runInNewContext(await readFile(resolve(output, "site.js"), "utf8"), {
    document: {
      querySelector: () => button,
      getElementById: (id) => id === "primary-navigation" ? ({ classList: { toggle: (name, enabled) => enabled ? classes.add(name) : classes.delete(name) } }) : null,
      addEventListener: (name, handler) => { handlers[name] = handler; },
    },
  });
  handlers.click();
  assert.equal(attributes["aria-expanded"], "true");
  assert.equal(attributes["aria-label"], "Close menu");
  assert.ok(classes.has("site-nav--open"));
  handlers.click();
  assert.equal(attributes["aria-expanded"], "false");
  assert.ok(!classes.has("site-nav--open"));
  handlers.click();
  handlers.keydown({ key: "Escape" });
  assert.equal(attributes["aria-expanded"], "false");
  assert.equal(attributes["aria-label"], "Open menu");
  assert.ok(!classes.has("site-nav--open"));
  assert.ok(focused);
});

test("membership clicks scroll instantly in place and close the mobile menu", async () => {
  const handlers = {};
  const attributes = { "aria-expanded": "true" };
  const scrolls = [];
  const focusChanges = [];
  const historyChanges = [];
  const button = {
    getAttribute: (name) => attributes[name],
    setAttribute: (name, value) => { attributes[name] = value; },
    addEventListener() {},
  };
  const section = {
    focus: (options) => focusChanges.push(options),
    scrollIntoView: (options) => scrolls.push(options),
  };
  const link = { addEventListener: (name, handler) => { handlers[name] = handler; } };
  runInNewContext(await readFile(resolve(output, "site.js"), "utf8"), {
    history: { replaceState: (_state, _title, url) => historyChanges.push(url) },
    document: {
      querySelector: () => button,
      querySelectorAll: () => [link],
      getElementById: (id) => id === "membership" ? section : (id === "primary-navigation" ? { classList: { toggle() {} } } : null),
      addEventListener() {},
    },
  });
  let prevented = false;
  handlers.click({ button: 0, preventDefault: () => { prevented = true; } });
  assert.ok(prevented);
  assert.equal(scrolls[0].behavior, "instant");
  assert.equal(scrolls[0].block, "start");
  assert.equal(focusChanges.length, 1);
  assert.equal(focusChanges[0].preventScroll, true);
  assert.deepEqual(historyChanges, ["#membership"]);
  assert.equal(attributes["aria-expanded"], "false");
  handlers.click({ button: 0, ctrlKey: true, preventDefault: () => assert.fail("Modified click should retain native behavior") });
  assert.equal(scrolls.length, 1);
});

test("gallery navigation closes the mobile menu and preserves native anchor behavior", async () => {
  const attributes = { "aria-expanded": "true" };
  let click;
  const button = {
    getAttribute: (name) => attributes[name],
    setAttribute: (name, value) => { attributes[name] = value; },
    addEventListener() {},
  };
  runInNewContext(await readFile(resolve(output, "site.js"), "utf8"), {
    document: {
      querySelector: () => button,
      querySelectorAll: () => [{ addEventListener: (_name, handler) => { click = handler; } }],
      getElementById: (id) => id === "gallery" ? {} : (id === "primary-navigation" ? { classList: { toggle() {} } } : null),
      addEventListener() {},
    },
  });
  click({ button: 0, ctrlKey: true });
  assert.equal(attributes["aria-expanded"], "true");
  click({ button: 0, preventDefault: () => assert.fail("Gallery links should retain native anchor scrolling") });
  assert.equal(attributes["aria-expanded"], "false");
});

test("nearby images are requested early without replacing responsive candidates", async () => {
  const near = { loading: "lazy", srcset: "./images/small.webp 480w, ./images/large.webp 960w" };
  const far = { loading: "lazy" };
  const observed = [];
  const released = [];
  let intersect;
  class ImageObserver {
    constructor(callback) { intersect = callback; }
    observe(image) { observed.push(image); }
    unobserve(image) { released.push(image); }
  }
  runInNewContext(await readFile(resolve(output, "site.js"), "utf8"), {
    IntersectionObserver: ImageObserver,
    document: {
      querySelector: () => ({ addEventListener() {} }),
      getElementById: () => null,
      querySelectorAll: () => [near, far],
      addEventListener() {},
    },
  });
  assert.deepEqual(observed, [near, far]);
  intersect([{ target: far, isIntersecting: false }, { target: near, isIntersecting: true }]);
  assert.equal(near.loading, "eager");
  assert.equal(far.loading, "lazy");
  assert.equal(near.srcset, "./images/small.webp 480w, ./images/large.webp 960w");
  assert.deepEqual(released, [near]);
});

test("build prunes stale assets and preserves deployment paths for sitemap and nested 404", async () => {
  await writeFile(resolve(output, "images/removed-image.txt"), "obsolete image");
  try {
    await execute(process.execPath, ["scripts/build-static.mjs"], {
      cwd: frontend,
      env: { ...process.env, SITE_URL: "https://example.test/group/titan-gym", GOOGLE_MAPS_API_KEY: "test-google-browser-key", GOOGLE_MAPS_PLACE_ID: "ChIJtest" },
    });
    const configuredHome = await readFile(resolve(output, "index.html"), "utf8");
    const business = JSON.parse(configuredHome.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    assert.equal(business.url, "https://example.test/group/titan-gym/index.html");
    assert.equal(business["@id"], "https://example.test/group/titan-gym/#gym");
    const academyHtml = await readFile(resolve(output, "texas-sports-academy.html"), "utf8");
    const academySchema = JSON.parse(academyHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const service = academySchema["@graph"].find((node) => node["@type"] === "Service");
    const provider = academySchema["@graph"].find((node) => node["@id"] === service.provider["@id"]);
    assert.deepEqual(provider, Object.fromEntries(Object.entries(business).filter(([key]) => key !== "@context")));
    assert.equal(service.url, academyHtml.match(/rel="canonical" href="([^"]+)"/)[1]);
    assert.equal(service.audience.requiredMinAge, 8);
    assert.match(academyHtml, /ages 8 and up/);
    assert.deepEqual(service.offers.map((offer) => offer.priceSpecification.price), [200, 400]);
    for (const offer of service.offers) {
      assert.equal(offer.itemOffered["@id"], service["@id"]);
      assert.equal(offer.seller["@id"], business["@id"]);
      assert.equal(offer.priceSpecification.priceCurrency, "USD");
      assert.equal(offer.priceSpecification.billingDuration, "P1M");
      assert.match(offer.description, /parent cost is \$0/);
      assert.ok(academyHtml.includes(`$${offer.priceSpecification.price} per month · school-paid`));
      assert.ok(academyHtml.includes(offer.description.split(". ")[0]));
      assert.equal(offer.url, `${service.url}#student-visit`);
      assert.ok(academyHtml.includes(`id="${new URL(offer.url).hash.slice(1)}"`));
    }
    assert.equal(service.availableChannel[0].servicePhone.telephone, business.telephone);
    assert.equal(service.availableChannel[1].serviceLocation["@id"], business["@id"]);
    const canonical = configuredHome.match(/<link rel="canonical" href="([^"]+)"/)[1];
    const shareUrl = configuredHome.match(/property="og:url" content="([^"]+)"/)[1];
    const shareImage = configuredHome.match(/property="og:image" content="([^"]+)"/)[1];
    const cardImage = configuredHome.match(/name="twitter:image" content="([^"]+)"/)[1];
    assert.equal(shareUrl, canonical);
    assert.equal(canonical, business.url);
    assert.equal(cardImage, shareImage);
    for (const resource of [business.logo, business.image, shareImage]) {
      const url = new URL(resource);
      assert.ok(url.pathname.startsWith("/group/titan-gym/images/"));
      assert.ok((await stat(resolve(output, url.pathname.slice("/group/titan-gym/".length)))).isFile());
    }
    assert.doesNotMatch(configuredHome, /test-google-browser-key|data-api-key|google-reviews\.js/);
    await assert.rejects(stat(resolve(output, "google-reviews.js")), { code: "ENOENT" });
    await assert.rejects(stat(resolve(output, "images/removed-image.txt")), { code: "ENOENT" });
    const sitemap = await readFile(resolve(output, "sitemap.xml"), "utf8");
    assert.match(sitemap, /https:\/\/example.test\/group\/titan-gym\/index.html/);
    const redirect = await readFile(resolve(output, "facility/index.html"), "utf8");
    assert.match(redirect, /content="0; url=\.\.\/index\.html#gallery"/);
    assert.match(redirect, /rel="canonical" href="https:\/\/example.test\/group\/titan-gym\/index.html"/);
    assert.doesNotMatch(sitemap, /\/facility(?:\.html|\/)/);
    const errorPage = await readFile(resolve(output, "404.html"), "utf8");
    const [, base] = errorPage.match(/<base href="([^"]+)"/) ?? [];
    assert.equal(base, "https://example.test/group/titan-gym/");
    assert.match(errorPage, /name="robots" content="noindex"/);
    const requestedPage = "https://example.test/group/titan-gym/missing/nested/";
    const effectiveBase = new URL(base, requestedPage);
    for (const reference of ["./styles.css", "./site.js", "./index.html"]) {
      assert.ok(new URL(reference, effectiveBase).pathname.startsWith("/group/titan-gym/"));
      assert.ok((await stat(resolve(output, reference))).isFile());
    }
    await execute(process.execPath, ["scripts/build-static.mjs"], {
      cwd: frontend,
      env: { ...process.env, SITE_URL: "" },
    });
    await assert.rejects(stat(resolve(output, "sitemap.xml")), { code: "ENOENT" });
    assert.doesNotMatch(await readFile(resolve(output, "robots.txt"), "utf8"), /Sitemap:/);
  } finally {
    // Preserve the caller's local or CI deployment metadata after verification.
    await execute(process.execPath, ["scripts/build-static.mjs"], { cwd: frontend });
  }
});
