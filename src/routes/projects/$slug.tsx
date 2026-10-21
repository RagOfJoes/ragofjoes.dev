import { createFileRoute, notFound } from "@tanstack/react-router";

import { PROJECTS } from "./-projects";
import { ProjectsDetailPanel } from "./-projects-detail-panel";
import { ProjectsNotFoundPanel } from "./-projects-not-found-panel";

export const Route = createFileRoute("/projects/$slug")({
	loader: ({ params }) => {
		const project = PROJECTS.find((p) => p.slug === params.slug);
		if (!project) {
			throw notFound();
		}

		return project;
	},
	head: ({ loaderData }) => ({
		meta: loaderData ? [{ title: `${loaderData.name} • Victor Ragojos` }] : [],
	}),
	component: RouteComponent,
	notFoundComponent: () => <ProjectsNotFoundPanel />,
});

function RouteComponent() {
	const project = Route.useLoaderData();

	return <ProjectsDetailPanel project={project} />;
}
