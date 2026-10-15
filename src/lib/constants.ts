import dayjs from "dayjs";

import type { ProjectInfiniteScrollProps } from "@/components/project-infinite-scroll";
import type { WindowProps } from "@/components/windows";

export const PROJECTS: ProjectInfiniteScrollProps["project"][] = [
	{
		slug: "puzzlely",
		name: "Puzzlely",
		description:
			"A multiplayer word puzzle game inspired by NYT's Connections, featuring unlimited plays, custom puzzles, and daily challenges.",

		type: "Web Application",
		url: "https://puzzlely.io",
		source: "https://github.com/RagOfJoes/puzzlely",
		developer: "Victor Ragojos",
		stack: [
			"Typescript",
			"React",
			"Remix",
			"Go",
			"Traefik",
			"OAuth2",
			"PostgreSQL",
			"OpenTelemetry",
			"Docker",
			"DigitalOcean",
			"GitHub Actions",
		],

		images: [
			{
				alt: "Puzzlely Cover",
				src: "/puzzlely-cover.png",

				height: 2160,
				width: 3840,

				palette: ["#EBBDBD", "#2D2936", "#1E1B28", "#E8BBBA", "#EBBDBC"],
			},
			{
				alt: "Puzzlely Home Page",
				src: "/puzzlely-home-page.png",

				height: 2160,
				width: 3840,

				palette: ["#1A1825", "#15141F", "#333039", "#948888", "#1B1A27"],
			},
			{
				alt: "Puzzlely User Page",
				src: "/puzzlely-user-page.png",

				height: 2160,
				width: 3840,

				palette: ["#1A1825", "#15141F", "#333039", "#948888", "#1B1A27"],
			},
			{
				alt: "Puzzlely Create Page",
				src: "/puzzlely-create-page.png",

				height: 2160,
				width: 3840,

				palette: ["#1A1825", "#15141F", "#333039", "#948888", "#1B1A27"],
			},
		],
	},
];

export const ROUTES = [
	{ description: "Go to home page", href: "/", slug: "", title: "Home" },
	{
		description: "Go to projects page",
		href: "/projects/",
		slug: "projects",
		title: "Projects",
	},
	{
		description: "View resume",
		href: "/resume.pdf",
		slug: "resume",
		title: "Resume",
	},
];

export const WINDOWS: (WindowProps & {
	isOpen: boolean;
})[] = [
	{
		name: "About",
		content: [
			{
				type: "text",
				data: "Victor is a software engineer with 7 years of experience building thoughtful digital products, from intuitive user interfaces to the systems that power them. He enjoys working across the stack, but has a particular appreciation for frontend engineering, design, and the small details that make software feel good to use.",
			},
			{
				type: "text",
				data: "Originally from the Philippines and now based in the Bay Area, he approaches engineering with a product-minded perspective, valuing simplicity, craftsmanship, and close collaboration with designers and other engineers.",
			},
			{
				type: "text",
				data: "Outside of engineering, he enjoys film, music, rock climbing, and finding new creative outlets. He also spends an unreasonable amount of time spoiling his cat, [**Jiji**](gallery:jiji).",
			},
		],

		isOpen: true,

		style: {
			left: "8px",
			// Window Trigger (56px) + Spacing (8px)
			top: "64px",

			"max-width": "320px",
			width: "100%",
			"z-index": 1,
		},
	},
	{
		name: "Experience",
		content: [
			{
				type: "list",
				data: [
					{
						title: "SenseMesh",
						subtitle: "Lead Frontend Engineer",
						heading: `${dayjs("02/01/2025", "MM/DD/YYYY").format("MMM YYYY")} - ${dayjs("08/01/2026", "MM/DD/YYYY").format("MMM YYYY")}`,
						body: [
							"Architected a React SPA, establishing reusable data-fetching patterns and type-safe API integrations adopted by other engineers.",
							"Introduced Storybook across the application, enabling designers to independently explore components, refine interactions, and collaborate on UI development.",
							"Built the primary chat-first interface using LLM tool calling, enabling natural-language detection searches and security workflows with seamless transitions to traditional forms for refinement.",
							"Developed a video pipeline using NATS, FFmpeg, and LL-HLS, enabling low-latency browser playback and on-demand viewing through Google Cloud Storage.",
							"Established the initial gRPC architecture using Protocol Buffers and Envoy, providing strongly typed APIs across frontend and backend services.",
							"Integrated Ory for identity management and implemented RBAC with tenant-scoped data access across public and internal services.",
						],
					},
					{
						title: "Offset Partners",
						subtitle: "Senior Software Engineer",
						heading: `${dayjs("05/01/2021", "MM/DD/YYYY").format("MMM YYYY")} - ${dayjs("10/01/2024", "MM/DD/YYYY").format("MMM YYYY")}`,
						body: [
							"Rebuilt and redesigned the product dashboard in React, launching a block-based CMS adopted by new and existing winery clients.",
							"Modernized a legacy PHP/jQuery frontend with Webpack and route-aware asset loading, reducing build times by ~80% and eliminating unnecessary JavaScript delivery.",
							"Refactored an in-house PHP MVC framework, restructuring application routing and shared utilities while consolidating duplicated code.",
							"Optimized MySQL queries within a legacy data architecture, improving API response times by ~50%.",
						],
					},
					{
						title: "Offset Partners",
						subtitle: "Junior Software Engineer",
						heading: `${dayjs("07/01/2019", "MM/DD/YYYY").format("MMM YYYY")} - ${dayjs("05/01/2021", "MM/DD/YYYY").format("MMM YYYY")}`,
						body: [
							"Replaced FTP-based development workflows with Dockerized local environments and GitHub Actions CI, enabling independent development and automated code-quality checks.",
							"Collaborated with winery stakeholders and designers to translate business requirements into customer-facing interfaces.",
						],
					},
					{
						title: "Napa Valley College",
						subtitle: "Computer Science Tutor",
						heading: `${dayjs("08/01/2018", "MM/DD/YYYY").format("MMM YYYY")} - ${dayjs("05/01/2019", "MM/DD/YYYY").format("MMM YYYY")}`,
						body: [
							"Tutored students in programming fundamentals, algorithms, and computer science coursework.",
							"Collaborated with faculty to support students with assignments, projects, and exam preparation.",
						],
					},
				],
			},
		],

		isOpen: true,

		style: {
			left: "8px",
			// Window Trigger (56px) + About Window (316px) + Spacing between those two (8px each x 2 = 16px)
			top: "388px",

			"max-width": "320px",
			width: "100%",
			"z-index": 2,

			"overflow-y": "auto",
		},
	},
	{
		name: "Projects",
		content: [
			{
				type: "carousel",
				data: [
					{
						href: "/projects/puzzlely/",
						title: "Puzzlely Cover",
						image: {
							src: "/puzzlely-cover.png",
							height: 630,
							width: 1200,

							palette: ["#EBBDBD", "#2D2936", "#1E1B28", "#E8BBBA", "#EBBDBC"],
						},
					},
					{
						href: "/projects/puzzlely/",
						title: "Puzzlely Home Page",
						image: {
							src: "/puzzlely-home-page.png",
							height: 2160,
							width: 3840,

							palette: ["#1A1825", "#15141F", "#333039", "#948888", "#1B1A27"],
						},
					},
					{
						href: "/projects/puzzlely/",
						title: "Puzzlely User Page",
						image: {
							src: "/puzzlely-user-page.png",
							height: 2160,
							width: 3840,

							palette: ["#1A1825", "#15141F", "#333039", "#948888", "#1B1A27"],
						},
					},
				],
			},
		],

		isOpen: true,

		style: {
			bottom: "8px",
			left: "8px",

			// height: "120px",
			width: "calc(100% - 16px)",
			"z-index": 3,
		},
	},
	{
		name: "Socials",
		content: [
			{
				type: "links",
				data: [
					{
						href: "https://github.com/ragofjoes",
						title: "GitHub",
					},
					{
						href: "https://linkedin.com/in/ragofjoes",
						title: "LinkedIn",
					},
					{
						href: "https://letterboxd.com/ragofjoes",
						title: "Letterboxd",
					},
				],
			},
		],

		isOpen: true,

		style: {
			top: "8px",
			right: "8px",

			width: "320px",
			"z-index": 4,
		},
	},
];

export const GALLERIES: Record<
	string,
	{
		title: string;
		images: {
			src: string;
			alt: string;
			height: number;
			palette: [string, string, string, string, string];
			width: number;
		}[];
	}
> = {
	jiji: {
		title: "Jiji",

		images: [
			{
				src: "/jiji/jiji-17.jpg",
				alt: "Film critic Jiji",

				height: 3840,
				width: 2160,

				palette: ["#2A1C1D", "#AB888F", "#2C2032", "#7A6589", "#834D42"],
			},
			{
				src: "/jiji/jiji-18.jpg",
				alt: "Flatbread Jiji",

				height: 2160,
				width: 2160,

				palette: ["#4A545A", "#20120C", "#3D3A31", "#5B472F", "#2D2E2E"],
			},
			{
				src: "/jiji/jiji-1.jpg",
				alt: "Baby Jiji",

				height: 1008,
				width: 1344,

				palette: ["#B9B09F", "#050503", "#2A2828", "#79502C", "#CBDADC"],
			},
			{
				src: "/jiji/jiji-2.jpg",
				alt: "Sitting Jiji",

				height: 1344,
				width: 1008,

				palette: ["#AEABA4", "#7F725F", "#534D41", "#2F2C25", "#221F17"],
			},
			{
				src: "/jiji/jiji-5.jpg",
				alt: "Oblivious Jiji",

				height: 1344,
				width: 1008,

				palette: ["#6E5C49", "#423828", "#8F7A64", "#5E4F3F", "#4C3B26"],
			},
			{
				src: "/jiji/jiji-6.jpg",
				alt: "Why she look like that?",

				height: 1344,
				width: 1008,

				palette: ["#E0C1A7", "#140D09", "#5F4533", "#443225", "#493A30"],
			},
			{
				src: "/jiji/jiji-7.jpg",
				alt: "Window Jiji",

				height: 2016,
				width: 1512,

				palette: ["#425753", "#54655B", "#667366", "#25302B", "#3F4F48"],
			},
			{
				src: "/jiji/jiji-8.jpg",
				alt: "Bookworm Jiji",

				height: 1344,
				width: 1008,

				palette: ["#6F6356", "#2D221A", "#AFA899", "#2E2C25", "#311A0C"],
			},
			{
				src: "/jiji/jiji-9.jpg",
				alt: "Hunter Jiji",

				height: 1344,
				width: 756,

				palette: ["#3C4138", "#4D544B", "#414726", "#CFDDCB", "#79806A"],
			},
			{
				src: "/jiji/jiji-10.jpg",
				alt: "Hotdog Jiji",

				height: 1344,
				width: 756,

				palette: ["#241824", "#A48AA1", "#E7CEEB", "#846E87", "#856A73"],
			},
			{
				src: "/jiji/jiji-12.jpg",
				alt: "Bed Monster Jiji",

				height: 1512,
				width: 1512,

				palette: ["#453E33", "#321E08", "#503310", "#0B0502", "#282721"],
			},
			{
				src: "/jiji/jiji-13.jpg",
				alt: "Puppy Eyes Jiji",

				height: 1344,
				width: 756,

				palette: ["#9B8F7E", "#B09C85", "#4C3D2D", "#372C1E", "#383129"],
			},
			{
				src: "/jiji/jiji-14.jpg",
				alt: "Eepy Jiji",

				height: 1512,
				width: 1512,

				palette: ["#222217", "#545F37", "#100C07", "#070805", "#1A1B13"],
			},
			{
				src: "/jiji/jiji-16.jpg",
				alt: "Angry Jiji",

				height: 1512,
				width: 1512,

				palette: ["#9A745E", "#BF8D70", "#140F09", "#AC6B42", "#261F16"],
			},
		],
	},
} as const;
