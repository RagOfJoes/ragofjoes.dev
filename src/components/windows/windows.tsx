import type { ReactNode } from "react";

import { useWindows } from "./use-windows";
import { WindowsArea } from "./windows-area";
import { WindowsProvider } from "./windows-context";
import { WindowsDock } from "./windows-dock";
import { WindowsList } from "./windows-list";
import {
	WindowsClose,
	WindowsContent,
	WindowsControls,
	WindowsFullscreen,
	WindowsHeader,
	WindowsPanel,
	WindowsReset,
	WindowsTitle,
} from "./windows-panel";
import { WindowsTrigger } from "./windows-trigger";

export type WindowsProps = {
	children: ReactNode;
	/** Values of the windows that start open. */
	defaultOpen?: readonly string[];
};

function WindowsRoot({ children, defaultOpen = [] }: WindowsProps) {
	const windows = useWindows({ defaultOpen });

	return <WindowsProvider value={windows}>{children}</WindowsProvider>;
}

export const Windows = Object.assign(WindowsRoot, {
	Area: WindowsArea,
	Close: WindowsClose,
	Content: WindowsContent,
	Controls: WindowsControls,
	Dock: WindowsDock,
	Fullscreen: WindowsFullscreen,
	Header: WindowsHeader,
	List: WindowsList,
	Panel: WindowsPanel,
	Reset: WindowsReset,
	Title: WindowsTitle,
	Trigger: WindowsTrigger,
});
