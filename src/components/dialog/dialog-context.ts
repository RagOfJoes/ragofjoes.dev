import { createContext } from "@/lib/create-context";

// An object rather than the bare element: the helper treats falsy values as a
// missing provider, and there's no trigger until the dialog first opens.
export const [DialogProvider, useDialogContext] = createContext<{
	/** The trigger that last opened the dialog, for the popup to zoom out of. */
	trigger: Element | null;
}>({
	name: "DialogContext",
	hookName: "useDialogContext",
	providerName: "<Dialog>",
});
