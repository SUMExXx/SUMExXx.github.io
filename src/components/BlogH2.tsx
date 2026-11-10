import { type ReactNode } from 'react';

const BlogH2 = ({ children }: { children: ReactNode }) => (
	<h2 className="sd3-display mt-12 mb-4 flex items-center gap-3 text-[22px] text-white md:text-[26px]">
		<span className="h-3 w-3 shrink-0 bg-(--sd-green) [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]" />
		{children}
	</h2>
);

export default BlogH2;
