import { createContext } from "@/lib/create-context";

import type { UseWindows } from "./use-windows";
import type { WindowHandleProps } from "./use-windows-panel-drag";

export const [WindowsProvider, useWindowsContext] = createContext<UseWindows>({
	name: "WindowsContext",
	hookName: "useWindowsContext",
	providerName: "<Windows>",
});

// An object rather than the bare value: the helper treats falsy values as a
// missing provider, so an empty-string `value` would throw.
const [WindowProvider, useWindowContext] = createContext<{
	value: string;
	/** For the header: dragging the window by it. */
	handleProps: WindowHandleProps;
}>({
	name: "WindowContext",
	hookName: "useWindowValue",
	providerName: "<Windows.Panel>",
});

export { WindowProvider };

export function useWindowValue() {
	return useWindowContext().value;
}

export function useWindowHandleProps() {
	return useWindowContext().handleProps;
}
