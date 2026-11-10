/*
 * LinkedIn has no API that returns your own Projects/Skills to a static site (the self-serve OpenID
 * scopes only give name/email; the DMA portability API is EU/EEA-only and needs OAuth). The supported
 * route is the data export: LinkedIn → Settings → Data privacy → Get a copy of your data.
 *
 *   node scripts/import-linkedin.mjs <unzipped-export-folder>
 *
 * Reads Projects.csv, Certifications.csv and Skills.csv and writes src/lib/data/linkedin.json, which
 * src/lib/data/portfolio.ts merges in (new projects get their own /projects/<slug>/ page).
 */
import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

const dir = process.argv[2];
if (!dir || !existsSync(dir)) {
	console.error('usage: node scripts/import-linkedin.mjs <unzipped LinkedIn export folder>');
	process.exit(1);
}

// RFC 4180: quoted fields may contain commas, doubled quotes and newlines.
export function parseCsv(text) {
	const rows = [];
	let row = [],
		field = '',
		quoted = false;
	for (let i = 0; i < text.length; i++) {
		const c = text[i];
		if (quoted) {
			if (c === '"' && text[i + 1] === '"') (field += '"'), i++;
			else if (c === '"') quoted = false;
			else field += c;
		} else if (c === '"') quoted = true;
		else if (c === ',') row.push(field), (field = '');
		else if (c === '\n' || c === '\r') {
			if (c === '\r' && text[i + 1] === '\n') i++;
			row.push(field), rows.push(row), (row = []), (field = '');
		} else field += c;
	}
	if (field || row.length) row.push(field), rows.push(row);
	return rows.filter((r) => r.some((f) => f.trim()));
}

// Headers have shifted between export versions, and some files open with a "Notes:" preamble,
// so find the header row by a column we know and match names case-insensitively.
function read(file, mustHave) {
	const p = path.join(dir, file);
	if (!existsSync(p)) return [];
	const rows = parseCsv(readFileSync(p, 'utf8').replace(/^﻿/, ''));
	const h = rows.findIndex((r) => r.some((c) => c.trim().toLowerCase() === mustHave));
	if (h < 0) return [];
	const keys = rows[h].map((k) => k.trim().toLowerCase());
	return rows.slice(h + 1).map((r) => Object.fromEntries(keys.map((k, i) => [k, (r[i] ?? '').trim()])));
}

const out = {
	projects: read('Projects.csv', 'title').map((r) => ({
		title: r.title,
		description: r.description,
		url: r.url,
		start: r['started on'],
		end: r['finished on'],
	})),
	certifications: read('Certifications.csv', 'name').map((r) => ({
		name: r.name,
		authority: r.authority,
		url: r.url,
		date: r['started on'],
	})),
	skills: read('Skills.csv', 'name').map((r) => r.name),
};

writeFileSync('src/lib/data/linkedin.json', JSON.stringify(out, null, '\t') + '\n');
console.log(
	`linkedin.json: ${out.projects.length} projects, ${out.certifications.length} certifications, ${out.skills.length} skills`,
);
