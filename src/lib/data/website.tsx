import type {
	Author,
	FeaturedItems,
	ProjectPreviews,
	Socials,
	TimelineItem,
	WebData,
	WebSite,
	WebTechIcon,
} from '@/types';

export const website: WebSite = {
	name: 'Suman Debnath',
	w3url: process.env.NEXT_PUBLIC_BASE_URL || '/',
	url: process.env.NEXT_PUBLIC_BASE_URL || '/',
	blogUrl: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/blog`,
	baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '/',
	TWITTER: '@SUMExXx666',
};

export const webData: WebData = {
	title: 'Suman Debnath',
	description:
		'Suman Debnath, Computer Science Engineering Undergrad at SGSITS, Indore. I am a Web Developer, Flutter Developer, UI/UX Designer and Graphic Designer.',
	keywords: [
		'Suman',
		'Debnath',
		'Suman Debnath',
		'Web',
		'Web Developer',
		'Flutter',
		'Flutter Developer',
		'profile',
		'blog',
		'NextJS',
		'SGSITS',
		'Computer',
		'Science',
		'Engineering',
		'Engineer',
		'Software',
		'Developer',
	],
};

export const skills: string[] = [
	'Next.JS',
	'React.JS',
	'Flutter',
	'Android',
	'Express.JS',
	'MongoDB',
	'WordPress',
	'Figma',
	'Strapi',
	'FastAPI',
	'AWS',
	'Firebase',
	'Docker',
	'Vagrant',
	'TypeScript',
	'Node.JS',
	'TailwindCSS',
	'C/C++',
	'Python',
	'Java',
	'JavaScript',
	'Dart',
	'HTML',
	'CSS',
	'XML',
	'Bootstrap',
	'Git',
	'GitHub',
	'PostgreSQL',
	'Linux',
	'Scripting',
];

export const featuredImages: FeaturedItems[] = [
	{
		image: '/images/carousel1.png',
		link: '/',
		text:
			'Firstox Studio, a 3D T-Shirt Design mockup generator SAAS platform with adjustable animations and texture and surrounding customizations along with Admin and Affiliate sections and integrated with Dodo Payments.',
	},
	{
		image: '/images/carousel2.png',
		link: '/',
		text: 'A display website for a club showcasing the features, events, information and team',
	},
	{
		image: '/images/carousel3.png',
		link: '/',
		text:
			'A web platform that provides a playground for C++ and Java Code compilation and a problem solving section that provides questions and matches the code with test cases, all without Internet in a LAN server.',
	},
	{
		image: '/images/carousel4.png',
		link: '/',
		text:
			'A flutter app that enables the customers to view and book services from nearby freelancing service providers and also place bids for works for the service providers to accept. It will include a robust service provider selection options, work tracking and payments.',
	},
];

export const timeline: TimelineItem[] = [
	{
		title: 'Ascentt',
		subtitle: 'Software Engineer',
		text:
			'As a Software Engineer at Ascentt, I work on full-stack development, building scalable web applications while designing intuitive UI/UX experiences to deliver seamless and user-friendly solutions.',
		image: '/images/exp1.png',
		year: '2025',
	},
	{
		title: 'Ascentt',
		subtitle: 'Software Development Intern',
		text:
			'As a Software Development Intern at Ascentt, I contributed to building web interfaces and enhancing user experiences through effective UI/UX design, gaining hands-on experience in full-stack development.',
		image: '/images/exp2.png',
		year: '2025',
	},
	{
		title: 'Shri G. S. Institute of Technology and Science, Indore',
		subtitle: 'Computer Science Engineering',
		text:
			'Graduated with Bachelor of Technology in Computer Science Engineering from Shri G. S. Institute of Technology and Science, Indore. I am also associated with Club GS Production House as Advisory Board Member, Computer Club as Graphic Designer and held Head of Web Development at E-Cell, SGSITS.',
		image: '/images/exp3.png',
		year: '2025',
	},
];

export const socials: Socials = {
	linkedIn: 'https://www.linkedin.com/in/suman-debnath6',
	instagram: 'https://www.instagram.com/sumex.in',
	github: 'https://github.com/SUMExXx',
	blogs: '/blogs',
	phone: 'tel:+919303357985',
	email: 'mailto:sumexxx666@gmail.com',
};

export const authorSumanDebnath: Author = {
	name: 'Suman Debnath',
	url: 'https://www.linkedin.com/in/suman-debnath6',
};

export const webTechIcons: WebTechIcon[] = [
	{
		url: '/icons/nextjs-monochrome.png',
		alt: 'NextJS',
		height: 40,
		width: 40,
	},
	{
		url: '/icons/reactjs-monochrome.png',
		alt: 'ReactJS',
		height: 40,
		width: 40,
	},
	{
		url: '/icons/tailwindcss-monochrome.png',
		alt: 'TailwindCSS',
		height: 40,
		width: 40,
	},
	{
		url: '/icons/nodejs-monochrome.png',
		alt: 'NodeJS',
		height: 40,
		width: 62.44,
	},
	{
		url: '/icons/typescript-monochrome.png',
		alt: 'TypeScript',
		height: 40,
		width: 40,
	},
	{
		url: '/icons/expressjs-monochrome.png',
		alt: 'ExpressJS',
		height: 40,
		width: 40,
	},
	{
		url: '/icons/mongodb-monochrome.png',
		alt: 'MongoDB',
		height: 40,
		width: 145.1,
	},
	{
		url: '/icons/postgresql-monochrome.png',
		alt: 'PostgreSQL',
		height: 40,
		width: 38.53,
	},
	{
		url: '/icons/cloudinary-monochrome.png',
		alt: 'Cloudinary',
		height: 40,
		width: 55.83,
	},
	{
		url: '/icons/firebase-monochrome.png',
		alt: 'Firebase',
		height: 40,
		width: 32.29,
	},
	{
		url: '/icons/framermotion-monochrome.png',
		alt: 'FramerMotion',
		height: 40,
		width: 40,
	},
];

export const projectPreviews: ProjectPreviews = {
	webdev: [
		{
			image: '/images/foodhub1.png',
			url: '/',
			title: 'FoodHub: A hobby ecommerce website',
		},
		{
			image: '/images/foodhub2.png',
			url: '/',
			title: 'FoodHub: A hobby ecommerce website',
		},
		{
			image: '/images/gsph1.png',
			url: '/',
			title: 'FoodHub: A hobby ecommerce website',
		},
		{
			image: '/images/codemon1.png',
			url: '/',
			title: 'FoodHub: A hobby ecommerce website',
		},
		{
			image: '/images/codemon2.png',
			url: '/',
			title: 'FoodHub: A hobby ecommerce website',
		},
		{
			image: '/images/sharehub1.png',
			url: '/',
			title: 'FoodHub: A hobby ecommerce website',
		},
	],
	flutter: [],
	uiux: [],
	graphics: [],
};
