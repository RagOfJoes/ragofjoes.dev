import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import { AnimatedGrid } from "@/components/animated-grid";
import { useIntroContext } from "@/components/intro";
import { cn } from "@/lib/cn";
import { PANEL_ANIMATIONS } from "@/lib/constants";

export function DefaultNotFound() {
	const pathname = useLocation({
		select: (location) => location.pathname,
	});

	const [{ isPlaying }] = useIntroContext();

	return (
		<main className="h-full min-h-0 w-full px-2 pb-2">
			<div className="relative isolate inline-flex h-full min-h-0 w-full items-center justify-center p-2">
				<AnimatedGrid className="absolute top-0 left-0 isolate z-0 h-full w-full" />

				{/* Opens like the home page's panels: once the grid has drawn on first load */}
				<motion.section
					animate={isPlaying ? "closed" : "open"}
					className="relative isolate flex min-h-0 flex-col border border-foreground/70 bg-striped px-2 pb-2"
					initial="closed"
					transition={PANEL_ANIMATIONS.transition}
					variants={PANEL_ANIMATIONS.variants}
				>
					<div className="inline-flex h-6 w-full shrink-0 items-center justify-between">
						<h2 className="font-mono text-xs leading-none font-semibold">404</h2>
					</div>

					<div className="min-h-0 flex-1 overflow-hidden rounded-sm border bg-background p-1">
						<dl className="flex w-full flex-col gap-1">
							<div className="grid w-full grid-cols-2 gap-2">
								<dt className="col-span-1 font-mono text-xs uppercase">[Status]</dt>
								<dd className="col-span-1 font-mono text-xs">404</dd>
							</div>

							<div className="grid w-full grid-cols-2 gap-2">
								<dt className="col-span-1 font-mono text-xs uppercase">[Summary]</dt>
								<dd className="col-span-1 font-mono text-xs uppercase">Page Not Found</dd>
							</div>

							<div className="grid w-full grid-cols-2 gap-2">
								<dt className="col-span-1 font-mono text-xs uppercase">[Tried Path]</dt>
								<dd className="col-span-1 font-mono text-xs">{pathname}</dd>
							</div>
						</dl>

						<p className="mt-2 font-sans text-xs font-medium">
							Seems like what you're looking doesn&apos;t exist on the map. Let's get you back on
							track.
						</p>

						{/* Inverted like the selected project row: the site's way of saying "this one" */}
						<Link
							className={cn(
								"group/cta mt-2 inline-flex w-full cursor-pointer items-center justify-between gap-2 border px-2 py-1.5 transition-colors select-none",

								"focus-visible:bg-border/10 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-foreground",
								"hover:bg-foreground/20",
							)}
							to="/"
						>
							<span className="font-mono text-xs font-medium uppercase">Take Me Home</span>

							<ArrowRight
								className={cn(
									"size-3.5 transition-transform",

									"group-focus-visible/cta:translate-x-0.5",
									"group-hover/cta:translate-x-0.5",
								)}
							/>
						</Link>
					</div>
				</motion.section>
			</div>
		</main>
	);
}
