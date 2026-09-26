import fs from "node:fs";
import assert from "node:assert/strict";
import { gzipSync } from "node:zlib";

const html = fs.readFileSync("dist/index.html", "utf8");
const base = process.env.GITHUB_ACTIONS === "true" ? "/pro-shina-demo/" : "/";
assert.equal((html.match(/<h1\b/g) || []).length, 1, "Exactly one h1");
assert.equal(
  (html.match(/<astro-island\b/g) || []).length,
  2,
  "Only two Vue islands",
);
assert.ok(html.includes(`href="${base}favicon.svg"`), "Favicon uses the deployment base");
assert.ok(html.includes(`src="${base}images/workshop-hero.webp"`), "Hero image uses the deployment base");
assert.ok(html.includes(`href="${base}"`), "Brand home link uses the deployment base");
for (const content of [
  "R19–R20",
  "tel:+70000000000",
  "Сезонная смена шин",
  "ул. Монтажников, 00",
  "Ежедневно",
  "noindex, nofollow",
]) {
  assert.ok(html.includes(content), `Static HTML includes ${content}`);
}
const schema = JSON.parse(
  html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1],
);
assert.equal(schema["@type"], "TireShop");
assert.ok(!schema.aggregateRating && !schema.review);
assert.ok(fs.readFileSync("dist/robots.txt", "utf8").includes("Disallow: /"));
assert.ok(!fs.readFileSync("dist/sitemap.xml", "utf8").includes("<loc>"));
for (const href of [...html.matchAll(/href="#([^"]+)"/g)].map(
  (match) => match[1],
)) {
  assert.ok(html.includes(`id="${href}"`), `Anchor ${href} exists`);
}
console.log(
  "Static content, two Vue islands, anchors, JSON-LD and demo SEO: PASS",
);
console.log(`HTML: ${gzipSync(html).length} bytes gzip`);
let jsTotal = 0;
for (const file of fs
  .readdirSync("dist/_astro")
  .filter((file) => file.endsWith(".js"))) {
  const size = gzipSync(fs.readFileSync(`dist/_astro/${file}`)).length;
  jsTotal += size;
  console.log(`${file}: ${size} bytes gzip`);
}
console.log(
  `All client JS chunks: ${jsTotal} bytes gzip (loaded on visibility)`,
);
