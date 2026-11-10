// Sources: resume (public/docs/SumanDebnathResumeV9.pdf), public GitHub repos, the Snapdragon hackathon
// write-up, and — once imported — the LinkedIn data export (scripts/import-linkedin.mjs → linkedin.json).
import linkedinJson from './linkedin.json';

type LinkedInData = {
	projects?: { title: string; description: string; url: string; start: string; end: string }[];
	certifications?: { name: string; authority: string; url: string; date: string }[];
	skills?: string[];
};
const linkedin = linkedinJson as LinkedInData;

export const profile = {
	name: 'Suman Debnath',
	handle: 'SUMExXx',
	role: 'Full-Stack AI Platform Engineer',
	roles: ['AI Platform Engineer', 'MCP & Agent Builder', 'Spring Boot Backend Engineer', 'Next.js Frontend Engineer'],
	location: 'Indore, India',
	tagline: 'I build agent platforms, MCP servers and fast full-stack products.',
	summary:
		'I build production-grade AI platforms and cloud-native backends: MCP servers, LangGraph agents and Spring AI services on Java and Python microservices, with React and Next.js frontends that feel instant. I also handle database design, containers, CI/CD, AWS deployments and observability.',
	resume: '/docs/SumanDebnathResumeV9.pdf',
	email: 'sumandebnath4ever@gmail.com',
	links: [
		{ label: 'GitHub', href: 'https://github.com/SUMExXx' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/suman-debnath6' },
		{ label: 'LeetCode', href: 'https://leetcode.com/u/sumexxx' },
		{ label: 'X', href: 'https://x.com/sumex_in' },
		{ label: 'Instagram', href: 'https://www.instagram.com/sumex.in' },
	],
};

export const stats = [
	{ value: 24, suffix: '', label: 'MCP tools in one server' },
	{ value: 50, suffix: '%', label: 'API latency cut' },
	{ value: 6, suffix: '', label: 'Modules automated by agents' },
	{ value: 30, suffix: '+', label: 'Repos shipped' },
];

export type Role = { title: string; org: string; period: string; points: string[]; tags: string[] };

export const experience: Role[] = [
	{
		title: 'Software Engineer',
		org: 'Ascentt AITek · Indore',
		period: 'May 2025 — Now',
		points: [
			'Agent-callable FastAPI + FastMCP services that automate multi-step workflows across 5–6 Orbis modules.',
			'A Temporal-backed Rule Engine with user-defined rules, side effects, versioning, retries and fault tolerance.',
			'APIs, data models and shared React / Next.js components for project, resource, timesheet and contract management.',
			'Architecture reviews, AWS incident ownership, CI/CD and Grafana observability.',
		],
		tags: ['FastAPI', 'FastMCP', 'Temporal', 'PostgreSQL', 'Next.js', 'AWS'],
	},
	{
		title: 'Trainee Engineer',
		org: 'Ascentt AITek · Indore',
		period: 'Feb — May 2025',
		points: ['Backend integrations and React components for the Agent AI platform. First PR merged in sprint one.'],
		tags: ['React', 'Next.js', 'REST'],
	},
	{
		title: 'UI/UX Designer',
		org: 'Indhan Paygate · SIF',
		period: '2022 — 2023',
		points: ['Designed the complete IndhanPay mobile app, its branding and its marketing assets.'],
		tags: ['Figma', 'Branding', 'Mobile UX'],
	},
];

export const education = {
	degree: 'B.Tech, Computer Science Engineering',
	school: 'Shri G. S. Institute of Technology and Science',
	place: 'Indore, India',
	period: 'Dec 2021 — Jun 2025',
	coursework: [
		'Data Structures & Algorithms',
		'OOP',
		'Operating Systems',
		'Machine Learning',
		'AI',
		'Web Development',
		'Agile',
	],
	activities: [
		{ role: 'Head of Web Development', org: 'E-Cell SGSITS', note: 'Built the official site and ran web for E-SUMMIT.' },
		{ role: 'Advisory Board Member', org: 'GS Production House', note: 'The college media club.' },
		{ role: 'Graphic Designer', org: 'Computer Club', note: 'Event visuals and branding.' },
	],
	certifications: linkedin.certifications ?? [],
};

export type Project = {
	slug: string;
	name: string;
	kicker: string;
	year: string;
	role: string;
	blurb: string;
	points: string[];
	stack: string[];
	images: string[];
	link?: string;
	repo?: string;
	accent: 'green' | 'purple';
	// Pipeline drawn as a node graph on the project page.
	system?: string[];
};

const img = (slug: string, n: number) => Array.from({ length: n }, (_, i) => `/images/projects/${slug}-${i + 1}.webp`);

const curated: Project[] = [
	{
		slug: 'recall',
		name: 'Recall',
		kicker: 'Qualcomm Snapdragon Multiverse Hackathon',
		year: 'Dec 2025',
		role: 'Hackathon team',
		blurb: 'A private AI memory you can talk to. It runs across your own devices and never sends anything to the cloud.',
		points: [
			'Spans a phone, a laptop and an Arduino Uno. It captures audio, text, browser content and images into one persistent memory.',
			'On-device inference through ONNX Runtime, accelerated by the Snapdragon NPU.',
			'Hybrid RAG keeps retrieval fast as context grows. If nothing matches, it says so instead of guessing.',
			'A single RECALL_BACKEND flag runs the same code on the NPU, on any laptop through Ollama, or fully offline.',
			'The hardest part: Python on Windows ARM64, where httptools, cryptography and sqlite-vec shipped no wheels.',
		],
		stack: ['Python', 'FastAPI', 'ONNX Runtime', 'Snapdragon NPU', 'Hybrid RAG', 'Arduino'],
		images: [],
		repo: 'https://github.com/SUMExXx/Recall',
		accent: 'green',
		system: [
			'Phone · audio',
			'Laptop · web, text, images',
			'Local capture',
			'Memory layer',
			'Hybrid RAG',
			'ONNX · Snapdragon NPU',
			'Arduino · ambient state',
		],
	},
	{
		slug: 'prepindia',
		name: 'PrepIndia',
		kicker: 'AI-native exam preparation platform',
		year: '2026 — Now',
		role: 'Solo · architecture to ops',
		blurb: 'An agentic content platform. LLMs ingest, structure and serve exam material through a guarded MCP surface.',
		points: [
			'Spring AI MCP server with 24 content tools behind API-key auth. Idempotent natural-key upserts make LLM ingestion safe to re-run.',
			'LangGraph agent with planning tools, parallel read-only subagents, human approval before writes, token budgets and Postgres-checkpointed resumable runs.',
			'Permission-scoped tools, prompt-injection guards, streamed run events, and Langfuse + OpenTelemetry tracing.',
			'Spring Boot, Next.js SSR, Elasticsearch and Redis on an Ansible-deployed VPS with Prometheus, Loki and Grafana.',
		],
		stack: ['Spring AI', 'MCP', 'LangGraph', 'Langfuse', 'Next.js', 'PostgreSQL', 'Elasticsearch', 'Redis', 'Ansible'],
		images: [],
		accent: 'purple',
		system: [
			'Next.js SSR',
			'LangGraph agent',
			'Human-in-the-loop gate',
			'Spring AI MCP · 24 tools',
			'Postgres + Elastic',
			'Grafana · Loki · Langfuse',
		],
	},
	{
		slug: 'openally',
		name: 'OpenAlly',
		kicker: 'Always-on AI orchestration runtime',
		year: '2026',
		role: 'Solo',
		blurb: 'An intelligent layer that sits above the operating system, not another chatbot window.',
		points: [
			'Cross-platform background service with a capability-driven plugin architecture declared in plugin.toml manifests.',
			'Every subsystem (LLM, speech, memory, planner, scheduler, connector) is an abstract contract resolved at run time.',
			'A desktop orb, CLI, mobile and browser clients all share one continuous runtime over gRPC.',
		],
		stack: ['Rust', 'tokio', 'gRPC / tonic', 'NATS', 'Plugins'],
		images: [],
		repo: 'https://github.com/SUMExXx/OpenAlly',
		accent: 'green',
		system: [
			'Desktop · CLI · mobile · browser',
			'gRPC / tonic',
			'Runtime kernel · tokio',
			'Event bus → NATS',
			'Capability plugins',
		],
	},
	{
		slug: 'sencoline',
		name: 'Sencoline',
		kicker: 'B2B commerce for a UAE trader',
		year: '2025 — Now',
		role: 'Backend lead',
		blurb: 'A production commerce backend handling hundreds of SKUs, quotations and orders.',
		points: [
			'Spring Boot with multithreading, Hibernate/JPA, migrations and advanced PostgreSQL search.',
			'Cut API latency by about 40–50% with Redis caching and tuned ORM access.',
			'An MCP server for AI-driven automation, an SSR Next.js admin, and Grafana monitoring on a VPS.',
		],
		stack: ['Spring Boot', 'Java', 'Hibernate', 'PostgreSQL', 'Redis', 'Next.js', 'MCP'],
		images: [],
		link: 'https://sencoline.vercel.app',
		accent: 'purple',
		system: ['Next.js admin (SSR)', 'Spring Boot API', 'Redis cache', 'PostgreSQL', 'MCP automation'],
	},
	{
		slug: 'firstox',
		name: 'Firstox Studio',
		kicker: '3D apparel mockup SaaS',
		year: '2025',
		role: 'Full-stack',
		blurb: 'Realistic 3D and 2D apparel mockups in the browser, with admin and affiliate panels and Dodo Payments.',
		points: [
			'Real-time 3D garment preview with adjustable animation, textures and backgrounds.',
			'Backend written in Express, then rebuilt in NestJS, covering admin, affiliate and payment flows.',
		],
		stack: ['Next.js', 'Three.js', 'NestJS', 'MongoDB', 'Dodo Payments'],
		images: img('firstox', 1),
		accent: 'green',
	},
	{
		slug: 'aione',
		name: 'AIOne',
		kicker: 'All-in-one AI desktop app',
		year: '2024',
		role: 'Solo',
		blurb: 'ChatGPT, Gemini and Claude in one desktop app, shipped as a Windows installer.',
		points: ['Electron, React and Webpack, packaged with Electron Forge, with a Dev Container workflow.'],
		stack: ['Electron', 'React', 'TypeScript', 'Webpack'],
		images: img('aione', 1),
		link: 'https://sumexxx.github.io/AIOne/',
		repo: 'https://github.com/SUMExXx/AIOne',
		accent: 'purple',
	},
	{
		slug: 'codemon',
		name: 'Codemon',
		kicker: 'Offline LAN coding arena',
		year: '2024',
		role: 'Full-stack',
		blurb: 'A C++ / Java playground and judge with test-case matching. It runs on a LAN server with no internet.',
		points: ['Separate Next.js client, API backend and sandboxed compilation server.'],
		stack: ['Next.js', 'Node.js', 'Express', 'Docker'],
		images: img('codemon', 3),
		repo: 'https://github.com/SUMExXx/codemon-next',
		accent: 'green',
		system: ['Next.js client', 'API backend', 'Compilation server', 'Test-case judge'],
	},
	{
		slug: 'story-splitter',
		name: 'Story Splitter',
		kicker: 'Flutter video tool',
		year: '2025',
		role: 'Solo',
		blurb: 'Splits long videos into social-ready clips with selectable durations and aspect ratios.',
		points: ['Production Flutter build with AdMob monetization and generated launcher icons.'],
		stack: ['Flutter', 'Dart', 'FFmpeg', 'AdMob'],
		images: [],
		repo: 'https://github.com/SUMExXx/Story-Splitter',
		accent: 'purple',
	},
	{
		slug: 'workup',
		name: 'WorkUp',
		kicker: 'Freelance services marketplace',
		year: '2024',
		role: 'Mobile + backend',
		blurb: 'Book nearby freelancers or post work for bids, with provider selection, work tracking and payments.',
		points: ['Flutter client with a Node.js backend.'],
		stack: ['Flutter', 'Node.js', 'MongoDB'],
		images: img('workup', 1),
		repo: 'https://github.com/SUMExXx/workup',
		accent: 'green',
	},
	{
		slug: 'gsph',
		name: 'GS Production House',
		kicker: 'Club showcase site',
		year: '2023',
		role: 'Design + build',
		blurb: 'Features, events, information and team for the SGSITS media club.',
		points: ['Next.js site with animated sections.'],
		stack: ['Next.js', 'Tailwind', 'Framer Motion'],
		images: img('gsph', 2),
		repo: 'https://github.com/SUMExXx/gsph-next',
		accent: 'purple',
	},
	{
		slug: 'foodhub',
		name: 'FoodHub',
		kicker: 'E-commerce suite',
		year: '2023',
		role: 'Full-stack',
		blurb: 'A storefront, an admin dashboard and a REST API, each deployed on its own.',
		points: ['Three apps: client, admin and API, with Cloudinary media.'],
		stack: ['React', 'Express', 'MongoDB', 'Cloudinary'],
		images: img('foodhub', 4),
		link: 'https://foodhub-five.vercel.app',
		repo: 'https://github.com/SUMExXx/foodhub',
		accent: 'green',
	},
	{
		slug: 'sharehub',
		name: 'ShareHub',
		kicker: 'File sharing platform',
		year: '2023',
		role: 'Full-stack',
		blurb: 'Upload-and-share with a web client, a mobile app and a backend.',
		points: ['Node.js backend with React and mobile clients.'],
		stack: ['React', 'Node.js', 'Express'],
		images: img('sharehub', 1),
		repo: 'https://github.com/SUMExXx/sharehub-app',
		accent: 'purple',
	},
];

const slugify = (s: string) =>
	s
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

// LinkedIn projects that aren't already curated above get their own page too.
const fromLinkedIn: Project[] = (linkedin.projects ?? [])
	.filter((p) => !curated.some((c) => c.slug === slugify(p.title) || slugify(c.name) === slugify(p.title)))
	.map((p, i) => ({
		slug: slugify(p.title),
		name: p.title,
		kicker: 'Project',
		year: [p.start, p.end].filter(Boolean).join(' — '),
		role: '',
		blurb: p.description.split(/(?<=\.)\s|\n/)[0] ?? '',
		points: p.description
			.split(/\n+|•/)
			.map((s) => s.trim())
			.filter(Boolean),
		stack: [],
		images: [],
		link: p.url || undefined,
		accent: i % 2 ? 'purple' : 'green',
	}));

export const projects: Project[] = [...curated, ...fromLinkedIn];

const curatedSkills = [
	{
		name: 'AI & Agents',
		items: [
			'MCP',
			'LangChain',
			'LangGraph',
			'Spring AI',
			'Multi-Agent',
			'HITL',
			'Langfuse',
			'OpenTelemetry',
			'ONNX',
			'RAG',
			'Claude',
			'Gemini',
		],
	},
	{
		name: 'Backend',
		items: [
			'Java',
			'Spring Boot',
			'Python',
			'FastAPI',
			'NestJS',
			'Node.js',
			'Kafka',
			'Temporal',
			'PostgreSQL',
			'MongoDB',
			'Redis',
			'Elasticsearch',
		],
	},
	{
		name: 'Frontend & Apps',
		items: [
			'TypeScript',
			'React',
			'Next.js',
			'Redux',
			'TanStack Query',
			'Three.js',
			'Tailwind',
			'Flutter',
			'Electron',
			'Figma',
		],
	},
	{
		name: 'Cloud & DevOps',
		items: [
			'AWS',
			'Docker',
			'Kubernetes',
			'Ansible',
			'Jenkins',
			'GitHub Actions',
			'Prometheus',
			'Grafana',
			'Loki',
			'Linux',
		],
	},
];
const known = new Set(curatedSkills.flatMap((g) => g.items.map((s) => s.toLowerCase())));
const extraSkills = (linkedin.skills ?? []).filter((s) => !known.has(s.toLowerCase()));
export const skillGroups = extraSkills.length
	? [...curatedSkills, { name: 'Also', items: extraSkills }]
	: curatedSkills;

// Milestones only; the detail lives in Experience, Education and the project pages.
export const journey = [
	{ year: '2026', branch: 'build', text: 'PrepIndia and OpenAlly go into development.' },
	{ year: '2025', branch: 'hackathon', text: 'Recall at the Qualcomm Snapdragon Multiverse Hackathon.' },
	{ year: '2025', branch: 'work', text: 'Software Engineer at Ascentt.' },
	{ year: '2025', branch: 'education', text: 'Graduated, B.Tech CSE.' },
	{ year: '2025', branch: 'work', text: 'Joined Ascentt as a trainee.' },
	{ year: '2023', branch: 'lead', text: 'Head of Web Development, E-Cell.' },
	{ year: '2022', branch: 'design', text: 'First design role at Indhan Paygate.' },
	{ year: '2021', branch: 'education', text: 'Started at SGSITS, Indore.' },
];
