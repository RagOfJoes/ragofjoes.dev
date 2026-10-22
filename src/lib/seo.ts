/**
 * A page's title and description, mirrored to Open Graph and Twitter so link
 * previews match the page. Later routes' tags replace earlier ones by name.
 */
export function getSeoMeta({ description, title }: { description: string; title: string }) {
	return [
		{ title },
		{ name: "description", content: description },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
	];
}
