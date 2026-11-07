// eslint.config.mjs
import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import { readFileSync, existsSync } from 'fs';
import path from 'path';
import process from 'process';
import console from 'console';

let prettierConfig = {};
try {
	const prettierPath = path.resolve(process.cwd(), '.prettierrc');
	if (existsSync(prettierPath)) {
		const prettierRaw = readFileSync(prettierPath, 'utf-8');
		prettierConfig = JSON.parse(prettierRaw);
	} else {
		console.warn('⚠️ .prettierrc not found at project root.');
	}
} catch (err) {
	console.warn('⚠️ Could not read .prettierrc:', err.message);
}

export default [
	// 1. Base JS rules
	js.configs.recommended,

	// 2. TypeScript rules
	...tseslint.configs.recommended,

	// 3. Next.js plugin
	{
		plugins: {
			'@next/next': nextPlugin,
			prettier: prettierPlugin,
		},
		rules: {
			...nextPlugin.configs['core-web-vitals'].rules,
			'@typescript-eslint/no-explicit-any': 'off',
			'prettier/prettier': ['error', prettierConfig],
		},
	},
];
