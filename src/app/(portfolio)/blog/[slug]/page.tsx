import MoreBlogs from '@/components/MoreBlogs';
import { Scramble } from '@/components/portfolio/ui';
import { blogs } from '@/lib/blogData/blogs';
import { socials, website } from '@/lib/data/website';
import type { Metadata } from 'next';
import Image from 'next/image';
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
	// dynamicParams = false guarantees the slug exists.
	const blog = blogs.find((b) => b.url === slug)!;
	const author = blog.metadata.authors[0];

	return (
		<main data-scene={6} className="mx-auto w-full max-w-[1200px] px-5 pt-32 pb-16 md:px-8">
			<Link href="/blog/" className="sd3-link font-mono text-[12px] tracking-[0.2em] uppercase">
				← All posts
			</Link>
			<header className="mt-8 max-w-[900px]">
				<span className="sd3-tab font-mono text-[11px] tracking-[0.3em] uppercase">
					<span className="text-(--sd-green)">Post</span>
					{blog.metadata.publishedTime?.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
				</span>
				<div className="sd3-tab-rule" />
				<h1 className="sd3-display mt-6 text-[34px] leading-[1.05] md:text-[60px]">
					<Scramble text={blog.metadata.title} />
				</h1>
				<p className="mt-4 font-mono text-[13px] text-white/50">
					By{' '}
					<Link href={author.url || '/'} className="sd3-link">
						{author.name}
					</Link>
				</p>
			</header>

			<div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_300px]">
				<article className="sd3-panel min-w-0 p-5 md:p-12">
					<div className="sd3-hud relative mb-10 aspect-[16/9] overflow-hidden bg-black">
						<Image
							src={blog.mainImage}
							alt={blog.metadata.title}
							fill
							priority
							sizes="(max-width: 1024px) 100vw, 820px"
							className="object-cover"
						/>
					</div>
					<div className="sd3-prose">{blog.page}</div>
				</article>
				<MoreBlogs currentBlog={blog} />
			</div>
		</main>
	);
};

export default Blog;
