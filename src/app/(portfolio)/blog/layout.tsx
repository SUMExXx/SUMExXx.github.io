import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
	title: 'Blog · Suman Debnath',
	description: 'Notes on backends, cloud deployments and AI platform engineering by Suman Debnath.',
	other: { 'google-adsense-account': 'ca-pub-2246017499375159' },
};

const BlogLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
	<>
		<Script
			async
			src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2246017499375159"
			crossOrigin="anonymous"
		/>
		{children}
	</>
);

export default BlogLayout;
