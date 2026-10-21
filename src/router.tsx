import { createRouter } from "@tanstack/react-router";

import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import { DefaultNotFound } from "@/components/default-not-found";

import { routeTree } from "./routeTree.gen";

export function getRouter() {
	return createRouter({
		routeTree,

		defaultErrorComponent: DefaultCatchBoundary,
		defaultNotFoundComponent: DefaultNotFound,
		defaultPreload: "intent",
		defaultStructuralSharing: true,
		scrollRestoration: true,
	});
}
