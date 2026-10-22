import { type HTMLMotionProps, motion } from "motion/react";

import { cn } from "@/lib/cn";
import { PANEL_ANIMATIONS } from "@/lib/constants";

import { PROJECTS } from "./-projects";

export type ProjectsEmptyPanelProps = HTMLMotionProps<"section">;

/** A static window: striped frame, mono title bar, and a bordered body. */
export function ProjectsEmptyPanel({ className, ...props }: ProjectsEmptyPanelProps) {
	return (
		<motion.section
			{...props}
			className={cn(
				"flex min-h-32 min-w-0 flex-1 flex-col border border-foreground/70 bg-striped px-2 pb-2 text-foreground",

				// The list fills small screens until a project is picked
				"max-md:hidden",

				className,
			)}
			transition={PANEL_ANIMATIONS.transition}
			variants={PANEL_ANIMATIONS.variants}
		>
			<div className="inline-flex h-6 w-full shrink-0 items-center justify-between gap-2">
				<h2 className="truncate font-mono text-xs leading-none font-semibold">No Project</h2>
			</div>

			<div className="min-h-0 flex-1 overflow-hidden rounded-sm border bg-background p-1">
				<dl className="flex w-full flex-col gap-1">
					<div className="grid w-full grid-cols-2 gap-2">
						<dt className="col-span-1 font-mono text-xs uppercase">[Status]</dt>
						<dd className="col-span-1 font-mono text-xs uppercase">Nothing Selected</dd>
					</div>

					<div className="grid w-full grid-cols-2 gap-2">
						<dt className="col-span-1 font-mono text-xs uppercase">[Available]</dt>
						<dd className="col-span-1 font-mono text-xs">{PROJECTS.length}</dd>
					</div>
				</dl>

				<p className="mt-2 font-sans text-xs font-medium">
					Pick a project from the list to see what it is, what it&apos;s built with, and a few
					screenshots.
				</p>
			</div>
		</motion.section>
	);
}
