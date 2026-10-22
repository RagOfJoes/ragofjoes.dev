import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

export type WindowsDockProps = ComponentProps<"div"> & {
	side: "bottom" | "left" | "right";
};

/**
 * Stacks its windows along one edge of the area. Window sizes come from here,
 * so adding or removing a window is just adding or removing it from a dock.
 *
 * Below `md` every dock shares the area's single cell, pinned to its edge, so
 * docks overlap rather than scroll; clicking a window brings it to the front.
 */
export function WindowsDock({ className, side, ...props }: WindowsDockProps) {
	return (
		<div
			{...props}
			className={cn(
				"flex min-h-0 gap-2",

				"*:max-w-full",
				"data-[side=bottom]:col-span-full data-[side=bottom]:row-start-2 data-[side=bottom]:flex-row data-[side=bottom]:*:flex-1 data-[side=bottom]:max-md:row-start-1 data-[side=bottom]:max-md:self-end",
				"data-[side=left]:col-start-1 data-[side=left]:row-start-1 data-[side=left]:flex-col data-[side=left]:items-start data-[side=left]:*:w-80 data-[side=left]:max-md:justify-self-start",
				"data-[side=right]:col-start-3 data-[side=right]:row-start-1 data-[side=right]:flex-col data-[side=right]:items-end data-[side=right]:*:w-80 data-[side=right]:max-md:col-start-1 data-[side=right]:max-md:self-start data-[side=right]:max-md:justify-self-end",

				className,
			)}
			data-side={side}
		/>
	);
}
