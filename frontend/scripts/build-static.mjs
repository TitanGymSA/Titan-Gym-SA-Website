import { cp, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, sep } from "node:path";
import { createServer } from "vite";

const frontend = fileURLToPath(new URL("../", import.meta.url));
const output = resolve(frontend, "../public");
const watching = process.argv.includes("--watch");
const configuredUrl = process.env.SITE_URL;
const siteUrl = configuredUrl ? new URL(configuredUrl.endsWith("/") ? configuredUrl : `${configuredUrl}/`) : undefined;
if (siteUrl && (!["http:", "https:"].includes(siteUrl.protocol) || siteUrl.search || siteUrl.hash)) {
  throw new Error("SITE_URL must be an HTTP(S) site root without a query or fragment.");
}

const server = await createServer({
  root: frontend,
  appType: "custom",
  server: { middlewareMode: true, hmr: false },
});

async function listFiles(directory, prefix = "") {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = `${prefix}${entry.name}`;
    if (entry.isDirectory()) files.push(...await listFiles(resolve(directory, entry.name), `${relative}/`));
    else files.push(relative);
  }
  return files;
}

async function build() {
  const { pagePaths, pageFilename, renderPage } = await server.ssrLoadModule("/src/entry-static.tsx");
  await mkdir(output, { recursive: true });
  await cp(resolve(frontend, "public/images"), resolve(output, "images"), { recursive: true });
  await cp(resolve(frontend, "public/videos"), resolve(output, "videos"), { recursive: true });
  await cp(resolve(frontend, "public/site.js"), resolve(output, "site.js"));
  await cp(resolve(frontend, "public/headline.js"), resolve(output, "headline.js"));
  await cp(resolve(frontend, "public/gallery.js"), resolve(output, "gallery.js"));
  await cp(resolve(frontend, "public/inline-gallery.js"), resolve(output, "inline-gallery.js"));
  await cp(resolve(frontend, "src/styles.css"), resolve(output, "styles.css"));

  for (const pathname of pagePaths) {
    await writeFile(resolve(output, pageFilename(pathname)), renderPage(pathname, siteUrl?.href));
  }

  let robots = "User-agent: *\nAllow: /\n";
  if (siteUrl) {
    const locations = pagePaths.filter((pathname) => pathname !== "/404")
      .map((pathname) => `<url><loc>${new URL(pageFilename(pathname), siteUrl).href.replaceAll("&", "&amp;")}</loc></url>`);
    await writeFile(resolve(output, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${locations.join("")}</urlset>\n`);
    robots += `Sitemap: ${new URL("sitemap.xml", siteUrl).href}\n`;
  } else {
    await rm(resolve(output, "sitemap.xml"), { force: true });
  }
  await writeFile(resolve(output, "robots.txt"), robots);

  // public/ is exclusively generated. Prune removed routes/assets without
  // emptying the served directory while Live Server is using it.
  const expected = new Set([
    ...pagePaths.map(pageFilename), "styles.css", "site.js", "headline.js", "gallery.js", "inline-gallery.js", "robots.txt",
    ...await listFiles(resolve(frontend, "public/images"), "images/"),
    ...await listFiles(resolve(frontend, "public/videos"), "videos/"),
    ...(siteUrl ? ["sitemap.xml"] : []),
  ]);
  for (const file of await listFiles(output)) {
    const target = resolve(output, file);
    if (!target.startsWith(output + sep)) throw new Error(`Invalid generated path: ${file}`);
    if (!expected.has(file)) await rm(target, { force: true });
  }
  console.log(`Built ${pagePaths.length - 1} pages and 404.html in ${output}`);
}

try {
  await build();
} catch (error) {
  await server.close();
  throw error;
}

if (watching) {
  let timer;
  let queue = Promise.resolve();
  server.watcher.on("all", (_event, filename) => {
    const relevant = ["src", "public"].some((folder) => resolve(filename).startsWith(resolve(frontend, folder) + sep));
    if (!relevant) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      queue = queue.then(build).catch((error) => console.error("Static build failed:", error));
    }, 150);
  });
  console.log("Watching source files. Open ../public/index.html with Live Server.");
} else {
  await server.close();
}
