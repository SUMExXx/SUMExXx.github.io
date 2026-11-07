import Blog1, { Blog1Metadata } from '@/components/blogs/Blog1';
import type { Blog } from '@/types';
// import Blog2, { Blog2Metadata } from "@/components/blogs/Blog2";
// import Blog3, { Blog3Metadata } from "@/components/blogs/Blog3";

export const blogs: Blog[] = [
	{
		url: 'deploy-any-backend-server-to-aws-ecs-with-auto-scaling',
		cover: '/images/blogs/blog1/cover.png',
		mainImage: '/images/blogs/blog1/main.png',
		metadata: Blog1Metadata,
		page: <Blog1 />,
	},
	// {
	//   url: 'expressjs-backend-setup-with-typescript-in-es2020',
	//   cover: '/images/blogs/blog2/preview.png',
	//   mainImage: '/images/blogs/blog2/main.png',
	//   metadata: Blog2Metadata,
	//   page: <Blog2 />,
	// },
	// {
	//   url: 'switching-to-bigger-ssd-without-losing-data',
	//   cover: '/images/blogs/blog3/preview.png',
	//   mainImage: '/images/blogs/blog3/main.png',
	//   metadata: Blog3Metadata,
	//   page: <Blog3 />,
	// }
];
