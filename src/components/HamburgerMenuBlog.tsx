'use client';
import React, { useState } from 'react';
import Link from 'next/link';

import Menu from '@mui/icons-material/Menu';
import { Close } from '@mui/icons-material';

const HamburgerMenuBlog = () => {
	const [menuOpen, setMenu] = useState(false);

	const close = () => {
		setMenu(false);
		document.body.style.overflow = 'auto';
	};

	const open = () => {
		setMenu(true);
		document.body.style.overflow = 'hidden';
	};

	return (
		<div>
			{menuOpen ? (
				<button type="button" title="close" onClick={close}>
					<Close className="h-[24px] w-[24px] text-main-primary" />
				</button>
			) : (
				<button type="button" title="open" onClick={open}>
					<Menu className="h-[24px] w-[24px] text-main-primary" />
				</button>
			)}
			<div
				className={`absolute flex md:hidden background-menu-vector-1 bg-slate-300 top-[60px] z-10 left-0 w-[78%] py-40 transition-transform duration-300 transform h-[calc(100vh-60px)] ${menuOpen ? 'translate-x-0' : '-translate-x-full'} p-4 pl-[40px]`}
			>
				<div className="flex flex-col items-center justify-center md:gap-8 gap-2 w-full heading text-left">
					<ul className="items-start justify-center gap-[80px] flex flex-col w-full">
						<li className="transition justify-center ease-in-out hover:animate-text hover:text-[#F00000]">
							<Link onClick={close} rel="canonical" className="md:text-[16px] font-medium text-main-quaternary" href={'/'}>
								About
							</Link>
						</li>
						<li className="transition justify-center ease-in-out hover:animate-text hover:text-[#F00000]">
							<Link
								onClick={close}
								rel="canonical"
								className="md:text-[16px] font-medium text-main-quaternary"
								href={'/projects'}
							>
								Projects
							</Link>
						</li>
						<li className="transition justify-center ease-in-out hover:animate-text hover:text-[#F00000]">
							<Link
								onClick={close}
								rel="canonical"
								className="md:text-[16px] font-medium text-main-quaternary"
								href={'#contact'}
							>
								Contact
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div
				className={`absolute flex md:hidden background-menu-vector-2 bg-slate-300 top-[60px] z-10 right-0 w-[75%] py-40 transition-transform duration-300 transform h-[calc(100vh-60px)] ${menuOpen ? 'translate-x-5/12' : 'translate-x-full'} p-4`}
			/>
		</div>
	);
};

export default HamburgerMenuBlog;
