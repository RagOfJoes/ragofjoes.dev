import { ScrollArea } from "@base-ui/react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { type HTMLMotionProps, motion } from "motion/react";

import { Image } from "@/components/image";
import { ImageViewer } from "@/components/image-viewer";
import { cn } from "@/lib/cn";
import { PANEL_ANIMATIONS } from "@/lib/constants";

import type { Project } from "./-projects";

export type ProjectsDetailPanelProps = HTMLMotionProps<"section"> & {
	project: Project;
};

/** A static window: striped frame, mono title bar, and a bordered body. */
export function ProjectsDetailPanel({ className, project, ...props }: ProjectsDetailPanelProps) {
	return (
		<motion.section
			{...props}
			className={cn(
				"flex min-h-32 min-w-0 flex-1 flex-col border border-foreground/70 bg-striped px-2 pb-2 text-foreground",

				className,
			)}
			transition={PANEL_ANIMATIONS.transition}
			variants={PANEL_ANIMATIONS.variants}
		>
			<div className="inline-flex h-6 w-full shrink-0 items-center justify-between gap-2">
				<h2 className="truncate font-mono text-xs leading-none font-semibold">{project.name}</h2>

				<Link
					aria-label="Close project"
					className={cn(
						"inline-flex size-4 shrink-0 items-center justify-center rounded-full border border-foreground/50 bg-background text-foreground transition-colors",

						"focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-hidden",
						"hover:bg-foreground hover:text-background",
					)}
					to="/projects"
				>
					<X className="size-3" />
				</Link>
			</div>

			<div className="min-h-0 flex-1 overflow-hidden rounded-sm border bg-background p-1">
				<div className="flex h-full w-full flex-col gap-2">
					<div className="shrink-0">
						<dl className="flex w-full flex-col gap-1">
							<div className="grid w-full grid-cols-2 gap-2">
								<dt className="col-span-1 font-mono text-xs uppercase">[Type]</dt>
								<dd className="col-span-1 font-mono text-xs">{project.type}</dd>
							</div>

							{project.source && (
								<div className="grid w-full grid-cols-2 gap-2">
									<dt className="col-span-1 font-mono text-xs uppercase">[Source]</dt>
									<dd className="col-span-1 font-mono text-xs">
										<a
											className={cn(
												"break-all underline",

												"focus-visible:bg-foreground focus-visible:text-background focus-visible:no-underline focus-visible:outline-hidden",
												"hover:bg-foreground hover:text-background hover:no-underline",
											)}
											href={project.source}
											rel="noopener noreferrer"
											target="_blank"
										>
											{project.source}
										</a>
									</dd>
								</div>
							)}

							<div className="grid w-full grid-cols-2 gap-2">
								<dt className="col-span-1 font-mono text-xs uppercase">[Link]</dt>
								<dd className="col-span-1 font-mono text-xs">
									<a
										className={cn(
											"break-all underline",

											"focus-visible:bg-foreground focus-visible:text-background focus-visible:no-underline focus-visible:outline-hidden",
											"hover:bg-foreground hover:text-background hover:no-underline",
										)}
										href={project.url}
										rel="noopener noreferrer"
										target="_blank"
									>
										{project.url}
									</a>
								</dd>
							</div>

							<div className="grid w-full grid-cols-2 gap-2">
								<dt className="col-span-1 font-mono text-xs uppercase">[Stack]</dt>
								<dd className="col-span-1 font-mono text-xs">{project.stack.join(", ")}</dd>
							</div>
						</dl>

						<p className="mt-2 font-sans text-xs font-medium">{project.description}</p>
					</div>

					<ScrollArea.Root className="relative flex min-h-0">
						<ScrollArea.Viewport
							aria-label="Screenshots"
							className={cn(
								"min-h-0 w-full overscroll-none",

								"focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-foreground",
							)}
							role="region"
						>
							<ScrollArea.Content
								className={cn(
									"grid grid-cols-2 gap-1",

									// Room for the scrollbar track, only when there's one
									"data-has-overflow-y:pr-2",
								)}
							>
								{project.images.map((image, index) => (
									<div
										key={image.src}
										className="col-span-1 flex aspect-square items-center justify-center bg-foreground/10 p-4"
									>
										<ImageViewer>
											<ImageViewer.Trigger
												style={{ aspectRatio: `${image.width} / ${image.height}` }}
											>
												<Image
													{...image}
													className="h-full select-none"
													decoding="async"
													fetchPriority={index === 0 ? "high" : "low"}
													loading={index === 0 ? "eager" : "lazy"}
													// A column of the screenshots: half of two thirds of the panel from
													// `lg`, else half of it
													sizes="(min-width: 1024px) 25vw, 50vw"
												/>
											</ImageViewer.Trigger>

											<ImageViewer.Popup {...image} />
										</ImageViewer>
									</div>
								))}
							</ScrollArea.Content>
						</ScrollArea.Viewport>

						<ScrollArea.Scrollbar className="m-0.5 flex w-1 justify-center rounded-full bg-foreground/10">
							<ScrollArea.Thumb className="w-full rounded-full bg-foreground/60" />
						</ScrollArea.Scrollbar>
					</ScrollArea.Root>
				</div>
			</div>
		</motion.section>
	);
}
