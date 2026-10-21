import { createFileRoute } from "@tanstack/react-router";

import { AnimatedGrid } from "@/components/animated-grid";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="h-full min-h-0 w-full px-2 pb-2">
			<div className="relative isolate h-full min-h-0 w-full">
				<AnimatedGrid className="absolute top-0 left-0 isolate z-0 h-full w-full" />
			</div>
		</main>
	);
}
