'use client';
import React, { useEffect, useRef } from 'react';
import { timeline } from '@/lib/data/website';
import Image from 'next/image';
import Reveal from '@/components/Reveal';

const ExperienceHomePage = () => {
	const elementRef1 = useRef<HTMLDivElement>(null);
	const elementRef2 = useRef<HTMLDivElement>(null);
	const elementRef3 = useRef<HTMLDivElement>(null);
	const animatedRef = useRef<HTMLDivElement>(null);
	const animatedRef2 = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!elementRef1.current || !animatedRef.current || !animatedRef2.current) return;

		// Copy ref values to variables for cleanup
		const ref1 = elementRef1.current;
		const ref2 = elementRef2.current;
		const ref3 = elementRef3.current;

		const handleIntersection = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const targetId = entry.target.id;
					console.log(targetId);

					if (animatedRef.current && animatedRef2.current) {
						switch (targetId) {
							case 'elementRef1':
								animatedRef.current.style.transform = 'none';
								animatedRef2.current.style.transform = 'none';
								break;
							case 'elementRef2':
								animatedRef.current.style.transform = 'translateY(-33.333%)';
								animatedRef2.current.style.transform = 'translateY(-33.333%)';
								break;
							case 'elementRef3':
								animatedRef.current.style.transform = 'translateY(-66.666%)';
								animatedRef2.current.style.transform = 'translateY(-66.666%)';
								break;
							default:
								animatedRef.current.style.transform = 'none';
								animatedRef2.current.style.transform = 'none';
						}
					}
					// observer.unobserve(entry.target);
				}
			});
		};

		const observer = new IntersectionObserver(handleIntersection, {
			root: null, // observing relative to the viewport
			rootMargin: '0px',
			threshold: 0.8, // Trigger when 100% of the element is visible
		});

		if (ref1) {
			observer.observe(ref1);
		}
		if (ref2) {
			observer.observe(ref2);
		}
		if (ref3) {
			observer.observe(ref3);
		}

		// Cleanup on component unmount
		return () => {
			if (ref1) {
				observer.unobserve(ref1);
			}
			if (ref2) {
				observer.unobserve(ref2);
			}
			if (ref3) {
				observer.unobserve(ref3);
			}
		};
	}, []);

	return (
		<section className="w-full flex justify-center items-center bg-main-background bg-gradient-to-b from-main-primary to-[#3C095D] bg-cover">
			<div className="max-w-[1440px] md:px-20 flex flex-col justify-center items-start w-full">
				<div className="flex w-full justify-center items-start md:gap-[40px] gap-[25px] md:pt-[0px] md:pb-[100px] pb-[60px] md:py-[20px]">
					<div className="md:flex hidden flex-col md:gap-[120px] justify-start items-start w-[100%] h-full py-[120px]">
						<Reveal>
							<div
								ref={elementRef1}
								id={'elementRef1'}
								className="flex w-full flex-col justify-center items-start md:gap-[40px]"
							>
								<div className="flex relative w-full md:flex-row flex-col justify-center items-center md:gap-[40px] gap-[20px]">
									<Image
										src={timeline[0].image}
										alt={'carousel1'}
										height={424}
										width={629.63}
										className="h-[424px] w-[629px] pointer-events-none"
										draggable={false}
									/>
									<div className="flex flex-col gap-[10px]">
										<span className="text-main-foreground text-[28px] font-bold">{timeline[0].title}</span>
										<span className="text-main-foreground text-[16px] font-medium mb-5">{timeline[0].subtitle}</span>
										<span className="w-full text-[14px] font-light text-main-foreground">{timeline[0].text}</span>
									</div>
								</div>
							</div>
						</Reveal>
						<Reveal>
							<div
								ref={elementRef2}
								id={'elementRef2'}
								className="flex w-full flex-col justify-center items-start md:gap-[40px]"
							>
								<div className="flex relative w-full md:flex-row flex-col justify-center items-center md:gap-[40px]">
									<Image
										src={timeline[1].image}
										alt={'carousel1'}
										height={424}
										width={629.63}
										className="h-[424px] w-[629px] pointer-events-none"
										draggable={false}
									/>
									<div className="flex flex-col gap-[10px]">
										<span className="text-main-foreground text-[28px] font-bold">{timeline[1].title}</span>
										<span className="text-main-foreground text-[16px] font-medium mb-5">{timeline[1].subtitle}</span>
										<span className="w-full text-[14px] font-light text-main-foreground">{timeline[1].text}</span>
									</div>
								</div>
							</div>
						</Reveal>
						<Reveal>
							<div
								ref={elementRef3}
								id={'elementRef3'}
								className="flex w-full flex-col justify-center items-start md:gap-[40px]"
							>
								<div className="flex relative w-full md:flex-row flex-col justify-center items-center md:gap-[40px]">
									<Image
										src={timeline[2].image}
										alt={'carousel1'}
										height={424}
										width={629.63}
										className="h-[424px] w-[629px] pointer-events-none"
										draggable={false}
									/>
									<div className="flex flex-col gap-[10px]">
										<span className="text-main-foreground text-[28px] font-bold">{timeline[2].title}</span>
										<span className="text-main-foreground text-[16px] font-medium mb-5">{timeline[2].subtitle}</span>
										<span className="w-full text-[14px] font-light text-main-foreground">{timeline[2].text}</span>
									</div>
								</div>
							</div>
						</Reveal>
					</div>

					<div className="md:flex hidden sticky top-[80px] justify-end pr-[40px] md:gap-[20px] items-center w-[20%] overflow-y-hidden h-[calc(100vh-60px)]">
						<div className="w-full overflow-y-hidden overflow-x-visible h-full">
							<div
								className="flex flex-col justify-start items-center overflow-x-visible h-[300%] transition-transform duration-500"
								ref={animatedRef}
							>
								<div className="flex flex-col justify-center items-center overflow-x-visible h-1/3">
									<span className="heading text-main-foreground">{timeline[0].year}</span>
								</div>
								<div className="flex flex-col justify-center items-center overflow-x-visible h-1/3">
									<span className="heading text-main-foreground">{timeline[1].year}</span>
								</div>
								<div className="flex flex-col justify-center items-center overflow-x-visible h-1/3">
									<span className="heading text-main-foreground">{timeline[2].year}</span>
								</div>
							</div>
						</div>
						<div className="w-[60px] overflow-x-visible h-full bg-gradient-to-b from-main-primary via-[#1D1D1F] to-[#400963] bg-center bg-no-repeat bg-[length:50%]">
							<div
								className="flex flex-col justify-start items-center overflow-x-visible h-[300%] transition-transform duration-500"
								ref={animatedRef2}
							>
								<div className="flex flex-col justify-center items-center overflow-x-visible h-1/3">
									<div className="h-[40px] w-[40px] bg-main-quaternary outline-4 -outline-offset-4 outline-main-secondary rounded-full" />
								</div>
								<div className="flex flex-col justify-center items-center overflow-x-visible h-1/3">
									<div className="h-[40px] w-[40px] bg-main-quaternary outline-4 -outline-offset-4 outline-main-secondary rounded-full" />
								</div>
								<div className="flex flex-col justify-center items-center overflow-x-visible h-1/3">
									<div className="h-[40px] w-[40px] bg-main-quaternary outline-4 -outline-offset-4 outline-main-secondary rounded-full" />
								</div>
							</div>
						</div>
					</div>
					<div className="md:hidden flex flex-col justify-end items-center w-full h-full pt-[40px]">
						<div className="flex justify-between items-center w-full h-[400px] pr-[20px]">
							<Reveal>
								<div className="flex w-full flex-col justify-center items-start md:gap-[40px] gap-[20px] p-[20px]">
									<Image src={timeline[0].image} alt={'carousel1'} height={173} width={230} />
									<div className="flex flex-col gap-2">
										<span className="text-main-foreground text-[16px] font-bold">{timeline[0].title}</span>
										<span className="text-main-foreground text-[12px] font-medium mb-2">{timeline[0].subtitle}</span>
										<span className="text-main-foreground text-[10px] font-light">{timeline[0].text}</span>
									</div>
								</div>
							</Reveal>
							<div className="flex justify-end items-center h-full gap-[20px]">
								<Reveal>
									<span className="heading text-main-foreground">{timeline[0].year}</span>
								</Reveal>
								<div className="w-[20px] flex flex-col justify-center items-start h-full bg-gradient-to-b from-main-primary to-[#1D1D1F] bg-center bg-[length:50%] bg-no-repeat">
									<div className="h-[20px] w-[20px] bg-main-quaternary outline-2 -outline-offset-2 outline-main-secondary rounded-full" />
								</div>
							</div>
						</div>
						<div className="flex justify-between items-center w-full h-[400px] pr-[20px]">
							<Reveal>
								<div className="flex w-full flex-col justify-center items-start md:gap-[40px] gap-[20px] p-[20px]">
									<Image src={timeline[1].image} alt={'carousel1'} height={173} width={230} />
									<div className="flex flex-col gap-2">
										<span className="text-main-foreground text-[16px] font-bold">{timeline[1].title}</span>
										<span className="text-main-foreground text-[12px] font-medium mb-2">{timeline[1].subtitle}</span>
										<span className="text-main-foreground text-[10px] font-light">{timeline[1].text}</span>
									</div>
								</div>
							</Reveal>
							<div className="flex justify-end items-center h-full gap-[20px]">
								<Reveal>
									<span className="heading text-main-foreground">{timeline[1].year}</span>
								</Reveal>
								<div className="w-[20px] flex flex-col justify-center items-start h-full bg-gradient-to-b from-[#1D1D1F] to-[#1D1D1F] bg-center bg-[length:50%] bg-no-repeat">
									<div className="h-[20px] w-[20px] bg-main-quaternary outline-2 -outline-offset-2 outline-main-secondary rounded-full" />
								</div>
							</div>
						</div>
						<div className="flex justify-between items-center w-full h-[500px] pr-[20px]">
							<Reveal>
								<div className="flex w-full flex-col justify-center md:gap-[40px] gap-[20px] p-[20px]">
									<Image src={timeline[2].image} alt={'carousel1'} height={173} width={230} />
									<div className="flex flex-col gap-2">
										<span className="text-main-foreground text-[16px] font-bold">{timeline[2].title}</span>
										<span className="text-main-foreground text-[12px] font-medium mb-2">{timeline[2].subtitle}</span>
										<span className="text-main-foreground text-[10px] font-light">{timeline[2].text}</span>
									</div>
								</div>
							</Reveal>
							<div className="flex justify-end items-center h-full gap-[20px]">
								<Reveal>
									<span className="heading text-main-foreground">{timeline[2].year}</span>
								</Reveal>
								<div className="w-[20px] flex flex-col justify-center items-start h-full bg-gradient-to-b from-[#1D1D1F] to-[#400963] bg-center bg-size bg-[length:50%] bg-no-repeat">
									<div className="h-[20px] w-[20px] bg-main-quaternary outline-2 -outline-offset-2 outline-main-secondary rounded-full" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full md:h-[89px] relative flex justify-center items-end">
					<div className="md:absolute static md:bottom-[-1px] md:right-0 flex justify-center items-center md:h-[89px] h-[36px] w-[200px] md:w-[490px] heading text-white bg-[url('/images/titleVectorBlack.png')] bg-contain bg-no-repeat">
						Skills
					</div>
				</div>
			</div>
		</section>
	);
};

export default ExperienceHomePage;
