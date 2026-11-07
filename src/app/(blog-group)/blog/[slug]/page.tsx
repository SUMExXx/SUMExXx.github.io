import Banner from '@/components/Banner';
import MoreBlogs from '@/components/MoreBlogs';
import ProgressBar from '@/components/ProgressBar';
import { blogs } from '@/lib/blogData/blogs';
import { openSans } from '@/lib/data/fonts';
import { socials, website } from '@/lib/data/website';
import type { Metadata } from 'next';
import Link from 'next/link';

// Static export: every blog page is rendered at build time; unknown slugs 404.
export const dynamicParams = false;
export const generateStaticParams = () => blogs.map((b) => ({ slug: b.url }));

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
	const paramsData = await params;
	const blog = blogs.find((b) => b.url === paramsData.slug);

	return {
		title: blog ? blog.metadata.title : 'Blog Not Found',
		description: blog ? blog.metadata.description : 'No blog content available.',
		keywords: blog ? blog.metadata.keywords : [],
		authors: [{ name: 'Suman Debnath', url: socials.linkedIn }],
		applicationName: 'SumanDebnath',
		generator: 'Next.js',
		creator: 'Suman Debnath',
		publisher: 'Suman Debnath',

		// // 🌍 Open Graph (OG) - Social Media Sharing
		openGraph: {
			title: blog ? blog.metadata.openGraph?.title : 'Blog Not Found',
			description: blog ? blog.metadata.openGraph?.description : 'No blog content available.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog ? blog.url : 'not-found'}`,
			siteName: 'SumanDebnath',
			images: [
				{
					url: process.env.NEXT_PUBLIC_BASE_URL + '/images' + (blog ? blog.cover : '/og-image.png'),
					width: 1200,
					height: 630,
					alt: blog ? blog.metadata.title : 'Blog Not Found',
				},
			],
			locale: 'en_US',
			type: 'article',
		},

		//🐦 Twitter Card
		twitter: {
			card: 'summary_large_image',
			title: blog ? blog.metadata.twitter?.title : 'Blog Not Found',
			description: blog ? blog.metadata.twitter?.description : 'No blog content available.',
			site: website.TWITTER,
			creator: website.TWITTER,
			images: [process.env.NEXT_PUBLIC_BASE_URL + '/images' + (blog ? blog.cover : '/og-image.png')], //TODO: add new property OG IMAGE
		},

		// 📱 Mobile & Browser Settings
		robots: 'index, follow', // or "noindex, nofollow"

		// 📜 Canonical URL
		//   alternates: {
		//     canonical: "https://example.com/blog/my-first-post",
		//     languages: {
		//       "en-US": "https://example.com/en/blog/my-first-post",
		//       "es-ES": "https://example.com/es/blog/my-first-post",
		//     },
		//   },

		// 🔗 Icons & App Links
		// icons: {
		//   icon: "/favicon.ico",
		//   shortcut: "/shortcut-icon.png",
		//   apple: "/apple-touch-icon.png",
		// },

		// 🏠 App Manifest
		//manifest: "/site.webmanifest",

		// 🛡️ Security & Referrer
		referrer: 'no-referrer-when-downgrade',
		formatDetection: {
			telephone: false,
			address: false,
			email: false,
		},
	};
};

const Blog = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;

	const blog = blogs.find((blog) => blog.url === slug);

	const page = blog?.page;

	if (!page) {
		<div></div>;
	} else {
		return (
			<div className="w-full flex relative justify-center items-start md:gap-[20px] gap-[20px] min-h-[calc(100vh-80px)]">
				<div className="flex justify-between items-center max-w-[1440px] md:px-20 px-[10px] w-full">
					<ProgressBar />
					<div className="flex flex-col-reverse lg:flex-row gap-[20px] justify-center items-start w-full">
						<MoreBlogs currentBlog={blog} />
						<div
							className={`w-full flex justify-center items-start md:p-10 p-2.5 bg-main-background rounded-2xl max-w-[820px] ${openSans.className}`}
						>
							<div className="md:p-6 py-6 px-4 rounded-lg bg-transparent">
								{/* Blog Header */}
								<div className="text-center">
									<h1 className="md:text-[30px] text-[24px] font-bold text-white mb-2">{blog.metadata.title}</h1>
									<p className="text-gray-400">
										By <Link href={blog.metadata.authors[0].url || '/'}>{blog.metadata.authors[0].name}</Link> |{' '}
										{blog.metadata.publishedTime
											?.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
											.replace(/ /g, ' ')}
									</p>
								</div>

								{/* Featured Image */}
								<Banner src={blog.mainImage} alt={blog.metadata.title} />
								{page}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default Blog;
