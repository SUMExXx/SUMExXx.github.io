import Image from 'next/image';
import BlogImageModal from '@/components/BlogImageModal';

const BlogImage = ({ src, alt, width, height }: { src: string; alt: string; width?: number; height?: number }) => {
	return (
		<BlogImageModal src={src} alt={alt}>
			<Image
				src={src}
				alt={alt}
				className="w-full h-auto rounded-md my-5 cursor-pointer"
				width={width || 800}
				height={height || 400}
			/>
		</BlogImageModal>
	);
};

export default BlogImage;
