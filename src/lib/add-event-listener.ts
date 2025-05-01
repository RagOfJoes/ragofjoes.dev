import { tryOnCleanup } from "@solid-primitives/utils";

export function addEventListener<T extends Window | Document | HTMLElement | EventTarget>(
	obj: T,
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	...args: Parameters<T["addEventListener"]> | [string, Function | null, ...any]
): void {
	obj.addEventListener(...(args as Parameters<HTMLElement["addEventListener"]>));

	tryOnCleanup(() => {
		obj.removeEventListener(...(args as Parameters<HTMLElement["addEventListener"]>));
	});
}
