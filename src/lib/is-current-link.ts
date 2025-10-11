export function isCurrentLink(url: URL, slug: string): boolean {
	const pathname = url.pathname;
	const segments = pathname.split("/").filter(Boolean);

	if (slug === "/" || slug === "") {
		return segments.length === 0;
	}

	return segments.includes(slug);
}
