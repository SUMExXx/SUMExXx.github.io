import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import BlogImageModal from '@/components/BlogImageModal';
import ProjectCover, { SystemView } from '@/components/portfolio/ProjectCover';
import { Rise, Scramble } from '@/components/portfolio/ui';
import { projects } from '@/lib/data/portfolio';
import { website } from '@/lib/data/website';

// Static export: one page per project at build time; unknown slugs 404.
export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

type Props = { params: Promise<{ slug: string }> };

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
	const { slug } = await params;
	const p = projects.find((x) => x.slug === slug)!;
	return {
		title: `${p.name} · Suman Debnath`,
		description: p.blurb,
		openGraph: {
			title: p.name,
			description: p.blurb,
			url: `${website.url}/projects/${p.slug}/`,
			images: p.images[0] ? [{ url: website.url + p.images[0] }] : undefined,
		},
	};
};

// Each project page gets its own particle shape, picked deterministically from the slug.
const sceneFor = (slug: string) => [...slug].reduce((a, c) => a + c.charCodeAt(0), 0) % 8;

const ProjectPage = async ({ params }: Props) => {
	const { slug } = await params;
	const i = projects.findIndex((x) => x.slug === slug);
	const p = projects[i];
	const next = projects[(i + 1) % projects.length];
	const prev = projects[(i - 1 + projects.length) % projects.length];
	const facts = [
		['Year', p.year],
		['Role', p.role],
		['Type', p.kicker],
	].filter(([, v]) => v);

	return (
		<main data-scene={sceneFor(p.slug)} className="mx-auto w-full max-w-[1200px] px-5 pt-32 pb-16 md:px-8">
			<Link href="/projects/" className="sd3-link font-mono text-[12px] tracking-[0.2em] uppercase">
				← All projects
			</Link>

			<header className="mt-8">
				<span className="sd3-tab font-mono text-[11px] tracking-[0.3em] uppercase">
					<span className="text-(--sd-green)">Fig. {String(i + 1).padStart(2, '0')}</span>
					{p.kicker}
				</span>
				<div className="sd3-tab-rule" />
				<h1 className="sd3-display mt-6 text-[48px] leading-[0.9] md:text-[120px]">
					<Scramble text={p.name} />
				</h1>
				<p className="mt-6 max-w-[760px] text-[19px] leading-relaxed text-white/75 md:text-[22px]">{p.blurb}</p>
				<div className="mt-8 flex flex-wrap gap-3">
					{p.link && (
						<a href={p.link} target="_blank" rel="noreferrer" className="sd3-btn sd3-btn-primary">
							Live site ↗
						</a>
					)}
					{p.repo && (
						<a href={p.repo} target="_blank" rel="noreferrer" className="sd3-btn sd3-btn-ghost">
							Source ↗
						</a>
					)}
				</div>
			</header>

			<Rise className="mt-14">
				<div className="sd3-hud">
					{p.images[0] ? (
						<BlogImageModal src={p.images[0]} alt={`${p.name} screenshot`}>
							<div className="relative aspect-[16/9] w-full cursor-zoom-in overflow-hidden bg-black">
								<Image
									src={p.images[0]}
									alt={`${p.name} screenshot`}
									fill
									priority
									sizes="(max-width: 1200px) 100vw, 1200px"
									className="object-contain"
								/>
							</div>
						</BlogImageModal>
					) : (
						<ProjectCover p={p} className="aspect-[16/9] w-full md:aspect-[21/8]" />
					)}
				</div>
			</Rise>

			<div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
				<Rise>
					<h2 className="font-mono text-[12px] tracking-[0.3em] text-(--sd-green) uppercase">› What it does</h2>
					<ul className="mt-6 space-y-5">
						{p.points.map((pt) => (
							<li key={pt} className="flex gap-4 text-[17px] leading-relaxed text-white/75">
								<span className="mt-[10px] h-2 w-2 shrink-0 rotate-45 bg-(--sd-green)" />
								{pt}
							</li>
						))}
					</ul>
				</Rise>
				<Rise i={1}>
					<div className="sd3-panel is-alt p-6 md:p-8">
						<dl className="grid gap-4">
							{facts.map(([k, v]) => (
								<div key={k} className="flex justify-between gap-6 border-b border-white/10 pb-3">
									<dt className="font-mono text-[11px] tracking-[0.25em] text-white/40 uppercase">{k}</dt>
									<dd className="text-right text-[14px] text-white/85">{v}</dd>
								</div>
							))}
						</dl>
						{p.stack.length > 0 && (
							<>
								<div className="mt-6 font-mono text-[11px] tracking-[0.25em] text-white/40 uppercase">Stack</div>
								<div className="mt-3 flex flex-wrap gap-2">
									{p.stack.map((s) => (
										<span key={s} className="sd3-chip">
											{s}
										</span>
									))}
								</div>
							</>
						)}
					</div>
				</Rise>
			</div>

			{p.system && (
				<Rise className="mt-20">
					<h2 className="font-mono text-[12px] tracking-[0.3em] text-(--sd-green) uppercase">› System · Blueprint Rev A</h2>
					<div className="mt-6 max-w-[640px]">
						<SystemView nodes={p.system} />
					</div>
				</Rise>
			)}

			{p.images.length > 1 && (
				<section className="mt-20">
					<h2 className="font-mono text-[12px] tracking-[0.3em] text-(--sd-green) uppercase">› Gallery</h2>
					<div className="mt-6 grid gap-6 sm:grid-cols-2">
						{p.images.slice(1).map((src, k) => (
							<Rise key={src} i={k}>
								<BlogImageModal src={src} alt={`${p.name} screenshot ${k + 2}`}>
									<div className="sd3-panel cursor-zoom-in p-2">
										<div className="relative aspect-[16/10] overflow-hidden bg-black">
											<Image
												src={src}
												alt={`${p.name} screenshot ${k + 2}`}
												fill
												sizes="(max-width: 640px) 100vw, 50vw"
												className="object-cover"
											/>
										</div>
									</div>
								</BlogImageModal>
							</Rise>
						))}
					</div>
				</section>
			)}

			<nav className="mt-24 grid gap-4 sm:grid-cols-2" aria-label="More projects">
				{[
					['← Previous', prev],
					['Next →', next],
				].map(([label, q]) => {
					const proj = q as typeof p;
					return (
						<Link key={label as string} href={`/projects/${proj.slug}/`} className="group">
							<div className="sd3-panel p-6">
								<div className="font-mono text-[11px] tracking-[0.25em] text-white/40 uppercase">{label as string}</div>
								<div className="sd3-display mt-2 text-[28px] transition-colors group-hover:text-(--sd-green)">{proj.name}</div>
							</div>
						</Link>
					);
				})}
			</nav>
		</main>
	);
};

export default ProjectPage;
