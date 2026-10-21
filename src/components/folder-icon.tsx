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
// Drawn on a 16-unit grid with 1px strokes on half units, so at its 16px size
// every line lands on a whole pixel and stays crisp on 1x displays
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
			strokeWidth={1}
			viewBox="0 0 16 16"
		>
			{/* Back */}
			<path d="M2.5 13.5h11a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H8L6.5 2.5h-4a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1Z" />

			{/* Paper: rises as the flap opens */}
			<rect
				className={cn(
					"translate-y-[3px] fill-(--folder-fill,var(--color-background)) transition-transform duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)]",

					"group-data-[open=false]/folder:in-[a:focus-visible,a:hover,button:focus-visible,button:hover]:translate-y-0.5",
					"group-data-[open=true]/folder:translate-y-0",
					"group-data-[open=true]/folder:in-[a:focus-visible,a:hover,button:focus-visible,button:hover]:translate-y-px",
					"motion-reduce:transition-none",
				)}
				height={6}
				rx={0.5}
				width={9}
				x={3.5}
				y={3.5}
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
				d="M1.5 6.5h13v6a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1Z"
			/>
		</svg>
	);
}
