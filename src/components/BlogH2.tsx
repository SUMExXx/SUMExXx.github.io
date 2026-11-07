import { type ReactNode } from 'react';

const BlogH2 = ({ children }: { children: ReactNode }) => {
	return <h2 className="text-[24px] font-bold mb-4 mt-8 text-main-secondary">{children}</h2>;
};

export default BlogH2;
