import Link from 'next/link';
import type { Metadata } from 'next';
import ProjectCover from '@/components/portfolio/ProjectCover';
import { Rise, SectionHead } from '@/components/portfolio/ui';
import { projects } from '@/lib/data/portfolio';

export const metadata: Metadata = {
	title: 'Projects · Suman Debnath',
	description: 'AI platforms, MCP servers, agent runtimes, commerce backends and apps built by Suman Debnath.',
};

const ProjectsIndex = () => (
	<main data-scene={3} className="mx-auto w-full max-w-[1200px] px-5 pt-36 pb-20 md:px-8">
		<SectionHead index="//" kicker="Archive" title="ALL PROJECTS." />
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{projects.map((p, i) => (
				<Rise key={p.slug} i={i % 3}>
					<Link href={`/projects/${p.slug}/`} className="group block h-full">
						<div className={`sd3-panel ${i % 2 ? 'is-alt' : ''} flex h-full flex-col p-3`}>
							<ProjectCover
								p={p}
								className="aspect-[16/10] w-full transition-transform duration-700 group-hover:scale-[1.03]"
							/>
							<div className="flex flex-1 flex-col p-3 pt-5">
								<div className="flex justify-between font-mono text-[11px] tracking-[0.2em] uppercase">
									<span className="text-(--sd-violet)">{String(i + 1).padStart(2, '0')}</span>
									<span className="text-white/40">{p.year}</span>
								</div>
								<h2 className="sd3-display mt-3 text-[26px] leading-none transition-colors group-hover:text-(--sd-green)">
									{p.name}
								</h2>
								<p className="mt-2 font-mono text-[12px] text-(--sd-green)/80">{p.kicker}</p>
								<p className="mt-3 flex-1 text-[14px] leading-relaxed text-white/60">{p.blurb}</p>
							</div>
						</div>
					</Link>
				</Rise>
			))}
		</div>
	</main>
);

export default ProjectsIndex;
