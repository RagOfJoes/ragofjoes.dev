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
				data: "Currently building the future with the folks at [**SenseMesh**](https://sensemesh.ai) and spoiling his cat, Jiji.",
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
			// Window Trigger (56px) + About Window (252.75px) + Spacing between those two (8px each x 2 = 16px)
			top: "324.75px",

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
