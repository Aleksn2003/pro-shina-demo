import type { APIRoute } from "astro";
import { workshop } from "../config/workshop";
const baseUrl = `${import.meta.env.BASE_URL.replace(/\/+$/, "")}/`;
export const GET: APIRoute = () =>
  new Response(
    workshop.seo.indexable && !workshop.demo
      ? `User-agent: *\nAllow: /\nSitemap: ${new URL(`${baseUrl}sitemap.xml`, workshop.seo.siteUrl)}\n`
      : "User-agent: *\nAllow: /\n",
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
