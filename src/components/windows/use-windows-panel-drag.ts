import { type PointerEvent, type RefCallback, useCallback, useEffect, useRef } from "react";

import { clamp } from "@/lib/clamp";

import type { Offset, WindowPosition } from "./use-windows";

import { useWindowsContext } from "./windows-context";

/** Below this (px), a press on the header stays a press, so its buttons still get clicked. */
const DRAG_THRESHOLD = 4;

type Drag = {
	/** The window being dragged; it's flagged with `data-dragging` while it moves. */
	element: HTMLElement;
	/** The pressed header; it takes the pointer capture once dragging starts. */
	handle: HTMLElement;
	pointerId: number;
	start: Offset;
	/** Set once the pointer has moved past `DRAG_THRESHOLD`. */
	active: { origin: Offset; min: Offset; max: Offset } | null;
	/** Removes the window listeners following the pointer. */
	stop: () => void;
};

export type WindowHandleProps = {
	onPointerDown: (e: PointerEvent<HTMLElement>) => void;
	ref: RefCallback<HTMLElement>;
};

/**
 * Drags a window by its header, within the area. Motion values move it without
 * re-rendering anything; the provider only supplies what's shared (the area's
 * bounds, whether it's fullscreen). Returns the props for the header.
 */
export function useWindowsPanelDrag(value: string, position: WindowPosition): WindowHandleProps {
	const [{ getBounds, getPanelElement, getWindow }] = useWindowsContext();
	const drag = useRef<Drag | null>(null);

	const onDragEnd = useCallback(() => {
		if (!drag.current) {
			return;
		}

		drag.current.stop();
		delete drag.current.element.dataset.dragging;
		drag.current = null;
	}, []);

	const onDragMove = useCallback(
		(e: globalThis.PointerEvent) => {
			const current = drag.current;
			if (!current || e.pointerId !== current.pointerId) {
				return;
			}

			const dx = e.clientX - current.start.x;
			const dy = e.clientY - current.start.y;

			if (!current.active) {
				const bounds = getBounds(value);
				if (Math.hypot(dx, dy) < DRAG_THRESHOLD || !bounds) {
					return;
				}

				// Stop a running reset. The capture is only so a drag that started on a
				// button doesn't click it: captured, the release lands on the handle
				position.x.stop();
				position.y.stop();
				current.handle.setPointerCapture(current.pointerId);
				current.element.dataset.dragging = "";

				current.active = { origin: { x: position.x.get(), y: position.y.get() }, ...bounds };
			}

			const { origin, min, max } = current.active;
			position.x.set(clamp(origin.x + dx, min.x, max.x));
			position.y.set(clamp(origin.y + dy, min.y, max.y));
		},
		[getBounds, position, value],
	);

	const onPointerDown = useCallback(
		(e: PointerEvent<HTMLElement>) => {
			const element = getPanelElement(value);
			if (e.button !== 0 || !element || getWindow(value).isFullscreen) {
				return;
			}

			onDragEnd();

			// Follow the pointer on the window, not the header: before the threshold
			// there's no capture yet, and a pointer that leaves the header (e.g. pressed
			// near its edge) would otherwise stop reporting moves
			const { pointerId } = e;
			const onEnd = (event: globalThis.PointerEvent) => {
				if (event.pointerId === pointerId) {
					onDragEnd();
				}
			};
			window.addEventListener("pointermove", onDragMove);
			window.addEventListener("pointerup", onEnd);
			window.addEventListener("pointercancel", onEnd);

			drag.current = {
				element,
				handle: e.currentTarget,
				pointerId,
				start: { x: e.clientX, y: e.clientY },
				active: null,
				stop: () => {
					window.removeEventListener("pointermove", onDragMove);
					window.removeEventListener("pointerup", onEnd);
					window.removeEventListener("pointercancel", onEnd);
				},
			};
		},
		[getPanelElement, getWindow, onDragEnd, onDragMove, value],
	);

	// Unmounted mid-drag: don't leave its window listeners behind
	useEffect(() => onDragEnd, [onDragEnd]);

	// Touch browsers retarget a touch to a nearby tap target, and only count
	// elements with mouse listeners of their own as one (React's live on the root).
	// So a touch near the header's edge could land on a button next to it, like
	// the folders just above a window, and click it instead of dragging. A no-op
	// listener makes the header count.
	const ref = useCallback((element: HTMLElement | null) => {
		if (!element) {
			return;
		}

		const noop = () => {};
		element.addEventListener("mousedown", noop);
		return () => element.removeEventListener("mousedown", noop);
	}, []);

	return { onPointerDown, ref };
}
