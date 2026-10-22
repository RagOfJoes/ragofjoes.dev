import { type ComponentProps, useCallback, useEffect, useRef, useState } from "react";

import { motion, type Transition, useReducedMotion } from "motion/react";

import { useIntroContext } from "@/components/intro";
import { cn } from "@/lib/cn";

/** Target major line spacing (px); the grid stretches it a little to fit exactly. */
const MAJOR = 90;
/** Minor cells per major one (so ~18px minor spacing). */
const MAJOR_EVERY = 5;

/** How long (s) each line takes to draw. */
const DURATION = 0.45;
/** The inner lines start this long (s) after the frame, while it's still finishing. */
const FRAME_LEAD = 0.25;
/** The inner lines start at random moments over this long (s). */
const SPREAD = 0.55;

const EASE = [0.22, 1, 0.36, 1] satisfies Transition["ease"];

type Size = { width: number; height: number };

type Line = {
	index: number;
	/** Position across the lines (y for horizontal ones, x for vertical). */
	at: number;
	isMajor: boolean;
	isFirst: boolean;
	isLast: boolean;
};

/**
 * Lines spanning `length` exactly, starting and ending on a major line: as many
 * whole major cells as fit (spacing stretched slightly from `MAJOR` to make them
 * fit), each split into `MAJOR_EVERY` minor ones. Snapped to the half pixel so a
 * 1px stroke stays crisp, with the last one kept inside the edge.
 */
function getLines(length: number): Line[] {
	const minors = Math.max(1, Math.round(length / MAJOR)) * MAJOR_EVERY;
	const step = length / minors;
	const last = Math.max(Math.floor(length) - 0.5, 0.5);

	return Array.from({ length: minors + 1 }, (_, index) => ({
		index,
		at: Math.min(Math.floor(index * step) + 0.5, last),
		isMajor: index % MAJOR_EVERY === 0,
		isFirst: index === 0,
		isLast: index === minors,
	}));
}

/** A stable 0..1 value per line, so the random order is the same on every render. */
function noise(seed: number) {
	const x = Math.sin(seed * 12.9898) * 43758.5453;
	return x - Math.floor(x);
}

export type AnimatedGridProps = ComponentProps<"div">;

/**
 * The graph-paper background: ~90px major lines over a ~18px minor grid, fitted
 * so it starts and ends on a major line both ways at any size. During the
 * first-load intro the frame (all four edges) draws first, and the lines within
 * draw in at random moments as it finishes, like a sketch coming together.
 * Otherwise, and with reduced motion, it's shown as-is.
 */
export function AnimatedGrid({ className, ...props }: AnimatedGridProps) {
	const isReduced = useReducedMotion();

	// Draws in only during the first-load intro; after that (later navigations,
	// lines added by a resize) it just appears
	const [{ isPlaying }, { onIntroComplete }] = useIntroContext();
	const shouldAnimate = isPlaying && !isReduced;
	const drawnCount = useRef(0);

	// The intro is over once the grid has drawn; with reduced motion it doesn't
	// animate, so it's over right away
	useEffect(() => {
		if (isPlaying && isReduced) {
			onIntroComplete();
		}
	}, [isPlaying, isReduced, onIntroComplete]);

	const [size, setSize] = useState<Size | null>(null);

	const ref = useCallback((element: HTMLDivElement | null) => {
		if (!element) {
			return;
		}

		const observer = new ResizeObserver(([entry]) => {
			if (entry) {
				setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
			}
		});
		observer.observe(element);

		return () => observer.disconnect();
	}, []);

	const renderLine = (line: Line, orientation: "horizontal" | "vertical") => {
		if (!size) {
			return null;
		}

		const isHorizontal = orientation === "horizontal";
		const length = isHorizontal ? size.width : size.height;
		// The frame (all four edges) draws first; then the lines within, at random,
		// horizontal and vertical ones in different orders
		const isFrame = line.isFirst || line.isLast;
		const delay = isFrame ? 0 : FRAME_LEAD + noise(line.index + (isHorizontal ? 0 : 1000)) * SPREAD;

		return (
			<motion.line
				{...(isHorizontal
					? { x1: 0, x2: length, y1: line.at, y2: line.at }
					: { x1: line.at, x2: line.at, y1: 0, y2: length })}
				animate={{ pathLength: 1 }}
				className={line.isMajor ? "stroke-border" : "stroke-border/40"}
				initial={shouldAnimate ? { pathLength: 0 } : false}
				onAnimationComplete={shouldAnimate ? onLineDrawn : undefined}
				key={`${orientation}-${line.index}`}
				transition={{ delay, duration: DURATION, ease: EASE }}
			/>
		);
	};

	const rows = size ? getLines(size.height) : [];
	const columns = size ? getLines(size.width) : [];

	const onLineDrawn = () => {
		drawnCount.current += 1;
		if (drawnCount.current >= rows.length + columns.length) {
			onIntroComplete();
		}
	};
	// Minor lines first so the major ones are drawn over them
	const byWeight = (lines: Line[]) => [
		...lines.filter((line) => !line.isMajor),
		...lines.filter((line) => line.isMajor),
	];

	return (
		<div
			{...props}
			aria-hidden
			className={cn(
				"pointer-events-none bg-grid",

				className,
			)}
			ref={ref}
		>
			{size && (
				<svg
					className="absolute inset-0"
					fill="none"
					height={size.height}
					shapeRendering="crispEdges"
					strokeWidth={1}
					width={size.width}
				>
					{byWeight(rows).map((line) => renderLine(line, "horizontal"))}
					{byWeight(columns).map((line) => renderLine(line, "vertical"))}
				</svg>
			)}
		</div>
	);
}
