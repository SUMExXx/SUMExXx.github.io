'use client';

import { animate, motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { motionState } from './motionState';

/** A page chapter: tells the particle field which shape to form while it is on screen. */
export function Section({
	id,
	scene,
	index,
	children,
	className = '',
}: {
	id: string;
	scene: number;
	index?: string;
	children: React.ReactNode;
	className?: string;
}) {
	const ref = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
	// The ghost number drifts against the scroll, a cheap depth cue between layers.
	const y = useTransform(scrollYProgress, [0, 1], [160, -220]);
	return (
		<section id={id} ref={ref} data-scene={scene} className={`relative scroll-mt-24 ${className}`}>
			{index && (
				<motion.span style={{ y }} className="sd3-ghost-num hidden md:block" aria-hidden>
					{index}
				</motion.span>
			)}
			{children}
		</section>
	);
}

const GLYPHS = '!<>-_\\/[]{}=+*^?#01';

/** Text decodes from noise when it scrolls into view. */
export function Scramble({ text, className = '' }: { text: string; className?: string }) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, margin: '-10% 0px' });
	const [out, setOut] = useState(text);
	useEffect(() => {
		if (!inView) {
			setOut(text.replace(/\S/g, ' '));
			return;
		}
		let raf = 0;
		const start = performance.now();
		const run = (t: number) => {
			// Time-based (one char per 35ms) so slow devices finish on schedule too.
			const revealed = (t - start) / 35;
			setOut(
				text
					.split('')
					.map((c, i) => (c === ' ' || i < revealed ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
					.join(''),
			);
			if (revealed < text.length) raf = requestAnimationFrame(run);
		};
		raf = requestAnimationFrame(run);
		return () => cancelAnimationFrame(raf);
	}, [inView, text]);
	return (
		<span ref={ref} className={className} aria-label={text}>
			<span aria-hidden>{out}</span>
		</span>
	);
}

export function SectionHead({ index, kicker, title }: { index: string; kicker: string; title: string }) {
	return (
		<header className="relative mb-14 md:mb-20">
			<div className="flex items-end">
				<span className="sd3-tab font-mono text-[11px] tracking-[0.3em] uppercase md:text-[12px]">
					<span className="text-(--sd-green)">{index}</span>
					{kicker}
				</span>
			</div>
			<div className="sd3-tab-rule" />
			<h2 className="sd3-display mt-6 text-[40px] leading-[0.95] md:text-[88px]">
				<Scramble text={title} />
			</h2>
		</header>
	);
}

/** Card that leans toward the pointer. Mouse only; touch devices get a flat card. */
export function Tilt({
	children,
	className = '',
	max = 8,
}: {
	children: React.ReactNode;
	className?: string;
	max?: number;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const rx = useMotionValue(0);
	const ry = useMotionValue(0);
	const srx = useSpring(rx, { stiffness: 200, damping: 20 });
	const sry = useSpring(ry, { stiffness: 200, damping: 20 });
	return (
		<motion.div
			ref={ref}
			onPointerMove={(e) => {
				if (e.pointerType !== 'mouse') return;
				const r = ref.current!.getBoundingClientRect();
				ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
				rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
			}}
			onPointerLeave={() => {
				rx.set(0);
				ry.set(0);
			}}
			style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

export function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true });
	useEffect(() => {
		if (!inView) return;
		const c = animate(0, to, {
			duration: 2,
			ease: [0.16, 1, 0.3, 1],
			onUpdate: (v) => {
				if (ref.current) ref.current.textContent = Math.round(v) + suffix;
			},
		});
		return () => c.stop();
	}, [inView, to, suffix]);
	return <span ref={ref}>0{suffix}</span>;
}

/** Lift-in for children of a section, staggered by index. Transform and opacity only. */
export function Rise({
	children,
	i = 0,
	className = '',
}: {
	children: React.ReactNode;
	i?: number;
	className?: string;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50, rotateX: -18 }}
			whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
			viewport={{ once: true, margin: '-8% 0px' }}
			transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
			style={{ transformPerspective: 900 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

/** A paragraph that lights up word by word as it scrolls through the viewport (scrubbed, not one-shot). */
export function ScrollFill({
	text,
	highlight = [],
	className = '',
}: {
	text: string;
	highlight?: string[];
	className?: string;
}) {
	const ref = useRef<HTMLParagraphElement>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
	useEffect(
		() => scrollYProgress.on('change', (v) => ref.current?.style.setProperty('--p', v.toFixed(3))),
		[scrollYProgress],
	);
	const words = text.split(' ');
	return (
		<p ref={ref} className={className} aria-label={text}>
			{words.map((w, i) => (
				<span
					key={i}
					aria-hidden
					className={`sd3-fill-word ${highlight.some((h) => w.toLowerCase().startsWith(h)) ? 'sd3-hl' : ''}`}
					style={{ '--i': i / words.length } as React.CSSProperties}
				>
					{w}{' '}
				</span>
			))}
		</p>
	);
}

/**
 * Giant outlined words that slide with scroll position and shear with scroll speed.
 * One rAF loop, only while on screen, writing a single transform.
 */
export function VelocityBand({ words, reverse = false }: { words: string[]; reverse?: boolean }) {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const el = ref.current!;
		let raf = 0,
			on = false,
			skew = 0,
			half = el.scrollWidth / 2;
		// Measured once (and on resize), never inside the loop: reading layout after writing a
		// transform forces a synchronous style + layout pass every frame.
		const ro = new ResizeObserver(() => (half = el.scrollWidth / 2));
		ro.observe(el);
		const io = new IntersectionObserver(([e]) => {
			on = e.isIntersecting;
			if (on) raf = requestAnimationFrame(loop);
		});
		const loop = () => {
			if (!on) return;
			const x = ((window.scrollY * 0.6) % half) * (reverse ? 1 : -1) - (reverse ? half : 0);
			skew += (Math.max(-12, Math.min(12, motionState.velocity * 0.4)) - skew) * 0.12;
			el.style.transform = `translate3d(${x}px,0,0) skewX(${-skew}deg)`;
			raf = requestAnimationFrame(loop);
		};
		io.observe(el);
		return () => {
			io.disconnect();
			ro.disconnect();
			cancelAnimationFrame(raf);
		};
	}, [reverse]);
	const row = words.flatMap((w, i) => [
		<span key={`w${i}`} className={i % 2 ? 'f' : 'o'}>
			{w}
		</span>,
		<span key={`s${i}`} className="o px-[0.3em]">
			/
		</span>,
	]);
	return (
		<div className="overflow-hidden py-2" aria-hidden>
			<div ref={ref} className="sd3-band inline-flex">
				{row}
				{row.map((r) => ({ ...r, key: `${r.key}b` }))}
			</div>
		</div>
	);
}
