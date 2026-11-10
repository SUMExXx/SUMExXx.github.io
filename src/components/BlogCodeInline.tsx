import { type ReactNode } from 'react';

const BlogCodeInline = ({ children }: { children: ReactNode }) => (
	<code className="mx-1 bg-(--sd-purple)/25 px-2 py-0.5 font-mono text-[14px] text-(--sd-green)">{children}</code>
);

export default BlogCodeInline;
