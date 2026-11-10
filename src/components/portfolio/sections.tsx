'use client';

import {
	AnimatePresence,
	LayoutGroup,
	motion,
	useScroll,
	useSpring,
	useTransform,
	type MotionValue,
} from 'framer-motion';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
	education,
	experience,
	journey,
	profile,
	projects,
	skillGroups,
	stats,
	type Project,
} from '@/lib/data/portfolio';
import { motionState } from './motionState';
import ProjectCover from './ProjectCover';
import { Counter, Rise, ScrollFill, Section, SectionHead, Tilt } from './ui';

const wrap = 'mx-auto w-full max-w-[1200px] px-5 md:px-8 py-28 md:py-36';

/* ─────────────────────────── About ─────────────────────────── */

export function About() {
	return (
		<Section id="about" scene={1} index="01">
			<div className={wrap}>
				<SectionHead index="01" kicker="Who I am" title="SYSTEMS THAT THINK." />
				<div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
					<ScrollFill
						text={profile.summary}
						highlight={['ai', 'mcp', 'langgraph', 'spring', 'next.js', 'instant.']}
						className="sd3-display text-[22px] leading-[1.45] font-medium md:text-[30px]"
					/>
					<div className="grid grid-cols-2 gap-4">
						{stats.map((s, i) => (
							<Rise key={s.label} i={i}>
								<div className={`sd3-panel ${i % 2 ? 'is-alt' : ''} h-full p-5`}>
									<div className="sd3-display text-[44px] leading-none text-(--sd-green) md:text-[54px]">
										<Counter to={s.value} suffix={s.suffix} />
									</div>
									<p className="mt-3 font-mono text-[12px] leading-snug text-white/55 uppercase">{s.label}</p>
								</div>
							</Rise>
						))}
					</div>
				</div>
			</div>
		</Section>
	);
}

/* ───────────────────────── Experience ───────────────────────── */

export function Experience() {
	const ref = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState(0);
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 60%'] });
	const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
	useEffect(
		() =>
			scrollYProgress.on('change', (v) => setActive(Math.min(experience.length - 1, Math.floor(v * experience.length)))),
		[scrollYProgress],
	);
	const r = experience[active];
	return (
		<Section id="work" scene={2} index="02">
			<div className={wrap}>
				<SectionHead index="02" kicker="Experience" title="WHERE I SHIP." />
				<div ref={ref} className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
					{/* Sticky readout: scrubs to whichever role is in view. */}
					<div className="hidden lg:block">
						<div className="sticky top-32">
							<div className="font-mono text-[12px] tracking-[0.3em] text-white/40 uppercase">Now viewing</div>
							<AnimatePresence mode="wait">
								<motion.div
									key={active}
									initial={{ opacity: 0, y: 30, rotateX: -60 }}
									animate={{ opacity: 1, y: 0, rotateX: 0 }}
									exit={{ opacity: 0, y: -30, rotateX: 60 }}
									transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
									style={{ transformPerspective: 600 }}
								>
									<div className="sd3-display mt-3 text-[56px] leading-none text-(--sd-green)">
										{r.period.match(/\d{4}/)?.[0]}
									</div>
									<div className="mt-2 font-mono text-[14px] text-(--sd-violet)">{r.period}</div>
									<div className="mt-6 text-[15px] text-white/60">{r.org}</div>
								</motion.div>
							</AnimatePresence>
							<div className="mt-10 flex gap-2">
								{experience.map((_, i) => (
									<span
										key={i}
										className={`h-1.5 transition-all duration-500 [clip-path:polygon(3px_0,100%_0,calc(100%-3px)_100%,0_100%)] ${i === active ? 'w-14 bg-(--sd-green)' : 'w-6 bg-white/20'}`}
									/>
								))}
							</div>
						</div>
					</div>

					<div className="relative pl-8 md:pl-12">
						<div className="absolute top-0 bottom-0 left-[7px] w-[2px] bg-white/10 md:left-[11px]" />
						<motion.div
							style={{ scaleY: fill }}
							className="absolute top-0 bottom-0 left-[6px] w-[4px] origin-top bg-gradient-to-b from-(--sd-green) via-(--sd-violet) to-(--sd-purple) md:left-[10px]"
						/>
						<div className="flex flex-col gap-8">
							{experience.map((e, i) => (
								<Rise key={e.title + e.period} i={i} className="relative">
									<span
										className={`absolute top-9 -left-8 h-4 w-4 [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)] md:-left-[45px] ${i <= active ? 'bg-(--sd-green)' : 'bg-white/30'} transition-colors`}
									/>
									<Tilt max={4}>
										<div className={`sd3-panel ${i % 2 ? 'is-alt' : ''} p-6 md:p-9`}>
											<div className="flex flex-wrap items-baseline justify-between gap-3">
												<h3 className="sd3-display text-[26px] leading-tight md:text-[36px]">{e.title}</h3>
												<span className="lg:hidden">
													<span className="sd3-chip">{e.period}</span>
												</span>
											</div>
											<p className="mt-1 font-mono text-[13px] text-(--sd-violet)">{e.org}</p>
											<ul className="mt-6 space-y-3">
												{e.points.map((p) => (
													<li key={p} className="flex gap-3 text-[15px] leading-relaxed text-white/70">
														<span className="mt-[9px] h-1.5 w-1.5 shrink-0 rotate-45 bg-(--sd-green)" />
														{p}
													</li>
												))}
											</ul>
											<div className="mt-6 flex flex-wrap gap-2">
												{e.tags.map((t) => (
													<span key={t} className="sd3-chip">
														{t}
													</span>
												))}
											</div>
										</div>
									</Tilt>
								</Rise>
							))}
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
}

/* ────────────────────────── Projects ────────────────────────── */

const FEATURED = ['recall', 'prepindia', 'openally', 'sencoline', 'firstox', 'codemon'];

function GalleryCard({
	p,
	i,
	x,
	cardW,
	gap,
	pad,
}: {
	p: Project;
	i: number;
	x: MotionValue<number>;
	cardW: number;
	gap: number;
	pad: number;
}) {
	// Coverflow: rotation and depth follow each card's distance from the viewport centre.
	const d = useTransform(x, (v) => {
		const vw = typeof window === 'undefined' ? 1440 : window.innerWidth;
		return (pad + i * (cardW + gap) + v + cardW / 2 - vw / 2) / vw;
	});
	const rotateY = useTransform(d, [-1, 0, 1], [38, 0, -38]);
	const scale = useTransform(d, [-1, 0, 1], [0.82, 1, 0.82]);
	const opacity = useTransform(d, [-1.1, -0.6, 0, 0.6, 1.1], [0.25, 0.75, 1, 0.75, 0.25]);
	return (
		<motion.div style={{ rotateY, scale, opacity, width: cardW, transformPerspective: 1400 }} className="shrink-0">
			<Link href={`/projects/${p.slug}/`} className="group block">
				<div className={`sd3-panel ${i % 2 ? 'is-alt' : ''} p-3 md:p-4`}>
					<div className="sd3-hud">
						<ProjectCover p={p} className="aspect-[16/9] w-full transition-transform duration-700 group-hover:scale-[1.03]" />
					</div>
					<div className="flex flex-wrap items-end justify-between gap-4 px-2 pt-5 pb-2 md:px-3">
						<div>
							<div className="font-mono text-[11px] tracking-[0.25em] text-(--sd-violet) uppercase">
								<span className="text-(--sd-green)">Fig. {String(i + 1).padStart(2, '0')}</span> · {p.year}
							</div>
							<h3 className="sd3-display mt-2 text-[30px] leading-none md:text-[46px]">{p.name}</h3>
							<p className="mt-2 font-mono text-[12px] text-(--sd-green)/80">{p.kicker}</p>
						</div>
						<span className="sd3-btn sd3-btn-ghost !px-4 !py-2.5 !text-[11px]">Case study →</span>
					</div>
				</div>
			</Link>
		</motion.div>
	);
}

export function Projects() {
	const featured = FEATURED.map((s) => projects.find((p) => p.slug === s)!).filter(Boolean);
	const outer = useRef<HTMLDivElement>(null);
	const track = useRef<HTMLDivElement>(null);
	const [dims, setDims] = useState({ dist: 0, cardW: 900, gap: 48, pad: 0, vh: 900 });

	useLayoutEffect(() => {
		const m = () => {
			const vw = window.innerWidth;
			const cardW = vw < 768 ? vw * 0.84 : Math.min(vw * 0.62, 920);
			const gap = vw < 768 ? 20 : 56;
			const pad = (vw - cardW) / 2;
			const total = pad * 2 + featured.length * cardW + (featured.length - 1) * gap + cardW * 0.6 + gap;
			setDims({ dist: Math.max(total - vw, 0), cardW, gap, pad, vh: window.innerHeight });
		};
		m();
		window.addEventListener('resize', m);
		return () => window.removeEventListener('resize', m);
	}, [featured.length]);

	const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] });
	const x = useTransform(scrollYProgress, (v) => -v * dims.dist);
	const sx = useSpring(x, { stiffness: 180, damping: 32, mass: 0.3 });
	const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

	return (
		// The section is as tall as the horizontal travel; its sticky child pins while the track slides.
		<Section id="projects" scene={3} className="relative" index="03">
			<div className="mx-auto w-full max-w-[1200px] px-5 pt-28 md:px-8 md:pt-36">
				<SectionHead index="03" kicker="Selected work" title="THINGS I BUILT." />
			</div>
			<div ref={outer} style={{ height: dims.dist + dims.vh }} className="relative">
				<div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
					<motion.div ref={track} style={{ x: sx, paddingLeft: dims.pad, gap: dims.gap }} className="flex items-center">
						{featured.map((p, i) => (
							<GalleryCard key={p.slug} p={p} i={i} x={sx} cardW={dims.cardW} gap={dims.gap} pad={dims.pad} />
						))}
						<Link
							href="/projects/"
							style={{ width: dims.cardW * 0.6 }}
							className="sd3-panel group grid aspect-[4/3] shrink-0 place-items-center p-8 text-center"
						>
							<div>
								<div className="sd3-display text-[64px] leading-none text-(--sd-green) md:text-[96px]">{projects.length}</div>
								<div className="mt-3 font-mono text-[12px] tracking-[0.25em] text-white/60 uppercase">projects in total</div>
								<div className="sd3-btn sd3-btn-primary mt-8">See all →</div>
							</div>
						</Link>
					</motion.div>
					<div className="mx-auto mt-10 h-[3px] w-[min(420px,70vw)] bg-white/10">
						<motion.div style={{ width: bar }} className="h-full bg-(--sd-green)" />
					</div>
				</div>
			</div>
		</Section>
	);
}

/* ─────────────────────────── Skills ─────────────────────────── */

function SkillSphere({ items, highlight }: { items: { name: string; group: number }[]; highlight: number | null }) {
	const ref = useRef<HTMLDivElement>(null);
	// Fibonacci sphere: evenly spread points, no clumping at the poles.
	const points = useMemo(
		() =>
			items.map((_, i) => {
				const y = 1 - (i / (items.length - 1)) * 2;
				const r = Math.sqrt(1 - y * y);
				const t = i * Math.PI * (3 - Math.sqrt(5));
				return [Math.cos(t) * r, y, Math.sin(t) * r];
			}),
		[items],
	);
	useEffect(() => {
		const el = ref.current!;
		const nodes = Array.from(el.children) as HTMLElement[];
		let ax = 0.3,
			ay = 0,
			raf = 0,
			on = false,
			R = el.clientWidth * 0.42;
		// Cached outside the loop for the same reason as VelocityBand: no layout reads after writes.
		const ro = new ResizeObserver(() => (R = el.clientWidth * 0.42));
		ro.observe(el);
		const loop = () => {
			if (!on) return;
			const px = Math.abs(motionState.pointerX) > 1 ? 0 : motionState.pointerX;
			const py = Math.abs(motionState.pointerY) > 1 ? 0 : motionState.pointerY;
			ay += 0.003 + px * 0.008;
			ax += (py * 0.6 - ax) * 0.02;
			const [sx, cx, sy, cy] = [Math.sin(ax), Math.cos(ax), Math.sin(ay), Math.cos(ay)];
			points.forEach(([x, y, z], i) => {
				const x1 = x * cy + z * sy;
				const z1 = -x * sy + z * cy;
				const y2 = y * cx - z1 * sx;
				const z2 = y * sx + z1 * cx;
				const depth = (z2 + 1) / 2;
				const n = nodes[i];
				n.style.transform = `translate(-50%,-50%) translate3d(${x1 * R}px,${y2 * R}px,0) scale(${0.6 + depth * 0.6})`;
				n.style.opacity = String(0.2 + depth * 0.8);
				n.style.zIndex = String(Math.round(depth * 100));
			});
			raf = requestAnimationFrame(loop);
		};
		const io = new IntersectionObserver(([e]) => {
			on = e.isIntersecting;
			cancelAnimationFrame(raf);
			if (on) raf = requestAnimationFrame(loop);
		});
		io.observe(el);
		return () => {
			cancelAnimationFrame(raf);
			io.disconnect();
			ro.disconnect();
		};
	}, [points]);
	return (
		<div ref={ref} className="relative mx-auto aspect-square w-full max-w-[540px]" aria-hidden>
			{items.map((s) => (
				<span
					key={s.name}
					className={`sd3-orb-tag absolute top-1/2 left-1/2 font-mono text-[12px] whitespace-nowrap md:text-[14px] ${highlight === null || highlight === s.group ? 'is-on' : 'is-off'}`}
				>
					{s.name}
				</span>
			))}
		</div>
	);
}

export function Skills() {
	const [hl, setHl] = useState<number | null>(null);
	const items = useMemo(() => skillGroups.flatMap((g, gi) => g.items.map((name) => ({ name, group: gi }))), []);
	return (
		<Section id="skills" scene={4} index="04">
			<div className={wrap}>
				<SectionHead index="04" kicker="Toolkit" title="THE STACK." />
				<div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
					<div className="flex flex-col gap-3">
						{skillGroups.map((g, i) => (
							<Rise key={g.name} i={i}>
								<button
									type="button"
									onMouseEnter={() => setHl(i)}
									onMouseLeave={() => setHl(null)}
									onFocus={() => setHl(i)}
									onBlur={() => setHl(null)}
									onClick={() => setHl((h) => (h === i ? null : i))}
									className={`sd3-panel ${i % 2 ? 'is-alt' : ''} w-full p-5 text-left transition-transform duration-300 ${hl === i ? 'translate-x-3' : ''}`}
								>
									<div className="flex items-center justify-between">
										<h3 className={`sd3-display text-[22px] transition-colors ${hl === i ? 'text-(--sd-green)' : ''}`}>
											{g.name}
										</h3>
										<span className="font-mono text-[12px] text-(--sd-violet)">{String(g.items.length).padStart(2, '0')}</span>
									</div>
								</button>
							</Rise>
						))}
					</div>
					<SkillSphere items={items} highlight={hl} />
				</div>
			</div>
		</Section>
	);
}

/* ────────────────────────── Education ───────────────────────── */

export function Education() {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'start 35%'] });
	// Scrubbed chamfer wipe: the panel is cut open from the left as it climbs the viewport.
	const clipPath = useTransform(scrollYProgress, (v) => {
		const w = Math.min(v * 1.15, 1) * 100;
		return `polygon(0 0, ${w}% 0, ${Math.max(w - 6, 0)}% 100%, 0 100%)`;
	});
	const e = education;
	return (
		<Section id="education" scene={5} index="05">
			<div className={wrap}>
				<SectionHead index="05" kicker="Education" title="WHERE IT STARTED." />
				<motion.div ref={ref} style={{ clipPath }}>
					<div className="sd3-panel p-6 md:p-12">
						<div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
							<div>
								<div className="font-mono text-[12px] tracking-[0.25em] text-(--sd-green) uppercase">{e.period}</div>
								<h3 className="sd3-display mt-4 text-[30px] leading-tight md:text-[48px]">{e.degree}</h3>
								<p className="mt-3 text-[17px] text-white/70">
									{e.school}, {e.place}
								</p>
								<div className="mt-8 font-mono text-[11px] tracking-[0.25em] text-white/40 uppercase">Coursework</div>
								<div className="mt-3 flex flex-wrap gap-2">
									{e.coursework.map((c) => (
										<span key={c} className="sd3-chip">
											{c}
										</span>
									))}
								</div>
							</div>
							<div>
								<div className="font-mono text-[11px] tracking-[0.25em] text-white/40 uppercase">On campus</div>
								<ul className="mt-4 space-y-4">
									{e.activities.map((a, i) => (
										<Rise key={a.role} i={i}>
											<li className="border-l-2 border-(--sd-purple) pl-4">
												<div className="sd3-display text-[18px]">{a.role}</div>
												<div className="font-mono text-[12px] text-(--sd-violet)">{a.org}</div>
												<div className="mt-1 text-[14px] text-white/55">{a.note}</div>
											</li>
										</Rise>
									))}
								</ul>
								{e.certifications.length > 0 && (
									<>
										<div className="mt-8 font-mono text-[11px] tracking-[0.25em] text-white/40 uppercase">Certifications</div>
										<ul className="mt-3 space-y-2 text-[14px] text-white/70">
											{e.certifications.map((c) => (
												<li key={c.name}>
													{c.url ? (
														<a href={c.url} target="_blank" rel="noreferrer" className="sd3-link">
															{c.name}
														</a>
													) : (
														c.name
													)}{' '}
													<span className="text-white/40">· {c.authority}</span>
												</li>
											))}
										</ul>
									</>
								)}
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</Section>
	);
}

/* ────────────────────────── Timeline ────────────────────────── */

// Deterministic short "commit hash" so the log looks real and stays stable across builds.
const hash = (s: string) => {
	let h = 0x811c9dc5;
	for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
	return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
};

const BRANCH_COLOR: Record<string, string> = {
	work: 'var(--sd-green)',
	hackathon: '#ffb020',
	build: 'var(--sd-violet)',
	education: '#3ad3ff',
	lead: '#ff5fa2',
	design: '#c084fc',
};

export function Timeline() {
	const branches = useMemo(() => ['all', ...new Set(journey.map((j) => j.branch))], []);
	const [branch, setBranch] = useState('all');
	const shown = journey.filter((j) => branch === 'all' || j.branch === branch);
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
	const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

	return (
		<Section id="timeline" scene={6} index="06">
			<div className={wrap}>
				<SectionHead index="06" kicker="git log --graph" title="THE JOURNEY." />
				<div className="mb-8 flex flex-wrap gap-2 font-mono text-[12px]">
					<LayoutGroup>
						{branches.map((b) => (
							<button
								key={b}
								type="button"
								onClick={() => setBranch(b)}
								aria-pressed={branch === b}
								className={`relative px-4 py-1.5 transition-colors [clip-path:polygon(6px_0,100%_0,calc(100%-6px)_100%,0_100%)] ${branch === b ? 'text-black' : 'bg-white/5 text-white/60 hover:text-white'}`}
							>
								{branch === b && (
									<motion.span
										layoutId="branch-pill"
										className="absolute inset-0"
										style={{ background: BRANCH_COLOR[b] ?? 'var(--sd-green)' }}
									/>
								)}
								<span className="relative">{b === 'all' ? '* all' : b}</span>
							</button>
						))}
					</LayoutGroup>
				</div>

				<div ref={ref} className="sd3-panel relative p-5 md:p-10">
					<div className="absolute top-10 bottom-10 left-[33px] w-[2px] bg-white/10 md:left-[58px]" />
					<motion.div
						style={{ scaleY: fill }}
						className="absolute top-10 bottom-10 left-[32px] w-[4px] origin-top bg-gradient-to-b from-(--sd-green) to-(--sd-purple) md:left-[57px]"
					/>
					<motion.ol layout className="relative flex flex-col">
						<AnimatePresence initial={false}>
							{shown.map((j, i) => {
								const color = BRANCH_COLOR[j.branch] ?? 'var(--sd-green)';
								return (
									<motion.li
										layout
										key={j.text}
										initial={{ opacity: 0, x: -30 }}
										whileInView={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: 30 }}
										viewport={{ once: true, margin: '-5% 0px' }}
										transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
										className="group relative grid grid-cols-[28px_1fr] items-center gap-4 py-3 md:grid-cols-[40px_1fr] md:gap-6"
									>
										<span
											className="relative z-10 h-4 w-4 justify-self-center transition-transform group-hover:scale-150 [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]"
											style={{ background: color }}
										/>
										<div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
											<span className="font-mono text-[12px] text-[#ffb020]">{hash(j.text)}</span>
											<span className="font-mono text-[12px] text-white/40">{j.year}</span>
											<span className="text-[16px] text-white/85 md:text-[18px]">{j.text}</span>
											<span className="font-mono text-[11px]" style={{ color }}>
												({j.branch})
											</span>
										</div>
									</motion.li>
								);
							})}
						</AnimatePresence>
					</motion.ol>
					<p className="relative mt-4 pl-11 font-mono text-[12px] text-white/35 md:pl-[66px]">
						(HEAD → main) still committing.
					</p>
				</div>
			</div>
		</Section>
	);
}

/* ─────────────────────────── Contact ─────────────────────────── */

function Clock() {
	const [t, setT] = useState('--:--:--');
	useEffect(() => {
		const f = new Intl.DateTimeFormat('en-GB', {
			timeZone: 'Asia/Kolkata',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		});
		const tick = () => setT(f.format(new Date()));
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	}, []);
	return <span>{t} IST</span>;
}

// No server on GitHub Pages: the form composes the email and hands it to the visitor's mail app.
function ContactForm() {
	const [sent, setSent] = useState(false);
	return (
		<form
			className="sd3-panel flex flex-col gap-4 p-6 md:p-8"
			onSubmit={(e) => {
				e.preventDefault();
				const f = new FormData(e.currentTarget);
				const subject = `Portfolio: ${f.get('subject') || 'Hello'} from ${f.get('name')}`;
				const body = `${f.get('message')}\n\n— ${f.get('name')} (${f.get('email')})`;
				window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
				setSent(true);
			}}
		>
			<div className="font-mono text-[11px] tracking-[0.25em] text-(--sd-green) uppercase">› transmit message</div>
			<div className="grid gap-4 sm:grid-cols-2">
				<label className="block">
					<span className="sr-only">Name</span>
					<input name="name" required autoComplete="name" placeholder="Your name" className="sd3-field" />
				</label>
				<label className="block">
					<span className="sr-only">Email</span>
					<input
						name="email"
						type="email"
						required
						autoComplete="email"
						placeholder="you@company.com"
						className="sd3-field"
					/>
				</label>
			</div>
			<label className="block">
				<span className="sr-only">Subject</span>
				<input name="subject" placeholder="What's it about?" className="sd3-field" />
			</label>
			<label className="block">
				<span className="sr-only">Message</span>
				<textarea
					name="message"
					required
					rows={5}
					placeholder="Tell me about the project, role or idea…"
					className="sd3-field resize-none"
				/>
			</label>
			<button type="submit" className="sd3-btn sd3-btn-primary self-start">
				Send message →
			</button>
			{sent && (
				<p className="font-mono text-[12px] text-white/60" role="status">
					Your mail app should open with the message ready. Nothing happened? Write to {profile.email}.
				</p>
			)}
		</form>
	);
}

export function Contact() {
	return (
		<Section id="contact" scene={7} index="07">
			<div className={wrap}>
				<SectionHead index="07" kicker="Contact" title="LET'S BUILD." />
				<div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
					<Rise>
						<p className="text-[20px] leading-relaxed text-white/80 md:text-[24px]">
							Agents, AI platforms, or something ambitious that needs a full-stack engineer? Send a message.
						</p>
						<a
							href={`mailto:${profile.email}`}
							className="sd3-display mt-8 block text-[clamp(17px,2.1vw,28px)] break-all text-(--sd-green) hover:text-white"
						>
							{profile.email}
						</a>
						<div className="mt-8 flex flex-wrap gap-3">
							{profile.links.map((l) => (
								<a
									key={l.label}
									href={l.href}
									target="_blank"
									rel="noreferrer"
									className="sd3-btn sd3-btn-ghost !px-4 !py-2.5 !text-[11px]"
								>
									{l.label} ↗
								</a>
							))}
						</div>
						<p className="mt-8 flex items-center gap-3 font-mono text-[12px] text-white/45">
							<span className="sd3-pulse h-2 w-2 bg-(--sd-green)" />
							{profile.location} · <Clock />
						</p>
					</Rise>
					<Rise i={1}>
						<ContactForm />
					</Rise>
				</div>
			</div>
		</Section>
	);
}
