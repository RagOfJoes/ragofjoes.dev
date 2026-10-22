import { type ComponentProps, useCallback, useState } from "react";

import { cn } from "@/lib/cn";
import { IMAGE_WIDTHS } from "@/lib/constants";

export type ImageProps = Omit<ComponentProps<"img">, "alt" | "ref" | "src"> & {
	alt: string;
	src: string;
};

/**
 * `<img>` that fades in over a tiny, blurry copy of itself. Uses the copies
 * `pnpm images <files>` writes, found by the image's path (`/jiji/photo.jpg`):
 * - `/placeholders/jiji/photo.webp`: the blurry copy
 * - `/thumbnails/<width>/jiji/photo.webp`: smaller copies offered through
 *   `srcset`, when `sizes` (how wide the image shows) and `width` (the
 *   original's) are given
 */
export function Image({ alt, className, onLoad, sizes, src, width, ...props }: ImageProps) {
	const [isReady, toggleIsReady] = useState(false);

	// The path without its extension and any query (e.g. a cache-busting `?v=2`)
	const name = src.replace(/\.[^./?]+(\?.*)?$/, "");
	const placeholder = `/placeholders${name}.webp`;
	// Only the copies narrower than the original exist
	const srcSet =
		sizes && width
			? [
					...IMAGE_WIDTHS.filter((size) => size < Number(width)).map(
						(size) => `/thumbnails/${size}${name}.webp ${size}w`,
					),
					`${src} ${width}w`,
				].join(", ")
			: undefined;

	// A cached image can finish loading before hydration attaches `onLoad`, so
	// check on mount as well.
	const ref = useCallback((node: HTMLImageElement | null) => {
		if (node?.complete && node.naturalWidth > 0) {
			toggleIsReady(true);
		}
	}, []);

	return (
		<div
			className={cn("group/image relative block w-full outline-none", className)}
			data-is-loading={!isReady}
		>
			<img
				{...props}
				alt={alt}
				sizes={sizes}
				src={src}
				srcSet={srcSet}
				width={width}
				className={cn(
					"block h-full w-auto opacity-0 transition-opacity duration-500 outline-none",

					"group-data-[is-loading=false]/image:opacity-100",
				)}
				onLoad={(e) => {
					toggleIsReady(true);
					onLoad?.(e);
				}}
				ref={ref}
			/>

			<div
				className={cn(
					"pointer-events-none absolute inset-0 transition-opacity duration-500",

					"group-data-[is-loading=false]/image:opacity-0",
				)}
				style={{
					backgroundImage: `url(${placeholder})`,
					backgroundSize: "100% 100%",
				}}
			/>
		</div>
	);
}
