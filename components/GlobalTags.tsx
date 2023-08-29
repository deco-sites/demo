import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />

      {/* Plausible Analytics */}
      <script
        defer
        data-domain="demo.deco.site"
        src={asset("/plausible_script.js")}
      />
    </Head>
  );
}

export default GlobalTags;
