'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import { profile } from '@/lib/data/portfolio';

const BOOT = 1.5;
const ease = [0.16, 1, 0.3, 1] as const;

function useTypewriter(words: string[]) {
	const [text, setText] = useState('');
	useEffect(() => {
		let w = 0,
			i = 0,
			del = false,
			t: ReturnType<typeof setTimeout>;
		const step = () => {
			const word = words[w];
			i += del ? -1 : 1;
			setText(word.slice(0, i));
			if (!del && i === word.length) {
				del = true;
				t = setTimeout(step, 1600);
				return;
			}
			if (del && i === 0) {
				del = false;
				w = (w + 1) % words.length;
			}
			t = setTimeout(step, del ? 28 : 60);
		};
		t = setTimeout(step, BOOT * 1000 + 600);
		return () => clearTimeout(t);
	}, [words]);
	return text;
}

// Deterministic per-letter scatter so the server and client render the same thing.
const scatter = (i: number) => {
	const s = Math.sin(i * 12.9898) * 43758.5453;
	const r = s - Math.floor(s);
	return { x: (r - 0.5) * 900, y: -200 - r * 500, rot: (r - 0.5) * 160, z: 200 + r * 600 };
};

function Letter({
	c,
	i,
	delay,
	progress,
	className,
}: {
	c: string;
	i: number;
	delay: number;
	progress: MotionValue<number>;
	className: string;
}) {
	const s = scatter(i);
	// Scrolling away blows the name apart: each letter flies off on its own 3D path.
	const x = useTransform(progress, [0, 1], [0, s.x]);
	const y = useTransform(progress, [0, 1], [0, s.y]);
	const z = useTransform(progress, [0, 1], [0, s.z]);
	const rotateX = useTransform(progress, [0, 1], [0, s.rot]);
	const rotateY = useTransform(progress, [0, 1], [0, -s.rot * 0.6]);
	return (
		<motion.span style={{ x, y, z, rotateX, rotateY }} className="inline-block">
			<motion.span
				initial={{ y: '110%', rotateX: -90, opacity: 0 }}
				animate={{ y: '0%', rotateX: 0, opacity: 1 }}
				transition={{ delay: delay + i * 0.045, duration: 1.1, ease }}
				// background-clip:text can't paint through transformed children, so each letter carries the fill.
				className={`inline-block origin-bottom ${className}`}
			>
				{c}
			</motion.span>
		</motion.span>
	);
}

export default function Hero() {
	const role = useTypewriter(profile.roles);
	const { scrollY } = useScroll();
	const progress = useTransform(scrollY, [0, 700], [0, 1], { clamp: true });
	const fade = useTransform(scrollY, [0, 500], [1, 0]);
	const lift = useTransform(scrollY, [0, 700], [0, -120]);

	return (
		<section id="top" data-scene={0} className="relative flex min-h-[100svh] flex-col justify-center">
			<div className="mx-auto w-full max-w-[1200px] px-5 pt-28 md:px-8">
				<motion.div style={{ opacity: fade }}>
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: BOOT, duration: 0.8 }}
						className="sd3-tab mb-8 font-mono text-[11px] tracking-[0.25em] uppercase"
					>
						<span className="sd3-pulse h-2 w-2 bg-(--sd-green)" />
						Online · {profile.location}
					</motion.div>
				</motion.div>

				<h1
					className="sd3-display text-[13.5vw] leading-[0.86] [perspective:900px] md:text-[150px]"
					aria-label={profile.name}
				>
					<span aria-hidden className="block [transform-style:preserve-3d]">
						{'SUMAN'.split('').map((c, i) => (
							<Letter key={i} c={c} i={i} delay={BOOT} progress={progress} className="sd3-grad-text" />
						))}
					</span>
					<span aria-hidden className="block [transform-style:preserve-3d]">
						{'DEBNATH'.split('').map((c, i) => (
							<Letter key={i} c={c} i={i + 5} delay={BOOT + 0.25} progress={progress} className="sd3-outline-text" />
						))}
					</span>
				</h1>

				<motion.div
					style={{ opacity: fade, y: lift }}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: BOOT + 0.8, duration: 1 }}
					className="mt-10 max-w-[560px]"
				>
					<p className="font-mono text-[15px] text-white/90 md:text-[20px]">
						<span className="text-(--sd-violet)">&gt;</span> {role}
						<span className="sd3-caret" />
					</p>
					<p className="mt-4 text-[16px] leading-relaxed text-white/60 md:text-[18px]">{profile.tagline}</p>
					<div className="mt-9 flex flex-wrap gap-4">
						<a href="#projects" className="sd3-btn sd3-btn-primary">
							View work →
						</a>
						<a href="#contact" className="sd3-btn sd3-btn-ghost">
							Get in touch
						</a>
					</div>
				</motion.div>
			</div>

			<motion.a
				href="#about"
				style={{ opacity: fade }}
				className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase md:flex"
			>
				scroll
				<span className="sd3-scroll-line" />
			</motion.a>
		</section>
	);
}
