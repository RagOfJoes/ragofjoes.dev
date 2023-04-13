import { createMemo, on } from "solid-js";
import type { JSX } from "solid-js";

import type { RerunProps } from "./types";

function Rerun<T>(props: RerunProps<T>): JSX.Element {
	const key =
		typeof props.on === "function" || Array.isArray(props.on)
			? props.on
			: () => props.on;

	return createMemo(
		on(key as any, (a, b) => {
			const child = props.children;

			return typeof child === "function" && child.length > 0
				? (child as any)(a, b)
				: child;
		})
	) as unknown as JSX.Element;
}

export default Rerun;
