import { withLive } from "$live/live.ts";

export const handler = withLive({
  siteId: 473,
  site: "demo",
  domains: ["deco-sites-demo.deno.dev"],
});