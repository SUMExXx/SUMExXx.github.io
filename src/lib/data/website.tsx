import type { Author, ProjectPreviews, Socials, WebData, WebSite, WebTechIcon } from '@/types';

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
		'Suman Debnath: Full-Stack AI Platform Engineer building MCP servers, LangGraph agents, Spring AI and Spring Boot backends, and Next.js frontends.',
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
