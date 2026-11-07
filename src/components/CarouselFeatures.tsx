'use client';
import { featuredImages } from '@/lib/data/website';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CarouselFeatures = () => {
	const items = featuredImages;

	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
	};

	return (
		<div className="md:flex hidden md:gap-[40px] justify-center items-center">
			<button
				title="scroll-left"
				className="bg-no-repeat w-[52px] h-[112px] transition-all duration-300 ease-in-out hover:filter hover:brightness-125 cursor-pointer"
				style={{ background: "url('/images/left.png')" }}
				onClick={prevSlide}
			/>
			<div className="flex flex-col w-[956px] overflow-hidden md:gap-[40px]">
				<div
					className="flex transition-transform duration-500"
					style={{ transform: `translateX(-${currentIndex * 100}%)` }}
				>
					{items.map((item, index) => (
						<Link key={index} href={item.link} className="min-w-[956px]">
							<Image
								src={item.image}
								draggable={false}
								alt={'carousel1'}
								height={564}
								width={956}
								className="pointer-events-none"
							/>
						</Link>
					))}
				</div>
				<div
					className="flex transition-transform duration-500"
					style={{ transform: `translateX(-${currentIndex * 100}%)` }}
				>
					{items.map((item, index) => (
						<Link key={index} href={item.link} className="min-w-[956px] flex justify-center items-start">
							<span className="text text-lightViolet">{item.text}</span>
						</Link>
					))}
				</div>
			</div>
			<button
				title="scroll-left"
				className="bg-no-repeat w-[52px] h-[112px] transition-all duration-300 ease-in-out hover:filter hover:brightness-125 cursor-pointer"
				style={{ background: "url('/images/right.png')" }}
				onClick={nextSlide}
			/>
		</div>
	);
};

export default CarouselFeatures;
