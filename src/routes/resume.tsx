import { createFileRoute } from "@tanstack/react-router";

import { AnimatedGrid } from "@/components/animated-grid";
import { useIntroContext } from "@/components/intro";
import { cn } from "@/lib/cn";
import { getSeoMeta } from "@/lib/seo";

import { ResumePanel } from "./_resume/-resume-panel";

export const Route = createFileRoute("/resume")({
	head: () => ({
		meta: getSeoMeta({
			description:
				"Resume of Victor Ragojos, a senior software engineer in San Francisco: experience at SenseMesh and Offset Partners, and skills across React, TypeScript, Go and more.",
			title: "Resume • Victor Ragojos",
		}),
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const [{ isPlaying }] = useIntroContext();

	return (
		<main
			className={cn(
				"h-full min-h-0 w-full px-2 pb-2",

				"print:h-auto print:p-0",
			)}
		>
			<div
				className={cn(
					"relative isolate flex h-full min-h-0 w-full p-2",

					"print:block print:h-auto print:p-0",
				)}
			>
				<AnimatedGrid
					className={cn(
						"absolute top-0 left-0 isolate z-0 h-full w-full",

						"print:hidden",
					)}
				/>

				{/* Opens like the home page's windows: once the grid has drawn on first load */}
				<ResumePanel
					animate={isPlaying ? "closed" : "open"}
					className="relative"
					inert={isPlaying}
					initial="closed"
				/>
			</div>
		</main>
	);
}
