import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, rootRouteId, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { Header } from "@/components/header";
import { IconProvider } from "@/components/icon-provider";
import { IntroProvider } from "@/components/intro";
import { SITE } from "@/lib/constants";
import { getSeoMeta } from "@/lib/seo";
import appCss from "@/styles/base.css?url";

const OG_IMAGE = {
	url: `${SITE.url}/og.png`,
	alt: "Victor Ragojos in large type on a blue grid, beside a sketch of a lounging cat",
	height: "630",
	width: "1200",
};
const TITLE = `${SITE.name} • ${SITE.jobTitle}`;

const STRUCTURED_DATA = [
	{
		"@context": "https://schema.org",
		"@type": "Person",
		"@id": `${SITE.url}/#person`,
		name: SITE.name,
		url: `${SITE.url}/`,
		jobTitle: SITE.jobTitle,
		email: "mailto:jobs@ragofjoes.dev",
		address: {
			"@type": "PostalAddress",
			addressLocality: "San Francisco",
			addressRegion: "CA",
			addressCountry: "US",
		},
		knowsAbout: [
			"Frontend Engineering",
			"TypeScript",
			"React",
			"TanStack",
			"Go",
			"gRPC",
			"PostgreSQL",
			"Docker",
		],
		sameAs: [
			"https://github.com/RagOfJoes",
			"https://linkedin.com/in/ragofjoes",
			"https://letterboxd.com/ragofjoes",
		],
	},
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": `${SITE.url}/#website`,
		url: `${SITE.url}/`,
		name: "Victor Ragojos' Portfolio",
		description: SITE.description,
		publisher: { "@id": `${SITE.url}/#person` },
		inLanguage: "en",
	},
	{
		"@context": "https://schema.org",
		"@type": "WebPage",
		"@id": `${SITE.url}/#webpage`,
		url: `${SITE.url}/`,
		name: "Victor Ragojos' Portfolio",
		description: SITE.description,
		isPartOf: { "@id": `${SITE.url}/#website` },
		about: { "@id": `${SITE.url}/#person` },
		inLanguage: "en",
	},
];

export const Route = createRootRoute({
	head: ({ matches }) => {
		const canonicalUrl = `${SITE.url}${matches.at(-1)?.pathname ?? "/"}`;
		// A route's loader threw `notFound()`, or no route matched the URL at all
		// (only the root matched)
		const isNotFound =
			matches.some((match) => match.status === "notFound") ||
			matches.at(-1)?.routeId === rootRouteId;

		return {
			meta: [
				{ charSet: "utf-8" },
				{ name: "viewport", content: "width=device-width,initial-scale=1.0,minimum-scale=1.0" },
				...getSeoMeta({
					description: SITE.description,
					title: isNotFound ? `Not Found • ${SITE.name}` : TITLE,
				}),
				{
					name: "keywords",
					content:
						"victor ragojos,ragofjoes,senior software engineer,frontend engineer,software engineer,react,typescript,tanstack,san francisco,bay area,portfolio",
				},
				{ name: "robots", content: isNotFound ? "noindex" : "index,follow" },
				// `--background` (src/styles/base.css) as hex; keep in sync, and with site.webmanifest
				{ name: "theme-color", content: "#2f52ff" },
				{ name: "application-name", content: "RagOfJoes" },

				{ property: "og:type", content: "website" },
				{ property: "og:site_name", content: SITE.name },
				{ property: "og:image", content: OG_IMAGE.url },
				{ property: "og:image:alt", content: OG_IMAGE.alt },
				{ property: "og:image:height", content: OG_IMAGE.height },
				{ property: "og:image:width", content: OG_IMAGE.width },
				{ property: "og:url", content: canonicalUrl },

				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:image", content: OG_IMAGE.url },
				{ name: "twitter:image:alt", content: OG_IMAGE.alt },
				{ property: "twitter:domain", content: "ragofjoes.dev" },
				{ property: "twitter:url", content: canonicalUrl },
			],
			links: [
				{ rel: "stylesheet", href: appCss },
				{ rel: "canonical", href: canonicalUrl },
				{ rel: "manifest", href: "/site.webmanifest" },

				{ rel: "shortcut icon", href: "/favicon.ico?v=2", type: "image/x-icon" },
				{ rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png?v=2" },
				{ rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png?v=2" },
				{ rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png?v=2" },
			],
			scripts: STRUCTURED_DATA.map((data) => ({
				type: "application/ld+json",
				children: JSON.stringify(data),
			})),
		};
	},
	shellComponent: RootDocument,
});

function RootDocument({ children }: { readonly children: React.ReactNode }) {
	return (
		<html lang="en" dir="ltr">
			<head>
				<HeadContent />
			</head>

			<body className="flex h-dvh w-dvw flex-col overflow-hidden overscroll-none font-normal">
				<IntroProvider>
					<IconProvider>
						<Header />

						{children}
					</IconProvider>
				</IntroProvider>

				<TanStackDevtools
					plugins={[{ name: "TanStack Router", render: <TanStackRouterDevtoolsPanel /> }]}
				/>

				<Scripts />
			</body>
		</html>
	);
}
