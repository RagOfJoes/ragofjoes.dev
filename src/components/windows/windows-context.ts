import { createContext } from "@/lib/create-context";

import type { UseWindows } from "./use-windows";

export const [WindowsProvider, useWindowsContext] = createContext<UseWindows>({
	name: "WindowsContext",
	strict: true,
});
