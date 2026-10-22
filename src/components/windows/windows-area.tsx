import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

import { useWindowsContext } from "./windows-context";

/**
 * The desktop: drag bounds, what a fullscreen window fills, and the frame the
 * docks sit in (left and right docks around an empty middle, bottom dock below).
 * Never scrolls: when space runs out, windows overlap instead.
 */
export function WindowsArea({ className, ...props }: ComponentProps<"div">) {
	const [, { getAreaProps }] = useWindowsContext();

	return (
		<div
			{...props}
			{...getAreaProps()}
			className={cn(
				"relative isolate grid h-full min-h-0 grid-cols-[auto_1fr_auto] grid-rows-[minmax(0,1fr)_auto] gap-2 overflow-hidden p-2",

				"max-md:grid-cols-1 max-md:grid-rows-1",

				className,
			)}
		/>
	);
}
