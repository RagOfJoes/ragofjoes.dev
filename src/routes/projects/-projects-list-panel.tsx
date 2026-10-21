import { Link } from "@tanstack/react-router";
import { type HTMLMotionProps, motion } from "motion/react";

import { FolderIcon } from "@/components/folder-icon";
import { cn } from "@/lib/cn";
import { PANEL_ANIMATIONS } from "@/lib/constants";

import { PROJECTS } from "./-projects";

export type ProjectsListPanelProps = HTMLMotionProps<"section">;

/** A static window: striped frame, mono title bar, and a bordered body. */
export function ProjectsListPanel({ className, ...props }: ProjectsListPanelProps) {
	return (
		<motion.section
			{...props}
			className={cn(
				"flex min-h-32 min-w-0 flex-col border border-foreground/70 bg-striped px-2 pb-2 text-foreground",

				className,
			)}
			transition={PANEL_ANIMATIONS.transition}
			variants={PANEL_ANIMATIONS.variants}
		>
			<div className="inline-flex h-6 w-full shrink-0 items-center justify-between gap-2">
				<h2 className="truncate font-mono text-xs leading-none font-semibold">
					Projects [{PROJECTS.length}]
				</h2>
			</div>

			<div className="min-h-0 flex-1 overflow-hidden rounded-sm border bg-background p-1">
				<ul className="no-scrollbar inline-flex h-full w-full flex-col overflow-y-auto">
					{PROJECTS.map((project) => (
						<li key={project.slug} className="inline-flex w-full">
							<Link
								className={cn(
									"inline-flex w-full items-center gap-2 border-b py-1",

									"aria-[current=page]:bg-foreground aria-[current=page]:text-background aria-[current=page]:[--folder-fill:var(--color-foreground)]",
									"focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-hidden focus-visible:[--folder-fill:var(--color-foreground)]",
									"hover:bg-foreground hover:text-background hover:[--folder-fill:var(--color-foreground)]",
								)}
								params={{ slug: project.slug }}
								to="/projects/$slug"
							>
								{({ isActive }) => (
									<>
										<FolderIcon isOpen={isActive} />

										<span className="font-sans text-sm font-medium select-none">
											{project.name}
										</span>
									</>
								)}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</motion.section>
	);
}
