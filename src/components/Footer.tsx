import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { socials } from '@/lib/data/website';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import SendMessage from '@/components/SendMessage';

const Footer = () => {
	return (
		<div className="w-full flex flex-col justify-center md:mt-[80px] relative">
			<div className="w-full relative md:h-[66px] h-[37px] overflow-hidden -bottom-1">
				<Image
					className="absolute md:flex hidden md:left-0 -bottom-1 md:w-[481.5px] md:h-[66px] w-[273px] h-[37px]"
					src={'/images/footerElement.png'}
					alt="footer element"
					width={481.5}
					height={66}
				/>
				<Image
					className="absolute md:hidden flex right-2/3 -bottom-1 md:w-[481.5px] md:h-[66px] w-[273px] h-[37px]"
					src={'/images/footerElement.png'}
					alt="footer element"
					width={481.5}
					height={66}
				/>
				<Image
					className="absolute md:flex hidden md:right-0 -bottom-1 md:w-[481.5px] md:h-[66px] w-[273px] h-[37px] transform scale-x-[-1]"
					src={'/images/footerElement.png'}
					alt="footer element"
					width={481.5}
					height={66}
				/>
				<Image
					className="absolute md:hidden flex left-2/3 -bottom-1 md:w-[481.5px] md:h-[66px] w-[273px] h-[37px] transform scale-x-[-1]"
					src={'/images/footerElement.png'}
					alt="footer element"
					width={481.5}
					height={66}
				/>
			</div>

			<div
				className="md:gap-[20px] gap-[20px] w-full flex flex-col justify-start items-center bg-main-background"
				id="contact"
			>
				<div className="w-full flex flex-wrap md:justify-between justify-center gap-[40px] md:px-20 px-10 md:pt-[80px] pt-[40px] items-start max-w-[1440px]">
					<div className="flex flex-col h-full justify-between md:items-start items-center">
						<Link href={process.env.NEXT_PUBLIC_BASE_URL || '/'}>
							<Image
								src={'/icons/sd.svg'}
								height={87}
								width={159}
								alt="SD Logo"
								className="md:w-[159px] md:h-[87px] w-[54px] h-[30px]"
							/>
						</Link>
						<div className="md:py-[40px] py-[20px] md:gap-[40px] gap-[20px] flex flex-col md:items-start items-center">
							<Link rel="canonical" className="md:text-[20px] font-medium text-main-quaternary" href={'/'}>
								About
							</Link>
							<Link rel="canonical" className="md:text-[20px] font-medium text-main-quaternary" href={'/projects'}>
								Projects
							</Link>
						</div>
					</div>
					<div className="flex flex-col h-full justify-between md:items-start items-center">
						<h1 className="md:text-[28px] text-[20px] font-extrabold text-main-secondary">Contact</h1>
						<div className="flex flex-col h-full md:gap-[40px] gap-[20px] md:py-[40px] py-[20px] justify-center md:items-start items-center">
							<Link
								rel="canonical"
								target="_blank"
								className="flex justify-center items-center md:gap-[20px] gap-[10px] text-main-foreground"
								href={socials.github}
							>
								<GitHubIcon className="md:h-[24px] md:w-[24px] h-[24px] w-[24px]" sx={{ color: 'white' }} />
								<span className="md:subtitle">{socials.github.substring(18)}</span>
							</Link>
							<Link
								rel="canonical"
								target="_blank"
								className="flex justify-center items-center md:gap-[20px] gap-[10px] text-main-foreground"
								href={socials.linkedIn}
							>
								<LinkedInIcon className="md:h-[24px] md:w-[24px] h-[24px] w-[24px]" sx={{ color: 'white' }} />
								<span className="md:subtitle">{socials.linkedIn.substring(27)}</span>
							</Link>
							<Link
								rel="canonical"
								className="flex justify-center items-center md:gap-[20px] gap-[10px] text-main-foreground"
								href={socials.phone}
							>
								<CallIcon className="md:h-[24px] md:w-[24px] h-[24px] w-[24px]" sx={{ color: 'white' }} />
								<span className="md:subtitle">{socials.phone.substring(4)}</span>
							</Link>
							<Link
								rel="canonical"
								className="flex justify-center items-center md:gap-[20px] gap-[10px] text-main-foreground"
								href={socials.email}
							>
								<MailIcon className="md:h-[24px] md:w-[24px] h-[24px] w-[24px]" sx={{ color: 'white' }} />
								<span className="md:subtitle">{socials.email.substring(7)}</span>
							</Link>
						</div>
					</div>
					<div>
						<SendMessage />
					</div>
				</div>
				<div className="flex text-[12px] w-full md:px-[10px] md:py-[20px] py-[20px] justify-center items-center text-main-foreground font-extralight">
					© 2025 Suman Debnath. All rights reserved.
				</div>
			</div>
		</div>
	);
};

export default Footer;
