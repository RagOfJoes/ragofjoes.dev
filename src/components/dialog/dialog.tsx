import { useState } from "react";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";

import { DialogProvider } from "./dialog-context";
import {
	DialogClose,
	DialogContent,
	DialogControls,
	DialogHeader,
	DialogPopup,
	DialogTitle,
} from "./dialog-popup";

export type DialogProps = BaseDialog.Root.Props;

/**
 * A modal window, styled like the home page's windows, that zooms out of the
 * trigger that opened it. Built on Base UI's Dialog, which handles focus,
 * Escape, outside clicks and returning focus to the trigger.
 *
 * @example
 * <Dialog>
 * 	<Dialog.Trigger>Open</Dialog.Trigger>
 * 	<Dialog.Popup>
 * 		<Dialog.Header>
 * 			<Dialog.Title>Title</Dialog.Title>
 * 			<Dialog.Controls>
 * 				<Dialog.Close />
 * 			</Dialog.Controls>
 * 		</Dialog.Header>
 * 		<Dialog.Content>…</Dialog.Content>
 * 	</Dialog.Popup>
 * </Dialog>
 */
function DialogRoot({ onOpenChange, ...props }: DialogProps) {
	const [trigger, setTrigger] = useState<Element | null>(null);

	return (
		<DialogProvider value={{ trigger }}>
			<BaseDialog.Root
				{...props}
				onOpenChange={(open, details) => {
					if (open) {
						setTrigger(details.trigger ?? null);
					}

					onOpenChange?.(open, details);
				}}
			/>
		</DialogProvider>
	);
}

export const Dialog = Object.assign(DialogRoot, {
	Close: DialogClose,
	Content: DialogContent,
	Controls: DialogControls,
	Header: DialogHeader,
	Popup: DialogPopup,
	Title: DialogTitle,
	Trigger: BaseDialog.Trigger,
});
