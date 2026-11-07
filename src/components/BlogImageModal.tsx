'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';

const BlogImageModal = ({ children, src, alt }: { children: ReactNode; src: string; alt: string }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div onClick={() => setIsOpen(true)}>{children}</div>

			{isOpen && (
				<div
					className="fixed inset-0 z-30 md:pt-20 flex items-center justify-center bg-black/80 w-full h-full"
					onClick={() => setIsOpen(false)}
				>
					<div className="w-full h-full md:p-10 p-2.5 flex justify-center items-center">
						<Image
							src={src}
							alt={alt}
							width={1600}
							height={900}
							className="object-contain h-full w-auto rounded-md"
							priority
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default BlogImageModal;
