import {
	ErrorComponent,
	type ErrorComponentProps,
	Link,
	rootRouteId,
	useMatch,
	useRouter,
} from "@tanstack/react-router";

import { cn } from "@/lib/cn";

export function DefaultCatchBoundary({ error }: Readonly<ErrorComponentProps>) {
	const router = useRouter();
	const isRoot = useMatch({
		strict: false,
		select: (state) => state.id === rootRouteId,
	});

	console.error(error);

	return (
		<div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-6 p-4">
			<ErrorComponent error={error} />

			<div className="flex flex-wrap items-center gap-2">
				<button
					className={cn(
						"border px-3 py-1.5 font-mono text-xs uppercase transition-colors",

						"hover:bg-foreground hover:text-background",
					)}
					type="button"
					onClick={async () => {
						await router.invalidate();
					}}
				>
					Try again
				</button>

				{isRoot ? (
					<Link className="font-mono text-xs uppercase underline" to="/">
						Home
					</Link>
				) : (
					<Link
						className="font-mono text-xs uppercase underline"
						to="/"
						onClick={(e) => {
							e.preventDefault();
							window.history.back();
						}}
					>
						Go back
					</Link>
				)}
			</div>
		</div>
	);
}
