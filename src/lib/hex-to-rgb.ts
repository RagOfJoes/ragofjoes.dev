export function hexToRgb(hex: string): [number, number, number] {
	let rgb = hex.replace("#", "").trim();

	if (rgb.length === 3) {
		rgb = rgb
			.split("")
			.map((c) => c + c)
			.join("");
	}

	const num = parseInt(rgb, 16);
	return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
}
