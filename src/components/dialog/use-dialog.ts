import { Accessor, createMemo, createUniqueId } from "solid-js";

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
			closeOnEscape: true,
			closeOnInteractOutside: true,
			id: createUniqueId(),
			onOpenChange: (details) => {
				if (!details.open) {
					onClose();

					return;
				}

				onOpen();
			},
			preventScroll: false,
		}),
	);

	const api = createMemo(() => dialog.connect(state, send, normalizeProps));

	return {
		api,
		dialogProps: props,
	};
}
