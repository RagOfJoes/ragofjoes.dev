import { Accessor, createEffect, createMemo, createUniqueId } from "solid-js";

import * as dialog from "@zag-js/dialog";
import { connect } from "@zag-js/dialog";
import { normalizeProps, useMachine } from "@zag-js/solid";

import { DialogProps } from "./dialog";

export type UseDialog = {
	api: Accessor<ReturnType<typeof connect>>;
	dialogProps: DialogProps;
};

export function useDialog(props: DialogProps): UseDialog {
	const { onClose = () => {}, onOpen = () => {} } = props;

	const [state, send] = useMachine(
		dialog.machine({
			closeOnEscapeKeyDown: true,
			closeOnInteractOutside: true,
			id: createUniqueId(),
			preventScroll: false,
		}),
	);

	const api = createMemo(() => dialog.connect(state, send, normalizeProps));

	createEffect(() => {
		if (api().isOpen) {
			onOpen();
			return;
		}

		onClose();
	});

	return {
		api,
		dialogProps: props,
	};
}
