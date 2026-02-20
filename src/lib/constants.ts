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
				data: "Victor is a senior software engineer with over 6 years of experience building and owning complex systems, from secure distributed backends to modern AI assisted user interfaces. He cares deeply about clarity, scalability, and design, not just how software works, but how it feels to use.",
			},
			{
				type: "text",
				data: "Originally from the Philippines and now based in the Bay Area, he approaches engineering with a strong product mindset, blending technical rigor with thoughtful UX.",
			},
			{
				type: "text",
				data: "Currently building the future with the folks at [**SenseMesh**](https://sensemesh.ai) and spoiling his cat, [**Jiji**](gallery:jiji).",
			},
		],

		isOpen: true,

		style: {
			left: "8px",
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
						heading: `${dayjs("02/18/2025", "MM/DD/YYYY").format("MM/DD/YYYY")} - Present`,
						body: [
							"Architected a secure multi-tenant distributed system, enforcing strict data isolation, authentication boundaries, and horizontal scalability across customers.",
							"Built a full identity and access management layer, including RBAC, permission modeling, and service-to-service authentication across internal services.",
							"Replaced REST APIs with high-performance gRPC services, using Envoy to expose services to the web and enforcing end-to-end type safety across frontend and backend systems.",
							"Created an LLM-driven chat interface as the primary user experience, enabling secure querying and consumption of security data, feeds, and alerts in place of traditional dashboards.",
							"Partnered with design and product leadership to define the future of the platform, reshaping core UI/UX to support AI-assisted security workflows.",
							"Developed a real-time AI video processing and HLS playback pipeline supporting multiple device types (cameras and drones), demonstrating live monitoring and analysis capabilities for security use cases.",
						],
					},
					{
						title: "Offset Partners",
						subtitle: "Software Engineer",
						heading: `${dayjs("07/07/2019", "MM/DD/YYYY").format("MM/DD/YYYY")} - ${dayjs("10/16/2024", "MM/DD/YYYY").format("MM/DD/YYYY")}`,
						body: [
							"Led frontend modernization initiatives including component libraries and build tooling improvements, reducing build times by 200% and development time by 40%. Enhanced performance and accessibility for millions of users.",
							"Refactored core PHP framework and implemented database optimizations, reducing codebase complexity by 60% and improving API response times by 50%.",
							"Implemented Docker-based development environment, standardizing codebase and reducing onboarding time by 50%. Ensured consistency across local, staging, and production environments.",
							"Implemented CI/CD pipelines with GitHub Actions, reducing QA time by 80% and tripling release frequency.",
						],
					},
					{
						title: "Napa Valley College",
						subtitle: "Computer Science Tutor",
						heading: `${dayjs("08/01/2018", "MM/DD/YYYY").format("MM/DD/YYYY")} - ${dayjs("05/21/2019", "MM/DD/YYYY").format("MM/DD/YYYY")}`,
						body: [
							"Developed innovative methods to explain complex programming concepts, enhancing student comprehension and engagement.",
							"Guided peers on effective study strategies for exams and projects, improving overall academic performance.",
							"Partnered with professors to refine teaching approaches and assignments, optimizing the learning experience.",
						],
					},
				],
			},
		],

		isOpen: true,

		style: {
			left: "8px",
			// Window Trigger (56px) + About Window (253.25px) + Spacing between those two (8px each x 2 = 16px)
			top: "325.25px",

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
				src: "/jiji/jiji-3.jpg",
				alt: "Side eye Jiji",

				height: 2016,
				width: 1512,

				palette: ["#C0B0A7", "#6A392B", "#040402", "#2D2A25", "#C3BAB1"],
			},
			{
				src: "/jiji/jiji-4.jpg",
				alt: "Queen Jiji",

				height: 1344,
				width: 1008,

				palette: ["#969286", "#42423D", "#181A1A", "#1B1D1D", "#0E1111"],
			},
			{
				src: "/jiji/jiji-5.jpg",
				alt: "Unaware Jiji",

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
				src: "/jiji/jiji-15.jpg",
				alt: "Suitcase Jiji",

				height: 1008,
				width: 1008,

				palette: ["#605649", "#806E5D", "#0C0D09", "#6C6258", "#010302"],
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
