import { createMemo, on } from "solid-js";
import type { Accessor, JSX } from "solid-js";

import { AccessorArray } from "solid-js/types/reactive/signal";

export type RerunProps<T> = {
	children: ((input: T, prevInput: T | undefined) => JSX.Element) | JSX.Element;
	on: T | Accessor<T> | AccessorArray<T>;
};

export function Rerun<T>(props: RerunProps<T>): JSX.Element {
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
		}),
	) as unknown as JSX.Element;
}
