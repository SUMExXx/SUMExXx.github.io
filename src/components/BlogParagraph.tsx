import { type ReactNode } from 'react';

const BlogParagraph = ({ children }: { children: ReactNode }) => {
	return <p className="my-5">{children}</p>;
};

export default BlogParagraph;
