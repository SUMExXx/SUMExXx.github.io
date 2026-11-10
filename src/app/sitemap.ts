import { type MetadataRoute } from 'next';
import { blogs } from '@/lib/blogData/blogs';
import { projects } from '@/lib/data/portfolio';
export const dynamic = 'force-static';

const base = process.env.NEXT_PUBLIC_BASE_URL;

const sitemap = (): MetadataRoute.Sitemap => {
	return [
		{ url: `${base}/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 1.0 },
		{ url: `${base}/projects/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
		{ url: `${base}/blog/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
		...projects.map((p) => ({ url: `${base}/projects/${p.slug}/`, lastModified: new Date(), priority: 0.7 })),
		...blogs.map((b) => ({ url: `${base}/blog/${b.url}/`, lastModified: b.metadata.modifiedTime, priority: 0.7 })),
	];
};

export default sitemap;
