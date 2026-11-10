export type WebSite = {
	name: string;
	w3url: string;
	url: string;
	blogUrl: string;
	baseUrl: string;
	TWITTER: string;
};

export type WebData = {
	title: string;
	description: string;
	keywords: string[];
};

export type Socials = {
	linkedIn: string;
	instagram: string;
	github: string;
	blogs: string;
	phone: string;
	email: string;
};

export type WebTechIcon = {
	url: string;
	alt: string;
	height: number;
	width: number;
};

export type ProjectPreview = {
	image: string;
	url: string;
	title: string;
};

export type ProjectPreviews = {
	webdev: ProjectPreview[];
	flutter: ProjectPreview[];
	uiux: ProjectPreview[];
	graphics: ProjectPreview[];
};

export type BlogCodeBlockData = {
	language: string;
	filename: string;
	code: string;
};

export type BlogMetadata = {
	title: string;
	description: string;
	keywords: string[];
	authors: { name: string; url?: string }[];
	publisher?: { name: string; url?: string };
	publishedTime: Date;
	modifiedTime?: Date;
	openGraph?: {
		title?: string;
		description?: string;
		url?: string;
		siteName?: string;
		images?: { url: string; width?: number; height?: number; alt?: string }[];
		locale?: string;
		type?: string;
	};
	twitter?: {
		card?: string;
		title?: string;
		description?: string;
		images?: string[];
		creator?: string;
	};
	other?: { [key: string]: string | string[] | undefined };
};

export type Blog = {
	url: string;
	metadata: BlogMetadata;
	page: React.ReactNode;
	cover: string;
	mainImage: string;
};

export type Author = {
	name: string;
	url?: string;
};
