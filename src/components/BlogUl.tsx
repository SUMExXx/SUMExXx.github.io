import { type ReactNode } from 'react';

const BlogUl = ({ children }: { children: ReactNode }) => {
	return <ul className="list-disc list-inside mb-4">{children}</ul>;
};

export default BlogUl;
