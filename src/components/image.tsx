import { type ComponentProps, type CSSProperties, useCallback, useState } from "react";

import { cn } from "@/lib/cn";

export type ImageProps = Omit<ComponentProps<"img">, "alt" | "ref"> & {
	alt: string;
	palette: [one: string, two: string, three: string, four: string, five: string];
};

/**
 * `<img>` that fades in over a blurred gradient built from the image's palette.
 */
export function Image({ alt, className, onLoad, palette, ...props }: ImageProps) {
	const [isReady, setIsReady] = useState(false);

	// A cached image can finish loading before hydration attaches `onLoad`, so
	// check on mount as well.
	const ref = useCallback((node: HTMLImageElement | null) => {
		if (node?.complete && node.naturalWidth > 0) {
			setIsReady(true);
		}
	}, []);

	return (
		<div
			className={cn("group/image relative block w-full outline-none", className)}
			data-is-loading={!isReady}
			style={
				{
					"--palette-one": palette[0],
					"--palette-two": palette[1],
					"--palette-three": palette[2],
					"--palette-four": palette[3],
					"--palette-five": palette[4],
				} as CSSProperties
			}
		>
			<img
				{...props}
				alt={alt}
				className={cn(
					"block h-full w-auto opacity-0 transition-opacity duration-500 outline-none",

					"group-data-[is-loading=false]/image:opacity-100",
				)}
				onLoad={(e) => {
					setIsReady(true);
					onLoad?.(e);
				}}
				ref={ref}
			/>

			<div
				className={cn(
					"pointer-events-none absolute inset-0 backdrop-blur-lg transition-opacity duration-500",

					"group-data-[is-loading=false]/image:opacity-0",
				)}
				style={{
					backgroundColor: "var(--palette-five)",
					backgroundImage: [
						"radial-gradient(ellipse at 20% 20%, var(--palette-one) 0%, transparent 60%)",
						"radial-gradient(ellipse at 80% 15%, var(--palette-two) 0%, transparent 55%)",
						"radial-gradient(ellipse at 75% 80%, var(--palette-three) 0%, transparent 60%)",
						"radial-gradient(ellipse at 15% 85%, var(--palette-four) 0%, transparent 55%)",
					].join(", "),
				}}
			/>
		</div>
	);
}
