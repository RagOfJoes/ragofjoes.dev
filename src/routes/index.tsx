import { createFileRoute } from "@tanstack/react-router";

import { AnimatedGrid } from "@/components/animated-grid";
import { Windows } from "@/components/windows";
import { IndexAbout } from "@/routes/_index/-index-about";
import { IndexExperience } from "@/routes/_index/-index-experience";
import { IndexProjects } from "@/routes/_index/-index-projects";
import { IndexSocials } from "@/routes/_index/-index-socials";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="h-full min-h-0 w-full px-2 pb-2">
			<div className="relative isolate h-full min-h-0 w-full">
				<AnimatedGrid className="absolute top-0 left-0 isolate z-0 h-full w-full" />

				<Windows defaultOpen={["About", "Experience", "Socials", "Projects"]}>
					<Windows.Area>
						<Windows.Dock side="left">
							<Windows.List>
								<Windows.Trigger value="About" />
								<Windows.Trigger value="Socials" />
								<Windows.Trigger value="Experience" />
								<Windows.Trigger value="Projects" />
							</Windows.List>

							<IndexAbout />
							<IndexExperience />
						</Windows.Dock>

						<Windows.Dock side="right">
							<IndexSocials />
						</Windows.Dock>

						<Windows.Dock side="bottom">
							<IndexProjects />
						</Windows.Dock>
					</Windows.Area>
				</Windows>
			</div>
		</main>
	);
}
