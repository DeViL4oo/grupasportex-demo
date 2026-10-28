/**
 * Prerendering statycznego HTML dla wszystkich tras.
 *
 * 1. `vite build` tworzy dist/ (klient),
 * 2. `vite build --ssr src/entry-server.tsx` tworzy .ssr/entry-server.js,
 * 3. ten skrypt renderuje każdą trasę do dist/<trasa>/index.html,
 *    wstawia title/description/canonical i <base href>.
 *
 * Efekt: treść i metadane są w HTML (dobre LCP i SEO), a po hydratacji
 * strona działa jak SPA. Głębokie linki działają też na GitHub Pages,
 * bo każda trasa ma własny plik index.html.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = resolve(root, "dist");
const ssrEntry = resolve(root, ".ssr/entry-server.js");
const site = (process.env.SITE_URL || "https://grupasportex-demo.example.com").replace(/\/+$/, "");
const base = (process.env.BASE_PATH || "/").replace(/\/*$/, "/");

if (!existsSync(ssrEntry)) {
  console.error("Brak bundla SSR. Uruchom najpierw `vite build --ssr src/entry-server.tsx --outDir .ssr`.");
  process.exit(1);
}

const { render, pageMeta } = await import(pathToFileURL(ssrEntry).href);
const template = readFileSync(resolve(dist, "index.html"), "utf8");

const routes = [
  "/",
  "/o-firmie",
  "/ciecie-laserowe",
  "/giecie-blach-cnc",
  "/spawanie-konstrukcji-stalowych",
  "/lakierowanie-proszkowe",
  "/realizacje",
  "/kontakt",
  "/polityka-prywatnosci",
];

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

for (const route of routes) {
  const meta = pageMeta[route] ?? pageMeta["/"];
  const html = render(route);
  const url = `${site}${base === "/" ? "" : base.replace(/\/$/, "")}${route}`;

  let page = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)} | Grupa Sportex</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escapeHtml(meta.description)}" />`
    )
    .replace(
      /<meta property="og:type" content="website"\s*\/?>/,
      `<meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(meta.title)} | Grupa Sportex" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    <meta property="og:url" content="${url}" />
    <link rel="canonical" href="${url}" />`
    )
    .replace(
      /<head>/,
      `<head>\n    <base href="${base}" />`
    )
    .replace(
      /<div id="root"><\/div>/,
      `<div id="root" data-route="${route}">${html}</div>`
    );

  if (!page.includes(`data-route="${route}"`)) {
    console.warn(`Uwaga: nie wstrzyknięto HTML dla ${route}`);
  }

  const outFile = route === "/" ? resolve(dist, "index.html") : resolve(dist, route.slice(1), "index.html");
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, page, "utf8");
  console.log(`prerender: ${route} → ${outFile.replace(root, ".")} (${html.length} B HTML)`);
}

console.log(`Gotowe: ${routes.length} tras, base="${base}", site="${site}"`);
