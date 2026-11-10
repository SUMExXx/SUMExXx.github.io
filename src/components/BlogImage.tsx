import Image from 'next/image';
import BlogImageModal from '@/components/BlogImageModal';

const BlogImage = ({ src, alt, width, height }: { src: string; alt: string; width?: number; height?: number }) => (
	<BlogImageModal src={src} alt={alt}>
		<Image
			src={src}
			alt={alt}
			className="my-6 h-auto w-full cursor-zoom-in [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%,0_12px)]"
			width={width || 800}
			height={height || 400}
		/>
	</BlogImageModal>
);

export default BlogImage;
