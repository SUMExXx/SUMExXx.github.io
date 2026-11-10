'use client';

import Lenis from 'lenis';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { motionState } from './motionState';

// WebGL only exists in the browser; the static HTML ships without it.
const Scene = dynamic(() => import('./Scene'), { ssr: false });

// Backdrop glow per shape, so each chapter has its own light, not just its own particles.
const CHAPTER_GLOW: [string, string][] = [
	['#3b0a66', '#0b3d12'],
	['#1d0b4a', '#4d0b78'],
	['#063b1c', '#2a0a4f'],
	['#2a0a4f', '#0a2a3b'],
	['#4d0b78', '#081a2b'],
	['#0b3d12', '#3b0a66'],
	['#12052a', '#5a0e8f'],
	['#0d4a14', '#4d0b78'],
];

export default function Shell({ children }: { children: React.ReactNode }) {
	const [booted, setBooted] = useState(false);
	const lenisRef = useRef<Lenis | null>(null);
	const pathname = usePathname();

	useEffect(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const lenis = reduce ? null : new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
		lenisRef.current = lenis;
		const backdrop = document.querySelector<HTMLElement>('.sd3-backdrop')!;
		let last = window.scrollY;
		let raf = 0;
		let chapter = -1;
		// Section spans in document coordinates, re-measured on resize and route change only.
		let marks: { start: number; end: number; shape: number }[] = [];
		const measure = () => {
			marks = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]')).map((el) => {
				const r = el.getBoundingClientRect();
				const start = r.top + window.scrollY;
				return { start, end: start + r.height, shape: +el.dataset.scene! };
			});
		};
		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(document.body);
		window.addEventListener('sd3:measure', measure);

		const tick = (t: number) => {
			lenis?.raf(t);
			const y = window.scrollY;
			motionState.velocity += (y - last - motionState.velocity) * 0.15;
			last = y;
			// A shape holds while its section fills the viewport centre and morphs only across a
			// window straddling each boundary, so tall sections never sit half-dissolved.
			const c = y + window.innerHeight / 2;
			const zone = window.innerHeight * 0.7;
			let s = marks[0]?.shape ?? 0;
			for (let i = 0; i < marks.length; i++) {
				const m = marks[i];
				if (i > 0 && c < m.start + zone / 2) break;
				s = m.shape;
				const next = marks[i + 1];
				if (next && c > m.end - zone / 2) {
					const t = Math.min((c - (m.end - zone / 2)) / zone, 1);
					s = m.shape + (next.shape - m.shape) * t;
				}
			}
			motionState.scene = s;
			const ch = Math.round(s);
			if (ch !== chapter && CHAPTER_GLOW[ch]) {
				chapter = ch;
				backdrop.style.setProperty('--sd-glow-a', CHAPTER_GLOW[ch][0]);
				backdrop.style.setProperty('--sd-glow-b', CHAPTER_GLOW[ch][1]);
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);

		const onPointer = (e: PointerEvent) => {
			motionState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
			motionState.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
		};
		// Route in-page anchors through Lenis so jumps glide instead of teleporting.
		const onClick = (e: MouseEvent) => {
			const a = (e.target as HTMLElement).closest('a[href^="#"]');
			if (!a || !lenis) return;
			const id = a.getAttribute('href')!;
			const el = id === '#' || id === '#top' ? 0 : document.querySelector<HTMLElement>(id);
			if (el === null) return;
			e.preventDefault();
			lenis.scrollTo(el, { duration: 1.6 });
			history.replaceState(null, '', id);
		};
		window.addEventListener('pointermove', onPointer, { passive: true });
		document.addEventListener('click', onClick);
		const boot = setTimeout(() => setBooted(true), 1500);
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			lenis?.destroy();
			window.removeEventListener('sd3:measure', measure);
			window.removeEventListener('pointermove', onPointer);
			document.removeEventListener('click', onClick);
			clearTimeout(boot);
		};
	}, []);

	// Client-side navigation keeps the scene alive; reset the scroll and re-read the new page's sections.
	useEffect(() => {
		if (!location.hash) lenisRef.current?.scrollTo(0, { immediate: true });
		requestAnimationFrame(() => window.dispatchEvent(new Event('sd3:measure')));
	}, [pathname]);

	return (
		<>
			<div className="sd3-backdrop" aria-hidden />
			<Scene />
			<div className="sd3-vignette" aria-hidden />
			<Cursor />
			<Boot done={booted} />
			{children}
		</>
	);
}

function Cursor() {
	const dot = useRef<HTMLDivElement>(null);
	const ring = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (!window.matchMedia('(pointer: fine)').matches) return;
		let x = -100,
			y = -100,
			rx = x,
			ry = y,
			raf = 0;
		const move = (e: PointerEvent) => {
			x = e.clientX;
			y = e.clientY;
			ring.current?.classList.toggle('is-hot', !!(e.target as HTMLElement).closest('a,button,input,textarea,[data-hot]'));
		};
		const loop = () => {
			rx += (x - rx) * 0.2;
			ry += (y - ry) * 0.2;
			dot.current!.style.transform = `translate3d(${x}px,${y}px,0)`;
			ring.current!.style.transform = `translate3d(${rx}px,${ry}px,0) rotate(45deg)`;
			raf = requestAnimationFrame(loop);
		};
		document.documentElement.classList.add('sd3-has-cursor');
		window.addEventListener('pointermove', move, { passive: true });
		raf = requestAnimationFrame(loop);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('pointermove', move);
			document.documentElement.classList.remove('sd3-has-cursor');
		};
	}, []);
	return (
		<>
			<div ref={ring} className="sd3-cursor-ring" aria-hidden />
			<div ref={dot} className="sd3-cursor-dot" aria-hidden />
		</>
	);
}

const BOOT_LINES = ['> mounting particle core ........ ok', '> linking mcp://suman.debnath ... ok', '> welcome.'];

function Boot({ done }: { done: boolean }) {
	return (
		<div className={`sd3-boot ${done ? 'is-done' : ''}`} aria-hidden>
			<div className="font-mono text-[12px] leading-7 text-[var(--sd-green)] md:text-[14px]">
				{BOOT_LINES.map((l, i) => (
					<div key={l} className="sd3-boot-line" style={{ animationDelay: `${i * 0.3}s` }}>
						{l}
					</div>
				))}
				<div className="sd3-boot-bar mt-4" />
			</div>
		</div>
	);
}
