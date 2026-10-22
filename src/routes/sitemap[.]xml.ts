import { createFileRoute } from "@tanstack/react-router";

import { SITE } from "@/lib/constants";
import { PROJECTS } from "@/routes/projects/-projects";

const PATHS = [
	"/",
	"/projects",
	...PROJECTS.map((project) => `/projects/${project.slug}`),
	"/resume",
];

export const Route = createFileRoute("/sitemap.xml")({
	server: {
		handlers: {
			GET: () => {
				const urls = PATHS.map((path) => `\t<url><loc>${SITE.url}${path}</loc></url>`).join("\n");

				return new Response(
					`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
					{
						headers: {
							"Cache-Control": "public, max-age=3600",
							"Content-Type": "application/xml; charset=utf-8",
						},
					},
				);
			},
		},
	},
});
