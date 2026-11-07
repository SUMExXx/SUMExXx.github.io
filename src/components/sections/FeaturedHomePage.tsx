import CarouselFeatures from '@/components/CarouselFeatures';
import Reveal from '@/components/Reveal';
import { featuredImages } from '@/lib/data/website';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedHomePage = () => {
	const items = featuredImages;

	return (
		<section className="w-full flex justify-center items-end">
			<section className="max-w-[1440px] md:px-20 flex flex-col w-full justify-start items-center md:gap-[40px] gap-[25px] md:pt-[60px] md:pb-[200px] pb-[80px] px-[20px] py-[20px]">
				<Reveal>
					<span className="heading text-white">Featured Works</span>
				</Reveal>
				<Reveal>
					<CarouselFeatures />
				</Reveal>
				<div className="md:hidden flex flex-col gap-[40px] px-[20px] pt-[20px] justify-center items-center">
					{items.map((item, index) => (
						<Reveal key={index}>
							<Link href={item.link} className="flex flex-col gap-[20px] justify-center items-center">
								<Image src={item.image} alt={'carousel1'} height={564} width={956} />
								<span className="text-veryLightViolet text">{item.text}</span>
							</Link>
						</Reveal>
					))}
				</div>
			</section>
		</section>
	);
};

export default FeaturedHomePage;
