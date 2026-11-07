/*
 * GitHub Pages serves this repo's root, so the static export in out/ is copied
 * there after `next build`. Next's hashed CSS chunks are also merged into one
 * /index.css that every page links instead.
 */
import { cpSync, existsSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'fs';
import path from 'path';

const OUT = 'out';
const LINK = /<link rel="stylesheet" href="(\/_next\/static\/[^"]+\.css)"[^>]*\/>/g;

const htmlFiles = (dir) =>
	readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
		const p = path.join(dir, e.name);
		return e.isDirectory() ? htmlFiles(p) : p.endsWith('.html') ? [p] : [];
	});

// Cascade order matters: keep the order the chunks are linked in, home page first.
const home = path.join(OUT, 'index.html');
const pages = [home, ...htmlFiles(OUT).filter((f) => f !== home)];
const hrefs = [...new Set(pages.flatMap((f) => [...readFileSync(f, 'utf8').matchAll(LINK)].map((m) => m[1])))];
if (!hrefs.length) throw new Error('no CSS chunks found in out/ — did next build run?');

const css = hrefs
	// Chunks live in /_next/static/chunks/, so their relative font URLs must become absolute.
	.map((h) => readFileSync(path.join(OUT, h), 'utf8').replaceAll('url(../media/', 'url(/_next/static/media/'))
	.join('\n');
writeFileSync(path.join(OUT, 'index.css'), css);

for (const f of pages) {
	let first = true;
	const html = readFileSync(f, 'utf8').replace(LINK, () => {
		if (!first) return '';
		first = false;
		return '<link rel="stylesheet" href="/index.css"/>';
	});
	writeFileSync(f, html);
}

// .published lists what the previous run copied, so entries dropped from the build get removed.
const MANIFEST = '.published';
const names = readdirSync(OUT);
const previous = existsSync(MANIFEST) ? readFileSync(MANIFEST, 'utf8').split('\n').filter(Boolean) : [];
for (const stale of previous.filter((n) => !names.includes(n))) rmSync(stale, { recursive: true, force: true });
writeFileSync(MANIFEST, names.join('\n') + '\n');

for (const name of names) {
	const dest = path.join('.', name);
	if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
	cpSync(path.join(OUT, name), dest, { recursive: true });
}

console.log(`Published ${pages.length} pages to the repo root with index.css (${hrefs.length} chunks merged).`);
