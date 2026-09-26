import type { APIRoute } from "astro";
import { workshop } from "../config/workshop";
const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
export const GET: APIRoute = () =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${workshop.seo.indexable && !workshop.demo ? `<url><loc>${escapeXml(new URL("/", workshop.seo.siteUrl).href)}</loc></url>` : ""}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
