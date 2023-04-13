import type { Accessor, JSX } from "solid-js";

import { connect } from "@zag-js/dialog";
import { Portal } from "solid-js/web";

export type DialogProps = {
	children?: JSX.Element;
	onClose?: () => void;
	onOpen?: () => void;
};

export type DialogTriggerProps = JSX.HTMLAttributes<HTMLButtonElement>;

export type DialogPortalProps = Parameters<typeof Portal>[0];

export type DialogContainerProps = JSX.HTMLAttributes<HTMLDivElement>;

export type DialogContentProps = JSX.HTMLAttributes<HTMLDivElement>;

export type UseDialog = {
	api: Accessor<ReturnType<typeof connect>>;
	dialogProps: DialogProps;
};
