import Hero from '@/components/portfolio/Hero';
import { About, Contact, Education, Experience, Projects, Skills, Timeline } from '@/components/portfolio/sections';
import { VelocityBand } from '@/components/portfolio/ui';
import { webData, website } from '@/lib/data/website';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: webData.title,
	description: webData.description,
	keywords: webData.keywords,
	authors: [
		{
			name: 'Suman Debnath',
			url: 'https://www.linkedin.com/in/suman-debnath6',
		},
	],
	creator: 'Suman Debnath',
	other: {
		'google-adsense-account': 'ca-pub-2246017499375159',
		'google-site-verification': 'u_ExZBcFIU6jz7OJ4L7bORzuQbPqF3MRksHVsMlWQv4',
	},
	openGraph: {
		title: webData.title,
		description: webData.description,
		url: website.url,
		siteName: webData.title,
		images: [
			{
				url: website.url + '/images/opengraph-image.png',
				width: 1920,
				height: 1080,
				alt: 'Image description',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: webData.title,
		description: webData.description,
		images: [website.url + '/images/opengraph-image.png'],
		creator: '@SUMExXx666',
	},
};

const Home = () => (
	<main>
		<Hero />
		<About />
		<VelocityBand words={['MCP SERVERS', 'LANGGRAPH AGENTS', 'SPRING AI', 'NEXT.JS', 'RUST RUNTIMES']} />
		<VelocityBand words={['FASTAPI', 'TEMPORAL', 'POSTGRES', 'REDIS', 'AWS', 'GRAFANA']} reverse />
		<Experience />
		<Projects />
		<Skills />
		<Education />
		<Timeline />
		<VelocityBand words={["LET'S BUILD", 'SOMETHING', 'AMBITIOUS']} />
		<Contact />
	</main>
);

export default Home;
