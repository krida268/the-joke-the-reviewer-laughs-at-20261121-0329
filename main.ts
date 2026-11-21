// The joke the reviewer laughs at — make.fun entry.
// Writes one original one-line joke about working beside AI coding agents
// to <MAKEFUN_OUTPUT_DIR>/entry.txt. Deterministic, stdlib only, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My coding agent opened a 400-line PR to fix one typo — and the only line it didn't touch was the typo.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// Gate check, same bounds as the sealed scorer: 1–280 Unicode code points,
// not only whitespace. Fail loudly instead of writing an invalid entry.
const length = [...JOKE].length;
if (length < 1 || length > 280 || JOKE.trim().length === 0) {
  throw new Error(`joke must be 1-280 code points, got ${length}`);
}
if (JOKE.includes("\n")) {
  throw new Error("joke must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
