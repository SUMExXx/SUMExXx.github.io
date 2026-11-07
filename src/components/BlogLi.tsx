import { type ReactNode } from 'react';

const BlogLi = ({ children }: { children: ReactNode }) => {
	return <li className="mb-2">{children}</li>;
};

export default BlogLi;
