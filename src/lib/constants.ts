import dayjs from "dayjs";
import type { IconTypes } from "solid-icons";
import { ImGithub, ImLinkedin2, ImSpotify, ImTwitter } from "solid-icons/im";

export const PROJECTS = [
	{
		background: "#ffffff",
		description:
			"A workow automation tool that seamlessly connects Basecamp with GitHub, enabling real-time task synchronization and streamlined team collaboration. Implemented monitoring and automated deployment systems for reliability.",
		image: "/offsetTent-preview.webp",
		tags: ["Go", "OAuth2", "MySQL", "OpenTelemetry", "Docker", "GitHub Actions"],
		title: "Offset Tent",
		url: "https://tent.offsetdevops.com/",
	},
	{
		background: "#191824",
		description:
			"A multiplayer word puzzle game inspired by NYT's Connections, featuring unlimited plays, custom puzzles, and daily challenges.",
		image: "/puzzlely-preview.webp",
		tags: [
			"Typescript",
			"React",
			"Next",
			"Go",
			"OAuth2",
			"MySQL",
			"OpenTelemetry",
			"Docker",
			"Terraform",
			"DigitalOcean",
		],
		title: "Puzzlely",
		url: "https://www.puzzlely.io/",
	},
	{
		background: "#0c1017",
		description:
			"An iOS library that extracts the ColorTheme from an image. It uses the Octree Color Quantization Algorithm to build the image’s distinct color palette.",
		image: "/octreePalette-preview.webp",
		tags: ["Mobile", "iOS", "Swift 5.0"],
		title: "Octree Palette",
		url: "https://github.com/RagOfJoes/OctreePalette",
	},
];

export const ROUTES = [
	{ description: "Go to home page", href: "/", slug: "", title: "About" },
	{
		description: "Go to projects page",
		href: "/projects/",
		slug: "projects",
		title: "Projects",
	},
];

export const SOCIALS: { href: string; icon: IconTypes; title: string }[] = [
	{
		href: "https://github.com/RagOfJoes",
		icon: ImGithub,
		title: "GitHub",
	},
	{
		href: "https://linkedin.com/in/RagOfJoes",
		icon: ImLinkedin2,
		title: "LinkedIn",
	},
	{
		href: "https://twitter.com/RagOfJoes",
		icon: ImTwitter,
		title: "Twitter",
	},
	{
		href: "https://open.spotify.com/user/sky16g4pamoem36i352u14ued",
		icon: ImSpotify,
		title: "Spotify",
	},
];

export const WORK_EXPERIENCE = [
	{
		company: "Offset Partners",
		description: [
			"Led frontend modernization initiatives including component libraries and build tooling improvements, reducing build times by 200% and development time by 40%. Enhanced performance and accessibility for millions of users.",
			"Refactored core PHP framework and implemented database optimizations, reducing codebase complexity by 60% and improving API response times by 50%.",
			"Implemented Docker-based development environment, standardizing codebase and reducing onboarding time by 50%. Ensured consistency across local, staging, and production environments.",
			"Implemented CI/CD pipelines with GitHub Actions, reducing QA time by 80% and tripling release frequency.",
		],
		end: dayjs("10/16/2024", "MM/DD/YYYY"),
		job: "Software Engineer",
		link: "https://www.offsetpartners.com/",
		start: dayjs("07/07/2019", "MM/DD/YYYY"),
	},
	{
		company: "Napa Valley College",
		description: [
			"Developed innovative methods to explain complex programming concepts, enhancing student comprehension and engagement.",
			"Guided peers on effective study strategies for exams and projects, improving overall academic performance.",
			"Partnered with professors to refine teaching approaches and assignments, optimizing the learning experience.",
		],
		end: dayjs("05/21/2019", "MM/DD/YYYY"),
		job: "Computer Science Tutor",
		start: dayjs("08/01/2018", "MM/DD/YYYY"),
	},
];
