import { useSyncExternalStore } from "react";

import { Link } from "@tanstack/react-router";

import { Image } from "@/components/image";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/constants";

const NAV_LINK_CLASS_NAME = cn(
	"font-sans text-sm font-medium text-muted-foreground transition-colors select-none",

	"aria-[current=page]:text-foreground aria-[current=page]:focus-visible:text-background",
	"focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-hidden",
	"hover:text-foreground",
);

export function Header() {
	return (
		<header
			className={cn(
				"grid w-full grid-cols-12 gap-2 p-2",

				"print:hidden",
			)}
		>
			<div
				className={cn(
					"col-span-4",

					"max-md:col-span-6",
				)}
			>
				<Link
					className={cn(
						"inline-flex h-full items-center gap-2",

						"focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-hidden",
					)}
					to="/"
				>
					<Image
						alt="Avatar"
						className={cn(
							"size-5 rounded-full",

							"[&>div]:rounded-full",
							"[&>img]:rounded-full",
						)}
						src="/android-chrome-192x192.png?v=2"
					/>

					<h1 className="font-sans text-sm leading-none font-medium select-none">{SITE.name}</h1>
				</Link>
			</div>

			<nav
				aria-label="Primary"
				className={cn(
					"col-span-4 h-full",

					"max-md:col-span-6",
				)}
			>
				<ul
					className={cn(
						"inline-flex h-full w-full items-center gap-2",

						"max-md:justify-end",
					)}
				>
					<li className="inline-flex h-full items-center">
						<Link activeOptions={{ exact: true }} className={NAV_LINK_CLASS_NAME} to="/">
							<span>Home</span>
							<span className="sr-only">Go to home page</span>
						</Link>
					</li>

					<li className="inline-flex h-full items-center">
						<Link className={NAV_LINK_CLASS_NAME} to="/projects">
							<span>Projects</span>
							<span className="sr-only">Go to projects page</span>
						</Link>
					</li>

					<li className="inline-flex h-full items-center">
						<Link className={NAV_LINK_CLASS_NAME} to="/resume">
							<span>Resume</span>
							<span className="sr-only">Go to resume page</span>
						</Link>
					</li>
				</ul>
			</nav>

			<div
				className={cn(
					"col-span-4 inline-flex h-full w-full items-center justify-end",

					"max-md:hidden",
				)}
			>
				<CurrentDate />
			</div>
		</header>
	);
}

const MONTH_FORMAT = new Intl.DateTimeFormat("en-US", { month: "short" });

function noopSubscribe() {
	return () => {};
}

/**
 * Today's date in the viewer's timezone, e.g. `[Oct. 20, 2026]`.
 *
 * Rendered client-side only: the server's "today" can differ from the
 * viewer's, which would be a hydration mismatch. The server snapshot is `null`,
 * so SSR renders the loading placeholder instead.
 */
function CurrentDate() {
	const now = useSyncExternalStore(
		noopSubscribe,
		() => new Date().toDateString(),
		() => null,
	);

	const date = now ? new Date(now) : null;

	return (
		<time
			className={cn(
				"font-mono text-[11px] leading-none font-medium transition-colors select-none",

				"data-[is-loading=true]:bg-foreground",
			)}
			data-is-loading={!date}
			dateTime={date ? toISODate(date) : undefined}
		>
			{date
				? `[${MONTH_FORMAT.format(date)}. ${date.getDate()}, ${date.getFullYear()}]`
				: "Feb. 13, 2000"}
		</time>
	);
}

function toISODate(date: Date) {
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${date.getFullYear()}-${month}-${day}`;
}
