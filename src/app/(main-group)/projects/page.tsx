import { webData, website } from '@/lib/data/website';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: webData.title,
	description: webData.description,
	keywords: webData.keywords,
	authors: [
		{
			name: 'Suman Debnath',
			url: 'https://sumandebnath.site',
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
		images: [website.url + '/files/opengraph-image.png'],
		creator: '@SUMExXx666',
	},
};

const Home = () => {
	return (
		<main className="flex flex-col items-center justify-start">
			<div>
				<h1 className="text-4xl font-bold min-h-[calc(100vh-80px)] flex justify-center items-center">Coming Soon...</h1>
			</div>
		</main>
	);
};

export default Home;
