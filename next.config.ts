import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/*
	 * GitHub Pages serves files, nothing else: no server, no route handlers, no
	 * proxy. `next build` writes the whole site to out/ as plain HTML/CSS/JS.
	 */
	output: 'export',
	// Each route becomes <route>/index.html, which Pages serves at /<route>/.
	trailingSlash: true,
	// The image optimiser needs a server; images ship as-is.
	images: { unoptimized: true },
	env: {
		NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://sumexxx.github.io',
		NEXT_PUBLIC_BLOG_URL: process.env.NEXT_PUBLIC_BLOG_URL || 'https://sumexxx.github.io/blog/',
	},
};

export default nextConfig;
