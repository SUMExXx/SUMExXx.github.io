'use client';

import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { profile } from '@/lib/data/portfolio';

export const SECTIONS = [
	{ id: 'about', label: 'About' },
	{ id: 'work', label: 'Experience' },
	{ id: 'projects', label: 'Projects' },
	{ id: 'skills', label: 'Skills' },
	{ id: 'education', label: 'Education' },
	{ id: 'timeline', label: 'Timeline' },
	{ id: 'contact', label: 'Contact' },
];

export default function Nav() {
	const pathname = usePathname();
	const home = pathname === '/';
	const href = (id: string) => (home ? `#${id}` : `/#${id}`);
	const [active, setActive] = useState('');
	const [open, setOpen] = useState(false);
	const { scrollYProgress } = useScroll();
	const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

	useEffect(() => {
		if (!home)
			return setActive(pathname.startsWith('/blog') ? 'blog' : pathname.startsWith('/projects') ? 'projects' : '');
		const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), {
			rootMargin: '-45% 0px -50% 0px',
		});
		SECTIONS.forEach((s) => {
			const el = document.getElementById(s.id);
			if (el) io.observe(el);
		});
		return () => io.disconnect();
	}, [home, pathname]);

	const links = [
		...SECTIONS.map((s) => ({ key: s.id, label: s.label, href: href(s.id) })),
		{ key: 'blog', label: 'Blog', href: '/blog/' },
	];

	return (
		<>
			<motion.div
				style={{ scaleX: bar }}
				className="fixed top-0 right-0 left-0 z-50 h-[3px] origin-left bg-gradient-to-r from-(--sd-purple) via-(--sd-violet) to-(--sd-green)"
			/>
			<motion.nav
				initial={{ y: -90, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: home ? 1.6 : 0, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
				className="fixed top-3 left-1/2 z-40 w-[calc(100%-24px)] max-w-[1240px] -translate-x-1/2"
			>
				<div className="sd3-panel flex items-center justify-between px-4 py-2.5 [--cut:14px] [--sd-fill:rgba(6,3,12,0.97)] md:px-5">
					<Link href="/" className="group flex items-center gap-3 font-mono text-[13px]" aria-label="Home">
						<span className="grid h-9 w-11 place-items-center bg-(--sd-purple) font-bold [clip-path:polygon(8px_0,100%_0,calc(100%-8px)_100%,0_100%)] group-hover:bg-(--sd-green) group-hover:text-black">
							SD
						</span>
						<span className="hidden tracking-[0.2em] text-white/80 sm:block">{profile.handle}</span>
					</Link>
					<ul className="hidden items-center font-mono text-[11px] tracking-[0.16em] uppercase xl:flex">
						{links.map((l, i) => (
							<li key={l.key}>
								<Link
									href={l.href}
									className={`relative block px-3 py-2 transition-colors ${active === l.key ? 'text-black' : 'text-white/60 hover:text-white'}`}
								>
									{active === l.key && (
										<motion.span
											layoutId="nav-tab"
											className="absolute inset-0 bg-(--sd-green) [clip-path:polygon(8px_0,calc(100%-8px)_0,100%_100%,0_100%)]"
											transition={{ type: 'spring', stiffness: 380, damping: 32 }}
										/>
									)}
									<span className="relative">
										<span className={active === l.key ? 'text-black/60' : 'text-(--sd-violet)'}>0{i + 1}</span> {l.label}
									</span>
								</Link>
							</li>
						))}
					</ul>
					<div className="flex items-center gap-2">
						<a
							href={profile.resume}
							target="_blank"
							rel="noreferrer"
							className="sd3-btn sd3-btn-ghost hidden !px-4 !py-2.5 !text-[11px] md:inline-flex"
						>
							Résumé ↗
						</a>
						<button
							type="button"
							aria-label={open ? 'Close menu' : 'Open menu'}
							aria-expanded={open}
							onClick={() => setOpen((o) => !o)}
							className="grid h-10 w-10 place-items-center bg-white/5 [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] xl:hidden"
						>
							<span className={`sd3-burger ${open ? 'is-open' : ''}`} />
						</button>
					</div>
				</div>
			</motion.nav>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 0, 100% 0)' }}
						animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
						exit={{ clipPath: 'polygon(100% 0, 100% 0, 100% 0, 100% 0)' }}
						transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
						className="fixed inset-0 z-30 flex flex-col justify-center gap-1 bg-[#05020a] px-8 xl:hidden"
					>
						{links.map((l, i) => (
							<motion.div
								key={l.key}
								initial={{ opacity: 0, x: -40 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.15 + i * 0.05 }}
							>
								<Link
									href={l.href}
									onClick={() => setOpen(false)}
									className="sd3-display text-[36px] leading-tight text-white/90 hover:text-(--sd-green)"
								>
									<span className="align-top font-mono text-[13px] text-(--sd-violet)">0{i + 1}</span> {l.label}
								</Link>
							</motion.div>
						))}
						<a href={profile.resume} target="_blank" rel="noreferrer" className="sd3-btn sd3-btn-primary mt-8 self-start">
							Download résumé ↗
						</a>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

export function Footer() {
	return (
		<footer className="mt-10 font-mono text-[12px] text-white/45">
			<div className="sd3-notch" />
			<div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-6 px-5 py-10 md:px-8">
				<span>
					© {new Date().getFullYear()} {profile.name} · Next.js · Three.js
				</span>
				<div className="flex flex-wrap gap-5 uppercase tracking-[0.18em]">
					{profile.links.map((l) => (
						<a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="sd3-link">
							{l.label}
						</a>
					))}
					<Link href="/blog/" className="sd3-link">
						Blog
					</Link>
				</div>
			</div>
		</footer>
	);
}
