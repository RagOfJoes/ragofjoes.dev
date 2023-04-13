import dayjs from "dayjs";
import type { IconTypes } from "solid-icons";
import { ImGithub, ImLinkedin2, ImTwitter } from "solid-icons/im";

export const PROJECTS = [
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
			"Led development team in creating a low code solution allowing our clients to easily integrate our Cart and CMS service into their existing site",
			"Refactored legacy PHP MVC framework to improve integration with React which decreased the number of duplicate and brittle code by up to 60%",
			"Implemented Docker into our code to decrease the amount of variability between environments and simplify local development setup",
			"Introduced a proper Version Control workflow with GitHub which cut down production bugs by 80%",
		],
		end: dayjs(),
		job: "Product Engineer",
		link: "https://www.offsetpartners.com/",
		start: dayjs("12/08/2020", "MM/DD/YYYY"),
	},
	{
		company: "Offset",
		description: [
			"Managed e-commerce platform by squashing bugs and addressing client requests",
			"Prototyped several internal tools such as a centralized Identity Provider, GraphQL wrapper for our Cart service, and a real-time client issue tracker",
			"Worked closely with designers to build unique features for Client websites",
		],
		end: dayjs("12/08/2020", "MM/DD/YYYY"),
		job: "JR. Software Developer",
		link: "https://www.offsetpartners.com/",
		start: dayjs("07/07/2019", "MM/DD/YYYY"),
	},
	{
		company: "Napa Valley College",
		description: [
			"Assisted classmates with various studying techniques for exams, projects, and/or, assignments",
			"Presented different ways to visualize, understand, and enjoy complex programming topics",
			"Collaborated with professors to address teaching and assignment issues",
		],
		end: dayjs("05/21/2019", "MM/DD/YYYY"),
		job: "Computer Science Tutor",
		start: dayjs("08/01/2018", "MM/DD/YYYY"),
	},
];
