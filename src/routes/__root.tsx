import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { Header } from "@/components/header";
import { IconProvider } from "@/components/icon-provider";
import { IntroProvider } from "@/components/intro";
import { SITE } from "@/lib/constants";
import appCss from "@/styles/base.css?url";

const OG_IMAGE = `${SITE.url}/og.png`;

const STRUCTURED_DATA = [
	{
		"@context": "https://schema.org",
		"@type": "Person",
		"@id": `${SITE.url}/#person`,
		name: SITE.name,
		url: `${SITE.url}/`,
		jobTitle: "Lead Frontend Engineer",
		sameAs: [
			"https://github.com/ragofjoes",
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

		return {
			meta: [
				{ charSet: "utf-8" },
				{ name: "viewport", content: "width=device-width,initial-scale=1.0,minimum-scale=1.0" },
				{ title: SITE.name },
				{ name: "description", content: SITE.description },
				{
					name: "keywords",
					content: "ragofjoes,victor,ragojos,victor ragojos,portfolio,software engineer,developer",
				},
				{ name: "robots", content: "index,follow" },
				{ name: "theme-color", content: "#121113" },
				{ name: "application-name", content: "RagOfJoes" },

				{ property: "og:type", content: "website" },
				{ property: "og:site_name", content: SITE.name },
				{ property: "og:title", content: SITE.name },
				{ property: "og:description", content: SITE.description },
				{ property: "og:image", content: OG_IMAGE },
				{ property: "og:url", content: canonicalUrl },

				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:title", content: SITE.name },
				{ name: "twitter:description", content: SITE.description },
				{ name: "twitter:image", content: OG_IMAGE },
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
