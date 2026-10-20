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

test("all eight pages and a 404 contain usable HTML without React or an API", async () => {
  assert.equal(files.length, 9);
  assert.ok(!files.includes("titan-nutrition.html"));
  assert.ok(!files.includes("facility.html"));
  assert.ok(!files.includes("services.html"));
  assert.ok(!files.includes("about.html"));
  for (const filename of files) {
    const html = await readFile(resolve(output, filename), "utf8");
    assert.match(html, /<h1[\s>]/, filename);
    assert.match(html, /<title>[^<]+<\/title>/, filename);
    assert.match(html, /<main id="main-content">/, filename);
    assert.doesNotMatch(html, /\/api\/|\/src\/|type="module"|<form[\s>]/, filename);
    assert.doesNotMatch(html, /href="[^\"]*(?:titan-nutrition|(?:facility|services|about)\.html)/, filename);
    const galleryHref = filename === "index.html" ? "#gallery" : "./index.html#gallery";
    assert.ok(html.includes(`href="${galleryHref}"`), `${filename}: missing gallery link`);
    const membershipHref = filename === "index.html" ? "#membership" : "./index.html#membership";
    assert.ok(html.includes(`href="${membershipHref}">Membership</a>`), `${filename}: missing membership navigation`);
    for (const [, target] of html.matchAll(/aria-controls="([^"]+)"/g)) {
      assert.ok(html.includes(`id="${target}"`), `${filename}: missing controlled element ${target}`);
    }
    if (filename === "index.html") {
      assert.ok(html.includes(`href="./${filename}" aria-current="page"`), `${filename}: missing active navigation`);
    }
  }
  const contact = await readFile(resolve(output, "join-now.html"), "utf8");
  assert.match(contact, /href="mailto:TitanGymSA@outlook.com"/);
  assert.match(contact, /href="tel:\+12102672206"/);
});

for (const prefix of ["/", "/group/titan-gym/"]) {
  test(`local links, images, and assets resolve under ${prefix}`, async () => {
    for (const filename of files) {
      const html = await readFile(resolve(output, filename), "utf8");
      for (const [, reference] of html.matchAll(/(?:href|src|poster)="([^"]+)"/g)) {
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

test("every categorized media asset appears in its matching gallery with a valid lowercase filename", async () => {
  const home = await readFile(resolve(output, "index.html"), "utf8");
  for (const [title, folder] of [["Open gym", "open-gym"], ["Personal training", "pt"], ["Nutrition coaching", "nutrition-coaching"], ["Bodybuilding", "body-building"]]) {
    const card = home.match(new RegExp(`<article\\b[^>]*aria-label="${title}"[\\s\\S]*?<\\/article>`))?.[0];
    assert.ok(card, `Missing ${title} gallery`);
    assert.doesNotMatch(card, /Placeholder images/);
    for (const type of ["images", "videos"]) {
      const sourceDirectory = resolve(frontend, "public", type, folder);
      const assets = await readdir(sourceDirectory).catch((error) => {
        if (error.code === "ENOENT") return [];
        throw error;
      });
      for (const asset of assets) {
        assert.match(asset, /^[a-z0-9]+(?:-[a-z0-9]+)*\.(?:jpg|png|mp4)$/);
        assert.ok(card.includes(`./${type}/${folder}/${asset}`), `${title}: missing ${asset}`);
        assert.deepEqual(await readFile(resolve(output, type, folder, asset)), await readFile(resolve(sourceDirectory, asset)));
      }
    }
  }
});

test("Google reviews stay hidden and no page loads the SDK or exposes a browser key", async () => {
  for (const filename of files) {
    const html = await readFile(resolve(output, filename), "utf8");
    assert.doesNotMatch(html, /member-reviews-title|data-google-reviews|data-api-key|google-reviews\.js|maps\.googleapis\.com|AIza[0-9A-Za-z_-]{35}/, filename);
    assert.ok(html.includes('href="./privacy.html"'));
    assert.ok(html.includes('href="./terms.html"'));
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

test("Join Now targets homepage memberships and annual price uses the confirmed whole-dollar amount", async () => {
  const home = await readFile(resolve(output, "index.html"), "utf8");
  assert.match(home, /class="site-header__cta" href="#membership"/);
  assert.match(home, /class="site-nav__mobile-cta" href="#membership"/);
  assert.match(home, /id="membership"/);
  const specials = '<h2 class="membership-specials">Visit for current specials!</h2>';
  assert.ok(home.includes(specials));
  assert.ok(home.indexOf(specials) > home.indexOf("<h3>Monthly membership</h3>"));

  const cards = [...home.matchAll(/<article class="plan-card[^\"]*">([\s\S]*?)<\/article>/g)].map((match) => match[1]);
  const annual = cards.find((card) => card.includes("<h3>Annual membership</h3>"));
  const monthly = cards.find((card) => card.includes("<h3>Monthly membership</h3>"));
  const cents = (price) => Math.round(Number(price.replace(/[^\d.]/g, "")) * 100);
  const monthlyCents = cents(monthly.match(/class="plan-card__price">([^<]+)/)[1]);
  const annualCents = cents(annual.match(/class="plan-card__price">([^<]+)/)[1]);
  const comparisonCents = cents(annual.match(/<del>([^<]+)<\/del>/)[1]);
  assert.equal(comparisonCents, monthlyCents * 12);
  assert.equal(annualCents, 49400);
  assert.ok(annualCents <= comparisonCents * 0.75);
  assert.match(annual, /25% off \(3 months free\)/);
  assert.match(annual, /One annual payment/);
  for (const filename of files.filter((file) => file !== "index.html")) {
    const html = await readFile(resolve(output, filename), "utf8");
    assert.match(html, /class="site-header__cta" href="\.\/index.html#membership"/);
  }
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

test("build prunes stale pages/assets and uses the deployment URL for sitemap and nested 404", async () => {
  await writeFile(resolve(output, "removed-page.html"), "obsolete page");
  await writeFile(resolve(output, "services.html"), "obsolete membership page");
  await writeFile(resolve(output, "about.html"), "obsolete about page");
  await writeFile(resolve(output, "images/removed-image.txt"), "obsolete image");
  try {
    await execute(process.execPath, ["scripts/build-static.mjs"], {
      cwd: frontend,
      env: { ...process.env, SITE_URL: "https://example.test/group/titan-gym", GOOGLE_MAPS_API_KEY: "test-google-browser-key", GOOGLE_MAPS_PLACE_ID: "ChIJtest" },
    });
    const configuredHome = await readFile(resolve(output, "index.html"), "utf8");
    assert.doesNotMatch(configuredHome, /test-google-browser-key|data-api-key|data-google-reviews|google-reviews\.js/);
    await assert.rejects(stat(resolve(output, "google-reviews.js")), { code: "ENOENT" });
    await assert.rejects(stat(resolve(output, "removed-page.html")), { code: "ENOENT" });
    await assert.rejects(stat(resolve(output, "services.html")), { code: "ENOENT" });
    await assert.rejects(stat(resolve(output, "about.html")), { code: "ENOENT" });
    await assert.rejects(stat(resolve(output, "images/removed-image.txt")), { code: "ENOENT" });
    const sitemap = await readFile(resolve(output, "sitemap.xml"), "utf8");
    assert.equal([...sitemap.matchAll(/<loc>/g)].length, 8);
    assert.match(sitemap, /https:\/\/example.test\/group\/titan-gym\/index.html/);
    assert.doesNotMatch(sitemap, /404.html|titan-nutrition|(?:facility|services|about)\.html/);
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
