import Image from 'next/image';
import Link from 'next/link';
import { Rise, SectionHead } from '@/components/portfolio/ui';
import { blogs } from '@/lib/blogData/blogs';

const fmt = (d?: Date) => d?.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

const Blog = () => (
	<main data-scene={4} className="mx-auto w-full max-w-[1200px] px-5 pt-36 pb-20 md:px-8">
		<SectionHead index="//" kicker="Writing" title="THE BLOG." />
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{blogs.map((b, i) => (
				<Rise key={b.url} i={i % 3}>
					<Link href={`/blog/${b.url}/`} className="group block h-full">
						<article className={`sd3-panel ${i % 2 ? 'is-alt' : ''} flex h-full flex-col p-3`}>
							<div className="relative aspect-[16/10] overflow-hidden bg-black">
								<Image
									src={b.cover}
									alt=""
									fill
									sizes="(max-width: 640px) 100vw, 33vw"
									className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
								/>
							</div>
							<div className="flex flex-1 flex-col p-3 pt-5">
								<time className="font-mono text-[11px] tracking-[0.2em] text-(--sd-violet) uppercase">
									{fmt(b.metadata.publishedTime)}
								</time>
								<h2 className="sd3-display mt-3 text-[22px] leading-tight transition-colors group-hover:text-(--sd-green)">
									{b.metadata.title}
								</h2>
								<p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-white/60">{b.metadata.description}</p>
								<span className="mt-5 font-mono text-[12px] tracking-[0.2em] text-(--sd-green) uppercase">Read →</span>
							</div>
						</article>
					</Link>
				</Rise>
			))}
		</div>
	</main>
);

export default Blog;
