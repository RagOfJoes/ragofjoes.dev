import { createFileRoute } from "@tanstack/react-router";

import { ProjectsEmptyPanel } from "./-projects-empty-panel";

export const Route = createFileRoute("/projects/")({
	component: ProjectsEmptyPanel,
});
