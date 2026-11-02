import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import { load } from "cheerio";
import { nav, stories, departmentNames } from "../src/data.js";
import { benefits } from "../src/careers-data.js";
const routes = [
  "/",
  ...nav.map((x) => x[1]),
  "/privacy/",
  ...stories.map((x) => `/journal/${x.id}/`),
];
const missing = [];
let checked = 0;
for (const route of routes) {
  const file = path.join("dist", route, "index.html");
  const html = await fs.readFile(file, "utf8");
  const $ = load(html);
  assert.equal($("h1").length, 1, `${route}: one H1`);
  assert.ok(
    $("main").text().trim().length > 200,
    `${route}: real rendered page content`,
  );
  if (route === '/people/') {
    assert.equal($('.management-grid article').length, 5, 'Five management profiles');
    assert.equal($('.leadership-team').length, 2, 'KMP and SMP sections');
    assert.equal($('.people-directory-grid article').length, 17, 'Seventeen departments beneath leadership');
    const photos=$('[data-team-photo]').map((_,el)=>$(el).attr('src')).get();
    assert.equal(photos.length,24);
    assert.equal(new Set(photos).size,photos.length,'Each people section has its own photograph');
  }
  for (const el of $("[src], image[href]")) {
    const src = $(el).attr("src") || $(el).attr("href");
    if (!src?.startsWith("/")) continue;
    try {
      await fs.access(path.join("dist", src));
    } catch {
      missing.push({ route, src });
    }
  }
  for (const el of $("a[href]")) {
    const href = $(el).attr("href");
    if (!href?.startsWith("/") || href.startsWith("//")) continue;
    const target = href.split("#")[0] || route;
    assert.ok(
      routes.includes(target),
      `${route}: internal route ${target} exists`,
    );
  }
  checked++;
}
assert.deepEqual(missing, [], "All rendered photographs exist");
assert.equal(departmentNames.length, 20);
assert.deepEqual(
  benefits.map((x) => x.items.length),
  [3, 6, 6],
);
const result = {
  routes: checked,
  serverRendered: true,
  departments: departmentNames.length,
  benefits: benefits.reduce((n, b) => n + b.items.length, 0),
  missingAssets: missing,
};
console.log(JSON.stringify(result, null, 2));
