import { defineConfig, passthroughImageService } from "astro/config";
import starlight from "@astrojs/starlight";
import favicons from "astro-favicons";
import tailwind from "@tailwindcss/vite";

import nemoGrammar from "/src/assets/nemo.tmLanguage.json";

const base = "/nemo-doc";

// https://astro.build/config
export default defineConfig({
  site: "https://knowsys.github.io/",
  base,
  outDir: "./dist/nemo-doc",
  integrations: [
    starlight({
      title: "Nemo",
      customCss: [
        "./src/tailwind.css",
        "./src/styles/custom.css",
        // Fontsource files for to regular and semi-bold font weights.
        "@fontsource/comfortaa/400.css",
        "@fontsource/comfortaa/600.css",
      ],
      expressiveCode: {
        themes: ["github-light", "github-dark"],
        shiki: {
          langs: [{ embeddedLangs: [], ...nemoGrammar }],
          langAlias: {
            nemo: "Nemo Rule Language",
          },
        },
      },
      favicon: "/favicon.svg",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/knowsys/nemo",
        },
      ],
      components: {
        SiteTitle: "./src/components/SiteTitle.astro",
      },
      sidebar: [
        {
          label: "Introduction",
          items: [
            { label: "Introducing Nemo", slug: "intro/welcome" },
            { label: "Ways of using Nemo", slug: "intro/usage" },
            { label: "Rule language", slug: "intro/tour" },
            { label: "Nemo examples", slug: "intro/examples" },
            { label: "Nemo research", slug: "intro/research" },
          ],
        },
        {
          label: "Installation and usage",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Nemo in the browser", slug: "installation/browser" },
            { label: "Installation", slug: "installation/install" },
            { label: "Command Line", slug: "installation/cli" },
            { label: "Wasm integration", slug: "installation/wasm" },
            { label: "Python API", slug: "installation/python" },
            { label: "Rust API", slug: "installation/rust" },
          ],
        },
        {
          label: "Language Reference",
          items: [
            { label: "Import", slug: "reference/imports" },
            { label: "Export", slug: "reference/exports" },
            { label: "Built-in functions", slug: "reference/builtins" },
            { label: "Datatypes", slug: "reference/datatypes" },
            { label: "Comments and attributes", slug: "reference/attributes" },
            { label: "Aggregates", slug: "reference/aggregates" },
          ],
        },
      ],
    }),
    favicons({
        input: "./logo/build/without-text/nemo-logo-rusty-nomargin.svg",
        background: "#134e4a",
        name: "Nemo Rule Engine",
        short_name: "Nemo",
        icons: {
          favicons: [
            "favicon.svg",
            "favicon.ico",
            "favicon-16x16.png",
            "favicon-32x32.png",
            "favicon-48x48.png",
          ],
          android: false,
          appleIcon: true,
          appleStartup: false,
          windows: false,
          yandex: false,
        },
      })
  ],
  image: { service: passthroughImageService() },
  vite: {
    plugins: [
      tailwind(),
    ],
    resolve: {
      alias: {
        "@assets": "/src/assets",
        "@lib": "/src/lib",
        "@components": "/src/components",
        "@layouts": "/src/layouts",
        "@pages": "/src/pages",
      },
    },
  },
});
