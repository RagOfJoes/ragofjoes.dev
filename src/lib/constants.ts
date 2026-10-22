import type { Transition, Variants } from "motion/react";

import type { ImageViewerPopupProps } from "@/components/image-viewer";

export const SITE = {
	name: "Victor Ragojos",
	jobTitle: "Senior Software Engineer",
	description:
		"Portfolio of Victor Ragojos, a senior software engineer in San Francisco focused on frontend engineering, design, and the systems behind thoughtful products.",
	url: "https://www.ragofjoes.dev",
} as const;

/** Widths `pnpm images` writes thumbnails of each image at, for `srcset`. */
export const IMAGE_WIDTHS = [640, 1280];

/** How windows and panels open and close, and move when reset. */
export const PANEL_ANIMATIONS = {
	/** Delay (s) between windows and panels opening one after another after the intro. */
	stagger: 0.07,
	transition: { duration: 0.15, ease: "easeOut" } satisfies Transition,
	/** Zoom in to open and out to close; hidden while closed. */
	variants: {
		open: { opacity: 1, scale: 1, visibility: "visible" },
		closed: { opacity: 0, scale: 0.9, transitionEnd: { visibility: "hidden" } },
	} satisfies Variants,
} as const;

/** Jiji's photos, for his gallery in the About window. */
export const JIJI_PHOTOS: ImageViewerPopupProps[] = [
	{
		alt: "Film critic Jiji",
		src: "/jiji/jiji-17.jpg",
		height: 3840,
		width: 2160,
	},
	{
		alt: "Flatbread Jiji",
		src: "/jiji/jiji-18.jpg",
		height: 2160,
		width: 2160,
	},
	{
		alt: "Baby Jiji",
		src: "/jiji/jiji-1.jpg",
		height: 1008,
		width: 1344,
	},
	{
		alt: "Sitting Jiji",
		src: "/jiji/jiji-2.jpg",
		height: 1344,
		width: 1008,
	},
	{
		alt: "Oblivious Jiji",
		src: "/jiji/jiji-5.jpg",
		height: 1344,
		width: 1008,
	},
	{
		alt: "Why she look like that?",
		src: "/jiji/jiji-6.jpg",
		height: 1344,
		width: 1008,
	},
	{
		alt: "Window Jiji",
		src: "/jiji/jiji-7.jpg",
		height: 2016,
		width: 1512,
	},
	{
		alt: "Bookworm Jiji",
		src: "/jiji/jiji-8.jpg",
		height: 1344,
		width: 1008,
	},
	{
		alt: "Hunter Jiji",
		src: "/jiji/jiji-9.jpg",
		height: 1344,
		width: 756,
	},
	{
		alt: "Hotdog Jiji",
		src: "/jiji/jiji-10.jpg",
		height: 1344,
		width: 756,
	},
	{
		alt: "Bed Monster Jiji",
		src: "/jiji/jiji-12.jpg",
		height: 1512,
		width: 1512,
	},
	{
		alt: "Puppy Eyes Jiji",
		src: "/jiji/jiji-13.jpg",
		height: 1344,
		width: 756,
	},
	{
		alt: "Eepy Jiji",
		src: "/jiji/jiji-14.jpg",
		height: 1512,
		width: 1512,
	},
	{
		alt: "Angry Jiji",
		src: "/jiji/jiji-16.jpg",
		height: 1512,
		width: 1512,
	},
];

/**
 * The resume, shared by the `/resume` page and the home page's Experience
 * window. Keep in step with the PDF (`pdf`), which is still made by hand.
 */
export const RESUME = {
	pdf: "/Victor-Ragojos-Resume.pdf",

	contact: {
		email: "jobs@ragofjoes.dev",
		location: "San Francisco, CA",
		links: [
			{ label: "LinkedIn", href: "https://linkedin.com/in/ragofjoes" },
			{ label: "GitHub", href: "https://github.com/RagOfJoes" },
		],
	},

	// Most recent first, and each company's roles too
	experience: [
		{
			name: "SenseMesh",
			location: "Palo Alto, CA",
			// What the company does, in a line (optional)
			description:
				"Early-stage security technology startup developing AI-powered monitoring software for cameras and drones",
			roles: [
				{
					title: "Lead Frontend Engineer",
					dates: "Feb 2025 - Aug 2026",
					highlights: [
						"Architected a React SPA, establishing reusable data-fetching patterns and type-safe API integrations adopted by other engineers.",
						"Introduced Storybook across the application, enabling designers to independently explore components, refine interactions, and collaborate on UI development.",
						"Built the primary chat-first interface using LLM tool calling, enabling natural-language detection searches and security workflows with seamless transitions to traditional forms for refinement.",
						"Developed a video pipeline using NATS, FFmpeg, and LL-HLS, enabling low-latency browser playback and on-demand viewing through Google Cloud Storage.",
						"Established the initial gRPC architecture using Protocol Buffers and Envoy, providing strongly typed APIs across frontend and backend services.",
						"Integrated Ory for identity management and implemented RBAC with tenant-scoped data access across public and internal services.",
					],
				},
			],
		},
		{
			name: "Offset Partners",
			location: "Napa, CA",
			description:
				"Digital agency building custom websites, e-commerce experiences, and content management software for wineries",
			roles: [
				{
					title: "Senior Software Engineer",
					dates: "May 2021 - Oct 2024",
					highlights: [
						"Rebuilt and redesigned the product dashboard in React, launching a block-based CMS adopted by new and existing winery clients.",
						"Modernized a legacy PHP/jQuery frontend with Webpack and route-aware asset loading, reducing build times by ~80% and eliminating unnecessary JavaScript delivery.",
						"Refactored an in-house PHP MVC framework, restructuring application routing and shared utilities while consolidating duplicated code.",
						"Optimized MySQL queries within a legacy data architecture, improving API response times by ~50%.",
					],
				},
				{
					title: "Junior Software Engineer",
					dates: "Jul 2019 - May 2021",
					highlights: [
						"Replaced FTP-based development workflows with Dockerized local environments and GitHub Actions CI, enabling independent development and automated code-quality checks.",
						"Collaborated with winery stakeholders and designers to translate business requirements into customer-facing interfaces.",
					],
				},
			],
		},
		{
			name: "Napa Valley College",
			location: "Napa, CA",
			// On the home page's Experience window, but left off the resume
			isHiddenOnResume: true,
			roles: [
				{
					title: "Computer Science Tutor",
					dates: "Aug 2018 - May 2019",
					highlights: [
						"Tutored students in programming fundamentals, algorithms, and computer science coursework.",
						"Collaborated with faculty to support students with assignments, projects, and exam preparation.",
					],
				},
			],
		},
	],

	skills: [
		{ label: "Languages", items: ["TypeScript", "JavaScript", "Go", "PHP", "SQL", "Swift", "Lua"] },
		{
			label: "Frontend",
			items: [
				"React",
				"TanStack Query",
				"TanStack Router",
				"TanStack Start",
				"Next.js",
				"Remix",
				"Vue",
				"Storybook",
				"Vite",
				"Webpack",
				"Tailwind CSS",
				"SCSS",
				"Less",
				"CSS",
				"HTML",
			],
		},
		{ label: "Backend", items: ["Node.js", "gRPC", "ConnectRPC", "GraphQL"] },
		{
			label: "Data & Infrastructure",
			items: [
				"PostgreSQL",
				"MySQL",
				"MongoDB",
				"Redis",
				"Docker",
				"Kubernetes",
				"Terraform",
				"Pulumi",
			],
		},
		{
			label: "Tooling & Observability",
			items: ["GitHub Actions", "OpenTelemetry", "Grafana", "VictoriaMetrics"],
		},
	],
};
