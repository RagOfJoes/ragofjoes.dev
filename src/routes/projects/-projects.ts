import type { ImageProps } from "@/components/image";

export type Project = {
	slug: string;
	name: string;
	description: string;

	type: string;
	url: string;
	source?: string;
	stack: string[];

	images: (Pick<ImageProps, "src"> & { alt: string; height: number; width: number })[];
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
				height: 630,
				width: 1200,
			},
			{
				alt: "Puzzlely Home Page",
				src: "/puzzlely-home-page.png",
				height: 2160,
				width: 3840,
			},
			{
				alt: "Puzzlely User Page",
				src: "/puzzlely-user-page.png",
				height: 2160,
				width: 3840,
			},
			{
				alt: "Puzzlely Create Page",
				src: "/puzzlely-create-page.png",
				height: 2160,
				width: 3840,
			},
		],
	},
];
