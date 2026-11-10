import Link from 'next/link';
import { blogs } from '@/lib/blogData/blogs';
import type { Blog } from '@/types';

const MoreBlogs = ({ currentBlog }: { currentBlog: Blog }) => {
	const others = blogs.filter((b) => b.url !== currentBlog.url).slice(0, 10);
	return (
		<aside className="sd3-panel is-alt p-6 lg:sticky lg:top-28">
			<h2 className="font-mono text-[11px] tracking-[0.25em] text-(--sd-green) uppercase">› More posts</h2>
			{others.length ? (
				<ul className="mt-4 divide-y divide-white/10">
					{others.map((b) => (
						<li key={b.url}>
							<Link href={`/blog/${b.url}/`} className="block py-3 text-[14px] text-white/75 hover:text-(--sd-green)">
								{b.metadata.title}
							</Link>
						</li>
					))}
				</ul>
			) : (
				<p className="mt-4 text-[14px] text-white/50">More posts are on the way.</p>
			)}
			<Link href="/projects/" className="sd3-btn sd3-btn-ghost mt-6 !px-4 !py-2.5 !text-[11px]">
				See projects →
			</Link>
		</aside>
	);
};

export default MoreBlogs;
