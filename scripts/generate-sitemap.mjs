/**
 * Generuje sitemap.xml w dist/ na podstawie listy tras.
 * Adres bazowy ustawia się przez SITE_URL (bez końcowego slasha),
 * a podkatalog przez BASE_PATH — tak samo jak w vite.config.ts.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const site = (process.env.SITE_URL || "https://grupasportex-demo.example.com").replace(/\/+$/, "");
const base = (process.env.BASE_PATH || "/").replace(/\/+$/, "");

const routes = [
  { path: "/", priority: "1.0", freq: "monthly" },
  { path: "/o-firmie", priority: "0.8", freq: "monthly" },
  { path: "/ciecie-laserowe", priority: "0.9", freq: "monthly" },
  { path: "/giecie-blach-cnc", priority: "0.9", freq: "monthly" },
  { path: "/spawanie-konstrukcji-stalowych", priority: "0.9", freq: "monthly" },
  { path: "/lakierowanie-proszkowe", priority: "0.9", freq: "monthly" },
  { path: "/realizacje", priority: "0.7", freq: "monthly" },
  { path: "/kontakt", priority: "0.7", freq: "yearly" },
  { path: "/polityka-prywatnosci", priority: "0.2", freq: "yearly" },
];

const today = new Date().toISOString().slice(0, 10);

const urls = routes
  .map(
    (r) => `  <url>
    <loc>${site}${base}${r.path === "/" ? "/" : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.freq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const out = resolve("dist");
mkdirSync(out, { recursive: true });
writeFileSync(resolve(out, "sitemap.xml"), xml, "utf8");
console.log(`sitemap.xml: ${routes.length} adresów (${site}${base || "/"})`);
