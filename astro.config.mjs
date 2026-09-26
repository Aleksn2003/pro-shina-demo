import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import { env } from "node:process";

const isGitHubPages = env.GITHUB_ACTIONS === "true";

export default defineConfig({
  site: "https://aleksn2003.github.io",
  base: isGitHubPages ? "/pro-shina-demo" : "/",
  output: "static",
  integrations: [vue()],
  vite: { plugins: [tailwindcss()] },
});
