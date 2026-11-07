import Reveal from '@/components/Reveal';
import Image from 'next/image';

const HeroSectionHomePage = () => {
	return (
		<section className="w-full flex justify-center items-center bg-main-background bg-custom-gradient">
			<div className="max-w-[1440px] md:px-20 flex flex-col w-full justify-start items-center md:gap-[40px] gap-[25px] md:p-24 px-[20px] py-[30px]">
				<div className="relative flex justify-center items-center">
					<div className="md:h-[238px] md:w-[160px] absolute z-10 right-[220px] top-[2px] animate-pulse md:flex hidden bg-[url('/images/lines1.png')] bg-contain bg-no-repeat" />
					<div className="md:h-[238px] md:w-[160px] absolute z-10 left-[220px] top-[2px] animate-pulse md:flex hidden bg-[url('/images/lines2.png')] bg-contain bg-no-repeat" />
					<button
						type="button"
						className="absolute md:subtitle text-main-foreground md:flex hidden justify-center items-center text-center right-[360px] top-[-16px] md:w-[273.41px] md:h-[52.41px] transition-all duration-300 ease-in-out hover:filter hover:brightness-125 bg-[url('/images/leftSkillVector.png')] bg-contain bg-no-repeat cursor-pointer"
					>
						FullStack Development
					</button>
					<button
						type="button"
						className="absolute md:subtitle text-main-foreground md:flex hidden justify-center items-center text-center left-[364px] top-[-16px] md:w-[273.41px] md:h-[52.41px] transition-all duration-300 ease-in-out hover:filter hover:brightness-125 bg-[url('/images/rightSkillVector.png')] bg-contain bg-no-repeat cursor-pointer"
					>
						Flutter Development
					</button>
					<button
						type="button"
						className="absolute md:subtitle text-main-foreground md:flex hidden justify-center items-center text-center right-[360px] top-[90px] md:w-[273.41px] md:h-[52.41px] transition-all duration-300 ease-in-out hover:filter hover:brightness-125 bg-[url('/images/leftSkillVector.png')] bg-contain bg-no-repeat cursor-pointer"
					>
						UI/UX Designing
					</button>
					<button
						type="button"
						className="absolute md:subtitle text-main-foreground md:flex hidden justify-center items-center text-center left-[364px] top-[90px] md:w-[273.41px] md:h-[52.41px] transition-all duration-300 ease-in-out hover:filter hover:brightness-125 bg-[url('/images/rightSkillVector.png')] bg-contain bg-no-repeat cursor-pointer"
					>
						Graphic Designing
					</button>
					<button
						type="button"
						className="absolute md:subtitle text-main-foreground md:flex hidden justify-center items-center text-center right-[360px] top-[196px] md:w-[273.41px] md:h-[52.41px] transition-all duration-300 ease-in-out hover:filter hover:brightness-125 bg-[url('/images/leftSkillVector.png')] bg-contain bg-no-repeat cursor-pointer"
					>
						Cloud Engineering
					</button>
					<button
						type="button"
						className="absolute md:subtitle text-main-foreground md:flex hidden justify-center items-center text-center left-[364px] top-[196px] md:w-[273.41px] md:h-[52.41px] transition-all duration-300 ease-in-out hover:filter hover:brightness-125 bg-[url('/images/rightSkillVector.png')] bg-contain bg-no-repeat cursor-pointer"
					>
						System Designing
					</button>
					<Image
						src={`/images/me-tech.png`}
						height={240}
						width={240}
						draggable={false}
						alt="Suman Debnath"
						className="z-10 pointer-events-none md:h-[240px] h-[120px] md:w-[240px] w-[120px]"
					/>
				</div>
				<div className="flex flex-col">
					<span
						className="heading text-center text-main-quaternary"
						style={{ textShadow: '0px 0px 3.6px rgba(55, 247, 19, 1)' }}
					>
						Suman Debnath
					</span>
					<span className="text text-center text-main-secondary">Software Developer</span>
				</div>
				<div className="flex flex-wrap justify-between items-start md:hidden w-[320px] gap-x-[50px] gap-y-[20px]">
					<button
						type="button"
						className="subtitle text-main-foreground flex justify-center items-center text-center right-[360px] top-[-16px] w-[127px] h-[25px] bg-[url('/images/leftSkillVector.png')] bg-contain bg-no-repeat cursor-pointer"
					>
						FullStack Dev
					</button>
					<button
						type="button"
						className="subtitle text-main-foreground flex justify-center items-center text-center left-[364px] top-[-16px] w-[127px] h-[25px] bg-[url('/images/rightSkillVector.png')] bg-contain bg-no-repeat cursor-pointer"
					>
						Flutter Development
					</button>
					<button
						type="button"
						className="subtitle text-main-foreground flex justify-center items-center text-center right-[360px] top-[90px] w-[127px] h-[25px] bg-[url('/images/leftSkillVector.png')] bg-contain bg-no-repeat cursor-pointer"
					>
						UI/UX Designing
					</button>
					<button
						type="button"
						className="subtitle text-main-foreground flex justify-center items-center text-center left-[364px] top-[90px] w-[127px] h-[25px] bg-[url('/images/rightSkillVector.png')] bg-contain bg-no-repeat cursor-pointer"
					>
						Graphic Designing
					</button>
					<button
						type="button"
						className="subtitle text-main-foreground flex justify-center items-center text-center right-[360px] top-[196px] w-[127px] h-[25px] bg-[url('/images/leftSkillVector.png')] bg-contain bg-no-repeat cursor-pointer"
					>
						Cloud Engineering
					</button>
					<button
						type="button"
						className="subtitle text-main-foreground flex justify-center items-center text-center left-[364px] top-[196px] w-[127px] h-[25px] bg-[url('/images/rightSkillVector.png')] bg-contain bg-no-repeat cursor-pointer"
					>
						System Designing
					</button>
				</div>
				<span className="md:w-[1066px] text md:text-left text-center text-main-tertiary">
					I&apos;m a Full Stack Developer and currently a Software Engineer at Ascentt. I studied Computer Science
					Engineering at SGSITS, Indore. I love building scalable, creative, and impactful software that turns ideas into
					reality.
				</span>
				<Reveal className="cursor-pointer">
					<a
						href="/docs/SumanDebnathResumeV9.pdf"
						download
						className="mt-8 transition-all duration-300 ease-in-out hover:filter hover:brightness-125 cursor-pointer"
					>
						<button
							type="button"
							className="subtitle animate-bounce text-main-foreground flex justify-center items-center text-center md:w-[273.41px] md:h-[52.41px] w-[120px] h-[25px] bg-[url('/images/downloadVector.png')] bg-contain bg-no-repeat cursor-pointer"
						>
							Download Resume
						</button>
					</a>
				</Reveal>
			</div>
		</section>
	);
};

export default HeroSectionHomePage;
