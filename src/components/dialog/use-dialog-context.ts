import { createContext } from "@/lib/create-context";

import { UseDialog } from "./use-dialog";

export const [DialogProvider, useDialogContext] = createContext<UseDialog>({
	name: "DialogContext",
	strict: true,
});
