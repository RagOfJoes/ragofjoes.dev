import { createFileRoute } from "@tanstack/react-router";

import { JIJI_PHOTOS, RESUME, SITE } from "@/lib/constants";
import { PROJECTS } from "@/routes/projects/-projects";

/**
 * Every page, plus the resume PDF, with the images on each (image sitemap):
 * Jiji's photos on `/` only appear in a dialog, so crawlers wouldn't find them
 * otherwise. No `lastmod`: nothing here knows when a page last changed, and a
 * guessed date (like the deploy's) teaches search engines to ignore it.
 */
const ENTRIES: { path: string; images?: string[] }[] = [
	{ path: "/", images: JIJI_PHOTOS.map((photo) => photo.src) },
	{ path: "/projects" },
	...PROJECTS.map((project) => ({
		path: `/projects/${project.slug}`,
		images: project.images.map((image) => image.src),
	})),
	{ path: "/resume" },
	{ path: RESUME.pdf },
];

export const Route = createFileRoute("/sitemap.xml")({
	server: {
		handlers: {
			GET: () => {
				const urls = ENTRIES.map(({ images = [], path }) =>
					[
						"\t<url>",
						`\t\t<loc>${SITE.url}${path}</loc>`,
						...images.map(
							(src) => `\t\t<image:image><image:loc>${SITE.url}${src}</image:loc></image:image>`,
						),
						"\t</url>",
					].join("\n"),
				).join("\n");

				return new Response(
					[
						'<?xml version="1.0" encoding="UTF-8"?>',
						'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
						urls,
						"</urlset>",
						"",
					].join("\n"),
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
