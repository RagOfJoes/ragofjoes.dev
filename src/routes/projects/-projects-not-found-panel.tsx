import { Link, useParams } from "@tanstack/react-router";
import { ArrowRightIcon, XIcon } from "lucide-react";
import { type HTMLMotionProps, motion } from "motion/react";

import { cn } from "@/lib/cn";
import { PANEL_ANIMATIONS } from "@/lib/constants";

export type ProjectsNotFoundPanelProps = HTMLMotionProps<"section">;

/** A static window: striped frame, mono title bar, and a bordered body. */
export function ProjectsNotFoundPanel({ className, ...props }: ProjectsNotFoundPanelProps) {
	// Not `Route.useParams()`: importing the route here would make its type circular
	const { slug } = useParams({ from: "/projects/$slug" });

	return (
		<motion.section
			{...props}
			className={cn(
				"inline-flex min-h-32 min-w-0 flex-1 flex-col border border-foreground/70 bg-striped px-2 pb-2 text-foreground",

				className,
			)}
			transition={PANEL_ANIMATIONS.transition}
			variants={PANEL_ANIMATIONS.variants}
		>
			<div className="inline-flex h-6 w-full shrink-0 items-center justify-between gap-2">
				<h2 className="truncate font-mono text-xs leading-none font-semibold">404</h2>

				<Link
					aria-label="Close project"
					className={cn(
						"inline-flex size-4 shrink-0 items-center justify-center rounded-full border border-foreground/50 bg-background text-foreground transition-colors",

						"focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-hidden",
						"hover:bg-foreground hover:text-background",
					)}
					to="/projects"
				>
					<XIcon className="size-3" />
				</Link>
			</div>

			<div className="min-h-0 flex-1 overflow-hidden rounded-sm border bg-background p-1">
				<dl className="flex w-full flex-col gap-1">
					<div className="grid w-full grid-cols-2 gap-2">
						<dt className="col-span-1 font-mono text-xs uppercase">[Status]</dt>
						<dd className="col-span-1 font-mono text-xs">404</dd>
					</div>
					<div className="grid w-full grid-cols-2 gap-2">
						<dt className="col-span-1 font-mono text-xs uppercase">[Summary]</dt>
						<dd className="col-span-1 font-mono text-xs uppercase">Project Not Found</dd>
					</div>
					<div className="grid w-full grid-cols-2 gap-2">
						<dt className="col-span-1 font-mono text-xs uppercase">[Tried Slug]</dt>
						<dd className="col-span-1 font-mono text-xs">{slug}</dd>
					</div>
				</dl>

				<p className="mt-2 font-sans text-xs font-medium">
					There&apos;s no project by that name. Pick one from the list instead.
				</p>

				<Link
					className={cn(
						"group/cta mt-2 inline-flex w-full cursor-pointer items-center justify-between gap-2 border px-2 py-1.5 transition-colors select-none",

						"focus-visible:bg-border/10 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-foreground",
						"hover:bg-foreground/20",
					)}
					to="/projects"
				>
					<span className="font-mono text-xs font-medium uppercase">View All Projects</span>

					<ArrowRightIcon
						className={cn(
							"size-3.5 transition-transform",

							"group-focus-visible/cta:translate-x-0.5",
							"group-hover/cta:translate-x-0.5",
						)}
					/>
				</Link>
			</div>
		</motion.section>
	);
}
