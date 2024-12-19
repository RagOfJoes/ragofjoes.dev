import { JSX, Show } from "solid-js";

import { mergeProps } from "@zag-js/solid";
import { Portal } from "solid-js/web";

import { useDialog } from "./use-dialog";
import { DialogProvider, useDialogContext } from "./use-dialog-context";

export type DialogProps = {
	children?: JSX.Element;
	initialFocusEl?: () => HTMLElement | null;
	onClose?: () => void;
	onOpen?: () => void;
};

export function Dialog(props: DialogProps) {
	const context = useDialog(props);

	return <DialogProvider value={context}>{props.children}</DialogProvider>;
}

export function DialogTrigger(props: JSX.HTMLAttributes<HTMLButtonElement>) {
	const { api } = useDialogContext();

	const mergedProps = mergeProps(props, api().getTriggerProps());

	return <button {...mergedProps} />;
}

export function DialogPortal(props: Parameters<typeof Portal>[0]) {
	const { api } = useDialogContext();

	return (
		<Show when={api().open}>
			<Portal>{props.children}</Portal>
		</Show>
	);
}

export function DialogContent(props: JSX.HTMLAttributes<HTMLDivElement>) {
	const { api } = useDialogContext();

	const mergedProps = mergeProps(api().getContentProps(), props);

	return <div {...mergedProps} />;
}
