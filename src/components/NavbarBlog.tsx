import React from 'react';
import Link from 'next/link';
import { website } from '@/lib/data/website';
import Logo from '@/components/Logo';
import HamburgerMenuBlog from '@/components/HamburgerMenuBlog';

const NavbarBlog = () => {
	return (
		<nav
			className="z-50 flex w-full fixed top-0 justify-center md:h-[80px] h-[60px] bg-main-background shadow-2xl"
			id="navbar_container"
		>
			<div className="flex justify-between items-center max-w-[1440px] md:px-20 px-[10px] w-full">
				<Link rel="canonical" href={process.env.NEXT_PUBLIC_BLOG_URL || '/'} className="flex items-center gap-2 md:gap-4">
					<div className="flex items-center md:gap-[10px]">
						{/* <Image src={'/images/sd.png'} width={54.55} height={30} alt={'GSPH logo'} className='md:w-[54.55px] md:h-[30px] w-[36.36px] h-[20px]'></Image> */}
						<Logo
							className="md:min-w-[54.55px] md:min-h-[30px] min-w-[36.36px] min-h-[20px]"
							fontSize="inherit"
							height={54.55}
							width={30}
						/>
						<span className="md:text-2xl font-bold text-main-quaternary md:flex hidden">Blogs</span>
					</div>
				</Link>

				<div className="flex justify-center items-center gap-[20px]">
					<ul className="items-center md:gap-[20px] gap-[10px] flex">
						<li className="flex justify-center items-center transition ease-in-out hover:animate-text hover:text-[#F00000]">
							<Link
								rel="canonical"
								className="md:p-[10px] p-[6px] flex justify-center items-center  bg-main-primary md:outline-4 outline-2 outline-main-secondary md:-outline-offset-4 -outline-offset-2"
								href={process.env.NEXT_PUBLIC_BASE_URL || website.baseUrl}
							>
								<span className="md:text-[16px] text-[12px] font-medium text-white">Profile Website</span>
							</Link>
						</li>
					</ul>
					<div className="flex justify-center items-center md:hidden" title="hamburgerMenuBlog">
						<HamburgerMenuBlog />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavbarBlog;
