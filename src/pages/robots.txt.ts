import type { APIRoute } from "astro";
import { workshop } from "../config/workshop";
export const GET: APIRoute = () =>
  new Response(
    workshop.seo.indexable && !workshop.demo
      ? `User-agent: *\nAllow: /\nSitemap: ${new URL("/sitemap.xml", workshop.seo.siteUrl)}\n`
      : "User-agent: *\nDisallow: /\n",
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
