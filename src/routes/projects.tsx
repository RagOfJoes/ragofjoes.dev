import { useState } from "react";

import { createFileRoute, Outlet, useParams } from "@tanstack/react-router";
import { motion, stagger } from "motion/react";

import { AnimatedGrid } from "@/components/animated-grid";
import { useIntroContext } from "@/components/intro";
import { cn } from "@/lib/cn";
import { PANEL_ANIMATIONS } from "@/lib/constants";
import { getSeoMeta } from "@/lib/seo";
import { ProjectsListPanel } from "@/routes/projects/-projects-list-panel";

export const Route = createFileRoute("/projects")({
	head: () => ({
		meta: getSeoMeta({
			description:
				"Projects by Victor Ragojos, from multiplayer web games to the infrastructure behind them.",
			title: "Projects • Victor Ragojos",
		}),
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const { slug } = useParams({ strict: false });

	const [{ isPlaying }] = useIntroContext();
	const [isWaitingForIntro] = useState(isPlaying);

	return (
		<main className="h-full min-h-0 w-full px-2 pb-2">
			<div className="relative isolate h-full min-h-0 w-full">
				<AnimatedGrid className="absolute top-0 left-0 isolate z-0 h-full w-full" />

				{/*
				 * Opens the panels like the home page's windows: on first load once the
				 * intro is done, one after another; otherwise right away. A panel that
				 * mounts later, like the next project, opens on its own.
				 */}
				<motion.div
					animate={isPlaying ? "closed" : "open"}
					className="relative isolate flex h-full min-h-0 w-full gap-2 p-2"
					inert={isPlaying}
					initial="closed"
					variants={{
						open: {
							transition: {
								delayChildren: isWaitingForIntro ? stagger(PANEL_ANIMATIONS.stagger) : 0,
							},
						},
					}}
				>
					{/* On small screens only one panel shows: the list, or the selected project */}
					<ProjectsListPanel
						className={cn(
							"w-80 shrink-0",

							"max-md:data-[is-project-selected=false]:w-full",
							"max-md:data-[is-project-selected=true]:hidden",
						)}
						data-is-project-selected={!!slug}
					/>

					<Outlet />
				</motion.div>
			</div>
		</main>
	);
}
