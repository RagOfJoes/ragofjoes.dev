import { tryOnCleanup } from "@solid-primitives/utils";

function addEventListener<
	T extends Window | Document | HTMLElement | EventTarget
>(
	obj: T,
	...args: Parameters<T["addEventListener"]> | [string, Function | null, ...any]
): void {
	obj.addEventListener(
		...(args as Parameters<HTMLElement["addEventListener"]>)
	);

	tryOnCleanup(() => {
		obj.removeEventListener(
			...(args as Parameters<HTMLElement["addEventListener"]>)
		);
	});
}

export default addEventListener;
