import { createContext } from "@/lib/createContext";

import type { UseDialog } from "./types";

export const [DialogProvider, useDialogContext] = createContext<UseDialog>({
	strict: true,
	name: "DialogContext",
});
