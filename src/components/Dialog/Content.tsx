import { mergeProps } from "solid-js";

import { useDialogContext } from "./Context";
import type { DialogContentProps } from "./types";

export function DialogContent(props: DialogContentProps) {
	const { api } = useDialogContext();

	const mergedProps = mergeProps(api().contentProps, props);

	return <div {...mergedProps} />;
}
