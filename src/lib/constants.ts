import dayjs from "dayjs";
import type { IconTypes } from "solid-icons";
import { ImGithub, ImLinkedin2, ImTwitter } from "solid-icons/im";

export const PROJECTS = [
	{
		description:
			"Offset Tent is an automation tool that synchronizes Basecamp cards/todos and GitHub issues/pull requests. It allows you to keep your team up to date with the latest changes made to your codebases.",
		image: "/offsetTent-preview.webp",
		tags: [
			"Go",
			"OAuth2",
			"MySQL",
			"OpenTelemetry",
			"Docker",
			"GitHub Actions",
		],
		title: "Offset Tent",
		url: "https://tent.offsetdevops.com/",
	},
	{
		description:
			"A puzzle game that was inspired by the BBC’s “Only Connect” game show. Users create a puzzle with 16 words where each group of 4 words have some connection between them. Players attempt to link each group together and guess each connection.",
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
		description:
			"An iOS library that extracts the ColorTheme from an image. It uses the Octree Color Quantization Algorithm to build the image’s distinct color palette.",
		image: "/octreePalette-preview.webp",
		tags: ["Mobile", "iOS", "Swift 5.0"],
		title: "Octree Palette",
		url: "https://github.com/RagOfJoes/OctreePalette",
	},
	{
		description:
			"A web app that allows users to create, import, and share their favorite recipes. Users can also create “Creations” that show off their attempts at following other user generated recipes.",
		image: "/spoonfed-preview.webp",
		tags: [
			"React",
			"Next",
			"NodeJS",
			"GraphQL",
			"OAuth2",
			"OIDC",
			"Redis",
			"MongoDB",
			"Azure",
		],
		title: "Spoonfed",
		url: "https://spoonfed.dev/",
	},
	{
		description:
			"A simple identity provider that is build on top of the OIDC protocol for authentication. Users can manage their profile and active sessions.",
		image: "/identityProvider-preview.webp",
		tags: ["NodeJS", "OAuth2", "OIDC", "MongoDB", "Redis"],
		title: "Identity Provider",
		url: "https://spoonfed.dev/api/login",
	},
];

export const ROUTES = [
	{ href: "/", slug: "", title: "ABOUT" },
	{ href: "/projects/", slug: "projects", title: "PROJECTS" },
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
];

export const WORK_EXPERIENCE = [
	{
		company: "Offset",
		description: [
			"Lead the migration from Webpack to Vite for front-end build processes across all of Offset's products, slashing compilation times by 200% and streamlining the development workflow company wide. This overhaul significantly reduced configuration complexity and enabled enhanced security measures",
			"Orchestrated a comprehensive refactoring of a legacy PHP MVC framework, significantly reducing abstraction layers and simplifying the codebase. Implemented a more direct integration with Vite, eliminating inline scripts and enabling more efficient asset bundling. This streamlined architecture reduced duplicated and fragile code by 60%, enhancing system performance and accelerating page load times",
			"Architected and implemented a comprehensive Docker-based development environment, standardizing the entire codebase across multiple products. This initiative eliminated 'works on my machine' issues, reduced new developer onboarding time by 50%, and ensured consistent behavior between local, staging, and production environments"
		],
		end: dayjs("10/16/2024", "MM/DD/YYYY"),
		job: "Software Engineer",
		link: "https://www.offsetpartners.com/",
		start: dayjs("07/07/2019", "MM/DD/YYYY"),
	},
	{
		company: "Napa Valley College",
		description: [
			"Assisted fellow classmates by offering guidance on diverse study techniques for exams, projects, and assignments",
			"Presented different ways to visualize, understand, and enjoy complex programming topics",
			"Closely collaborated with professors to address teaching and assignment related concerns, fostering an improved learning experience",
		],
		end: dayjs("05/21/2019", "MM/DD/YYYY"),
		job: "Computer Science Tutor",
		start: dayjs("08/01/2018", "MM/DD/YYYY"),
	},
];
