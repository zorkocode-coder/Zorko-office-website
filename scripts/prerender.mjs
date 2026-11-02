import fs from "node:fs/promises";
import { nav, stories } from "../src/data.js";
import { render } from "../.cache/ssr/entry-server.js";
const html = await fs.readFile("dist/index.html", "utf8");
const routes = [
  "/",
  ...nav.map((x) => x[1]),
  "/privacy/",
  ...stories.map((x) => `/journal/${x.id}/`),
];
for (const route of routes) {
  const name =
    nav.find((x) => x[1] === route)?.[0] ||
    stories.find((x) => route.includes(x.id))?.title ||
    "Privacy & Information";
  const pageName =
    route === "/"
      ? "ZORKO Limited — Built on ambition. Powered by people."
      : `${name} — ZORKO Limited`;
  const out = html
    .replace(
      /<title>.*?<\/title>/,
      `<title>${pageName.replaceAll("&", "&amp;")}</title>`,
    )
    .replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`);
  await fs.mkdir(`dist${route}`, { recursive: true });
  await fs.writeFile(`dist${route}index.html`, out);
}
await fs.writeFile("dist/404.html", html);
console.log(
  `Created ${routes.length} independent corporate route entry points.`,
);
