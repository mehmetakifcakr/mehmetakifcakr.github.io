import { readFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";

const document = await readFile(".next/server/app/tr.html", "utf8");
const scripts = [...document.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)];
const initial = scripts.filter(
  ([, attributes]) => !/nomodule|application\/ld\+json/i.test(attributes),
);
const paths = [
  ...new Set(
    initial.flatMap(([, attributes]) => {
      const path = attributes.match(/src="([^"]+)"/)?.[1];
      return path ? [path.replace("/_next/", ".next/")] : [];
    }),
  ),
];
const resources = await Promise.all(
  paths.map(async (path) => gzipSync(await readFile(path)).length),
);
const inline = initial
  .filter(([, attributes]) => !/\bsrc=/.test(attributes))
  .map(([, , source]) => source)
  .join("\n");
const bytes = resources.reduce((sum, value) => sum + value, 0) + gzipSync(inline).length;
const budget = 200_000;
console.log(
  `Home initial JavaScript: ${bytes.toLocaleString("en-US")} bytes gzip / ${budget.toLocaleString("en-US")} byte budget.`,
);
if (bytes > budget) throw new Error("Initial JavaScript exceeds the performance budget.");
