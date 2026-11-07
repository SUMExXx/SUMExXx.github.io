import { type MetadataRoute } from 'next';
export const dynamic = 'force-static';

const robots = (): MetadataRoute.Robots => {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
			},
		],
		sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
	};
};

export default robots;
