import { jetBrainsMono } from '@/lib/data/fonts';
import { type ReactNode } from 'react';

const BlogCodeInline = ({ children }: { children: ReactNode }) => {
	return (
		<span className={`font-mono ${jetBrainsMono.className} text-[14px] font-bold mx-1 bg-black/20 px-2 py-1 rounded-md`}>
			{children}
		</span>
	);
};

export default BlogCodeInline;
