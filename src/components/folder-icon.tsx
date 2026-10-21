import { cn } from "@/lib/cn";

export type FolderIconProps = {
	className?: string;
	isOpen?: boolean;
};

/**
 * A folder that opens with a little bounce. While the link or button it sits in
 * is hovered or keyboard-focused it hints at a click: opens a little when
 * closed, closes a little when open. The paper and flap are filled to hide the
 * lines behind them; set `--folder-fill` to whatever is behind the icon when
 * that isn't the page background (e.g. an inverted row).
 *
 * Plain CSS rather than Motion: Motion strips skew from every element while it
 * measures a layout animation (the windows), which made the open flaps flicker
 * whenever a window was brought to the front.
 */
export function FolderIcon({ className, isOpen = false }: FolderIconProps) {
	return (
		<svg
			aria-hidden
			className={cn("group/folder size-4 shrink-0 overflow-visible", className)}
			data-open={isOpen}
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			viewBox="0 0 24 24"
		>
			{/* Back */}
			<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />

			{/* Paper: rises as the flap opens */}
			<rect
				className={cn(
					"translate-y-1 fill-(--folder-fill,var(--color-background)) transition-transform duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)]",

					"group-data-[open=false]/folder:in-[a:focus-visible,a:hover,button:focus-visible,button:hover]:translate-y-[2.5px]",
					"group-data-[open=true]/folder:translate-y-0",
					"group-data-[open=true]/folder:in-[a:focus-visible,a:hover,button:focus-visible,button:hover]:translate-y-px",
					"motion-reduce:transition-none",
				)}
				height={10}
				rx={1}
				width={14}
				x={5}
				y={5}
			/>

			{/* Front flap: tilts back from its bottom edge */}
			<path
				className={cn(
					"origin-bottom transform-[scaleY(1)_skewX(0deg)] fill-(--folder-fill,var(--color-background)) transition-transform duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)] [transform-box:fill-box]",

					"group-data-[open=false]/folder:in-[a:focus-visible,a:hover,button:focus-visible,button:hover]:transform-[scaleY(0.94)_skewX(-8deg)]",
					"group-data-[open=true]/folder:transform-[scaleY(0.8)_skewX(-20deg)]",
					"group-data-[open=true]/folder:in-[a:focus-visible,a:hover,button:focus-visible,button:hover]:transform-[scaleY(0.86)_skewX(-14deg)]",
					"motion-reduce:transition-none",
				)}
				d="M2 9h20v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"
			/>
		</svg>
	);
}
