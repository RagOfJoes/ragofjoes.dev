import { batch, createSignal } from "solid-js";
import type { Accessor } from "solid-js";

import { WINDOWS } from "@/lib/constants";

import type { WindowsProps } from "./windows";

export type WindowState = {
	name: string;
	isOpen: boolean;
	position: { x: number; y: number };
	zIndex: number;
};

export type UseWindows = [
	state: {
		container: Accessor<HTMLDivElement | null>;
		windows: Accessor<WindowState[]>;
	},
	actions: {
		bringToFront: (name: string) => void;
		setContainer: (e: HTMLDivElement) => void;
		toggleIsWindowOpen: (name: string) => void;
		updateWindowPosition: (name: string, position: { x: number; y: number }) => void;
	},
];

export function useWindows(_: WindowsProps): UseWindows {
	const [container, setContainer] = createSignal<HTMLDivElement | null>(null);
	const [windows, setWindows] = createSignal<WindowState[]>(
		WINDOWS.map((w, i) => {
			return {
				name: w.name,
				isOpen: w.isOpen,
				position: {
					x: 0,
					y: 0,
				},
				zIndex: Number(w.style?.["z-index"] ?? i),
			};
		}),
	);

	const bringToBack = (name: string) => {
		const prev = windows();

		const target = prev.find((w) => {
			return w.name === name;
		});
		if (!target || target.zIndex === 0) {
			return;
		}

		setWindows(
			prev.map((w) => {
				if (w.name === name) {
					return { ...w, zIndex: 0 };
				}
				if (w.zIndex < target.zIndex) {
					return { ...w, zIndex: w.zIndex + 1 };
				}

				return w;
			}),
		);
	};
	const bringToFront = (name: string) => {
		const prev = windows();
		const maxZ = prev.length;

		const targetWindow = prev.find((w) => {
			return w.name === name;
		});
		if (!targetWindow || targetWindow.zIndex === maxZ) {
			return;
		}

		setWindows(
			prev.map((w) => {
				if (w.name === name) {
					return { ...w, zIndex: maxZ };
				}

				if (w.zIndex > targetWindow.zIndex) {
					return { ...w, zIndex: Math.max(w.zIndex - 1, 1) };
				}

				return w;
			}),
		);
	};
	const toggleIsWindowOpen = (name: string) => {
		const prev = windows();

		const targetWindow = prev.find((w) => {
			return w.name === name;
		});
		if (!targetWindow) {
			return;
		}

		batch(() => {
			setWindows(
				windows().map((w) => {
					if (w.name !== name) {
						return w;
					}

					return {
						...w,
						isOpen: !w.isOpen,
						position: w.isOpen
							? w.position
							: {
									x: 0,
									y: 0,
								},
					};
				}),
			);

			if (targetWindow.isOpen) {
				bringToBack(name);
			} else {
				bringToFront(name);
			}
		});
	};
	const updateWindowPosition = (name: string, position: { x: number; y: number }) => {
		setWindows(
			windows().map((w) => {
				if (w.name !== name) {
					return w;
				}

				return {
					...w,
					position,
				};
			}),
		);
	};

	return [
		{
			container,
			windows,
		},
		{
			bringToFront,
			setContainer,
			toggleIsWindowOpen,
			updateWindowPosition,
		},
	];
}
