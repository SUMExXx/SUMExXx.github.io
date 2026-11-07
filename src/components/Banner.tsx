import Image from 'next/image';
import React from 'react';

const Banner = ({ src, alt }: { src: string; alt: string }) => {
	return <Image src={src} alt={alt} className="w-full h-auto rounded-md mt-6" width={800} height={400} />;
};

export default Banner;
