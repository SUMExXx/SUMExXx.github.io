import Image from 'next/image';
import type { Project } from '@/lib/data/portfolio';

/**
 * Real screenshot when one exists; otherwise a blueprint card drawn from the project's own data
 * (name + pipeline), so no project ever shows a fake or stock image.
 */
export default function ProjectCover({
	p,
	priority = false,
	className = '',
}: {
	p: Project;
	priority?: boolean;
	className?: string;
}) {
	if (p.images[0])
		return (
			<div className={`relative overflow-hidden bg-black ${className}`}>
				<Image
					src={p.images[0]}
					alt={`${p.name} screenshot`}
					fill
					priority={priority}
					sizes="(max-width: 768px) 90vw, 50vw"
					className="object-cover"
				/>
			</div>
		);
	const nodes = p.system ?? p.stack;
	return (
		<div
			className={`relative overflow-hidden ${className}`}
			style={{
				backgroundColor: '#06030c',
				backgroundImage:
					'linear-gradient(rgba(175,139,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(175,139,255,.08) 1px, transparent 1px)',
				backgroundSize: '28px 28px',
			}}
			aria-hidden
		>
			<div
				className="absolute inset-0"
				style={{
					background:
						p.accent === 'green'
							? 'radial-gradient(70% 80% at 85% 15%, rgba(55,247,19,.2), transparent 60%)'
							: 'radial-gradient(70% 80% at 85% 15%, rgba(155,44,240,.32), transparent 60%)',
				}}
			/>
			<div className="absolute top-4 left-5 font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
				Blueprint · Rev A
			</div>
			<div className="absolute right-5 bottom-4 left-5 flex flex-wrap gap-1.5">
				{nodes.slice(0, 6).map((n, i) => (
					<span key={n} className="flex items-center gap-1.5 font-mono text-[10px] text-white/70 md:text-[11px]">
						<span className="bg-white/5 px-2 py-1 [clip-path:polygon(5px_0,100%_0,calc(100%-5px)_100%,0_100%)]">{n}</span>
						{i < Math.min(nodes.length, 6) - 1 && <span className="text-(--sd-green)">→</span>}
					</span>
				))}
			</div>
			<div className="sd3-display absolute top-1/2 left-5 -translate-y-1/2 text-[44px] leading-none text-transparent [-webkit-text-stroke:1px_rgba(175,139,255,.6)] md:text-[64px]">
				{p.name}
			</div>
		</div>
	);
}

export function SystemView({ nodes }: { nodes: string[] }) {
	return (
		<div className="relative flex flex-col">
			{nodes.map((n, i) => (
				<div key={n} className="relative flex items-center gap-4">
					<div className="flex flex-col items-center self-stretch">
						<span className="sd3-sys-dot" />
						{i < nodes.length - 1 && <span className="sd3-sys-wire" style={{ animationDelay: `${i * 0.25}s` }} />}
					</div>
					<div className="mb-3 flex flex-1 items-center justify-between bg-white/[0.04] px-4 py-2.5 font-mono text-[13px] [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]">
						<span className="text-white/85">{n}</span>
						<span className="text-(--sd-violet)">{String(i + 1).padStart(2, '0')}</span>
					</div>
				</div>
			))}
		</div>
	);
}
