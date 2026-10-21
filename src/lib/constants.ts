import type { Transition, Variants } from "motion/react";

export const SITE = {
	name: "Victor Ragojos",
	description:
		"Portfolio of Victor Ragojos, senior software engineer building secure, scalable systems and thoughtful AI assisted user experiences. Based in the Bay Area.",
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
