/**
 * Writes smaller copies of images in `public/`, which `Image` finds by path
 * (`public/jiji/photo.jpg` here):
 * - `public/placeholders/jiji/photo.webp`: a tiny, blurry copy shown while the
 *   image loads
 * - `public/thumbnails/<width>/jiji/photo.webp`: for `srcset`, at each of
 *   `IMAGE_WIDTHS` narrower than the image
 *
 * @example
 * pnpm images public/jiji/*.jpg
 */
import { mkdir } from "node:fs/promises";
import { dirname, join, parse, relative } from "node:path";
import sharp from "sharp";

import { IMAGE_WIDTHS } from "../src/lib/constants.ts";

const write = async (image: sharp.Sharp, output: string, quality: number) => {
	await mkdir(dirname(output), { recursive: true });
	const { size } = await image.webp({ quality }).toFile(output);
	console.log(`${output}\t${size} B`);
};

for (const path of process.argv.slice(2)) {
	// The image's path within `public/`, without its extension
	const { dir, name } = parse(relative("public", path));
	const image = sharp(path);
	const { width = 0 } = await image.metadata();

	await write(
		image
			.clone()
			.resize(32, 32, { fit: "inside" })
			// Blurred here rather than in CSS (which fades out at the edges), so it
			// scales up smoothly instead of showing blocks and compression artifacts
			.blur(1.2),
		join("public/placeholders", dir, `${name}.webp`),
		70,
	);

	for (const size of IMAGE_WIDTHS.filter((size) => size < width)) {
		await write(
			image.clone().resize({ width: size }),
			join("public/thumbnails", String(size), dir, `${name}.webp`),
			80,
		);
	}
}
