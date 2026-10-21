import { motion, type Transition, type Variants } from "motion/react";

import { cn } from "@/lib/cn";

const FOLDER_TRANSITION = { type: "spring", duration: 0.35, bounce: 0.3 } satisfies Transition;

/** The front flap tilts back from its bottom edge. */
const FLAP_VARIANTS = {
	closed: { scaleY: 1, skewX: 0 },
	peek: { scaleY: 0.94, skewX: -8 },
	open: { scaleY: 0.8, skewX: -20 },
} satisfies Variants;

/** A sheet tucked in the folder rises as the flap opens. */
const PAPER_VARIANTS = {
	closed: { y: 4 },
	peek: { y: 2.5 },
	open: { y: 0 },
} satisfies Variants;

export type FolderIconProps = {
	className?: string;
	state: keyof typeof FLAP_VARIANTS;
};

/**
 * A folder that opens (and peeks open) with a little spring. The paper and flap
 * are filled to hide the lines behind them; set `--folder-fill` to whatever is
 * behind the icon when that isn't the page background (e.g. an inverted row).
 */
export function FolderIcon({ className, state }: FolderIconProps) {
	return (
		<motion.svg
			animate={state}
			aria-hidden
			className={cn("size-4 shrink-0 overflow-visible", className)}
			fill="none"
			// Server render is already in its final state; only changes animate
			initial={false}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			transition={FOLDER_TRANSITION}
			viewBox="0 0 24 24"
		>
			{/* Back */}
			<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />

			{/* Paper; filled so it hides the back's lines behind it */}
			<motion.rect
				className="fill-(--folder-fill,var(--color-background))"
				height={10}
				rx={1}
				variants={PAPER_VARIANTS}
				width={14}
				x={5}
				y={5}
			/>

			{/* Front flap */}
			<motion.path
				className="fill-(--folder-fill,var(--color-background))"
				d="M2 9h20v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"
				style={{ originY: 1 }}
				variants={FLAP_VARIANTS}
			/>
		</motion.svg>
	);
}
