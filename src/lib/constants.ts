import type { Transition, Variants } from "motion/react";

export const SITE = {
	name: "Victor Ragojos",
	jobTitle: "Senior Software Engineer",
	description:
		"Portfolio of Victor Ragojos, a senior software engineer in San Francisco focused on frontend engineering, design, and the systems behind thoughtful products.",
	url: "https://www.ragofjoes.dev",
} as const;

/** How windows and panels open and close, and move when reset. */
export const PANEL_ANIMATIONS = {
	/** Delay (s) between windows and panels opening one after another after the intro. */
	stagger: 0.07,
	transition: { duration: 0.15, ease: "easeOut" } satisfies Transition,
	/** Zoom in to open and out to close; hidden while closed. */
	variants: {
		open: { opacity: 1, scale: 1, visibility: "visible" },
		closed: { opacity: 0, scale: 0.9, transitionEnd: { visibility: "hidden" } },
	} satisfies Variants,
} as const;
