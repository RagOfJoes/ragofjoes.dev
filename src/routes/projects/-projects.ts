import type { ImageProps } from "@/components/image";

export type Project = {
	slug: string;
	name: string;
	description: string;

	type: string;
	url: string;
	source?: string;
	stack: string[];

	images: (Pick<ImageProps, "height" | "palette" | "src" | "width"> & { alt: string })[];
};
export const PROJECTS: Project[] = [
	{
		slug: "puzzlely",
		name: "Puzzlely",
		description:
			"A multiplayer word puzzle game inspired by NYT's Connections, featuring unlimited plays, custom puzzles, and daily challenges.",

		type: "Web Application",
		url: "https://puzzlely.io",
		source: "https://github.com/RagOfJoes/puzzlely",
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
