import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

export function WindowsList({ className, ...props }: ComponentProps<"ul">) {
	return (
		<ul
			{...props}
			className={cn(
				"grid shrink-0 grid-cols-2 gap-2",

				className,
			)}
		/>
	);
}
