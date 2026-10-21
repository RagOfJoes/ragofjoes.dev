import type { ComponentProps } from "react";

import { motion } from "motion/react";

import { FolderIcon } from "@/components/folder-icon";
import { useIntroContext } from "@/components/intro";
import { cn } from "@/lib/cn";
import { PANEL_ANIMATIONS } from "@/lib/constants";

import { useWindowsContext } from "./windows-context";

export type WindowsTriggerProps = Omit<ComponentProps<"button">, "value"> & {
	value: string;
};

export function WindowsTrigger({ children, className, value, ...props }: WindowsTriggerProps) {
	const [{ getRevealDelay, getWindow }, { getTriggerProps }] = useWindowsContext();
	const [{ isPlaying }] = useIntroContext();

	const { isOpen } = getWindow(value);
	// Hidden while the intro plays, then appears at the same time as its window
	const revealDelay = getRevealDelay(value);
	const isWaiting = isPlaying && revealDelay !== null;

	return (
		<motion.li
			animate={isWaiting ? { opacity: 0, y: 4 } : { opacity: 1, y: 0 }}
			className="inline-flex h-full items-center"
			initial={revealDelay === null ? false : { opacity: 0, y: 4 }}
			transition={{ ...PANEL_ANIMATIONS.transition, delay: revealDelay ?? 0 }}
		>
			<button
				type="button"
				{...props}
				{...getTriggerProps(value)}
				className={cn(
					"group/trigger inline-flex cursor-pointer items-center gap-2",

					"focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-hidden focus-visible:[--folder-fill:var(--color-foreground)]",

					className,
				)}
			>
				<FolderIcon isOpen={isOpen} />

				<span className="font-sans text-sm font-medium select-none">{children ?? value}</span>
			</button>
		</motion.li>
	);
}
