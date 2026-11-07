import HeroSectionHomePage from '@/components/sections/HeroSectionHomePage';
import SkillsScrollHomePage from '@/components/sections/SkillsScrollHomePage';
import FeaturedHomePage from '@/components/sections/FeaturedHomePage';
import EducationHomePage from '@/components/sections/ExperienceHomePage';
import SkillsHomePage from '@/components/sections/SkillsHomePage';
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
			<HeroSectionHomePage />
			<SkillsScrollHomePage />
			<FeaturedHomePage />
			<div className="w-full flex justify-center">
				<div className="w-full max-w-[1440px] relative flex justify-center items-end">
					<div className="md:absolute static md:bottom-[-1px] md:left-20 translate-y-[1px] left-0 flex justify-center items-center md:h-[89px] h-[36px] w-[200px] md:w-[490px] heading text-main-foreground bg-[url('/images/titleVector.png')] bg-contain bg-no-repeat">
						Experience
					</div>
				</div>
			</div>
			<EducationHomePage />
			<SkillsHomePage />
		</main>
	);
};

export default Home;
