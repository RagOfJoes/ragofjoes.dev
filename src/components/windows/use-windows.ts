import {
	type ComponentProps,
	type CSSProperties,
	useCallback,
	useId,
	useRef,
	useState,
} from "react";

import { animate, type MotionValue } from "motion/react";

import { useIntroContext } from "@/components/intro";
import { clamp } from "@/lib/clamp";
import { PANEL_ANIMATIONS } from "@/lib/constants";

import type { WindowsArea } from "./windows-area";
import type { WindowsPanelProps } from "./windows-panel";
import type { WindowsTriggerProps } from "./windows-trigger";

export type Offset = { x: number; y: number };

export type WindowState = {
	isFullscreen: boolean;
	isOpen: boolean;
	/** Size of the placeholder holding the window's place in its dock while it's fullscreen. */
	slot: CSSProperties | null;
};

/** Drag offset from the window's slot in the layout. Created by the panel. */
export type WindowPosition = { x: MotionValue<number>; y: MotionValue<number> };

type State = {
	defaultOpen: readonly string[];
	/** Stacking order, back to front. Windows not in it sit below all of these. */
	order: string[];
	/** Only windows that have been interacted with; the rest use defaults. */
	windows: Record<string, WindowState>;
};

type Panel = WindowPosition & { element: HTMLElement };

/** Bookkeeping for a fullscreen window, kept until it lands back in its slot. */
type Fullscreen = {
	/** Where it was dragged to, so restoring puts it back there. */
	offset: Offset;
	/** Its dock's children, pinned, with the inline `flex` to restore. */
	pinned: { element: HTMLElement; flex: string }[];
	slot: CSSProperties;
};

const ORIGIN: Offset = { x: 0, y: 0 };

/**
 * How long (ms) the area has to stop resizing before a fullscreen window exits.
 * Motion blocks layout animations until 250ms after the window's width last
 * changed, so exiting any sooner would snap instead of animate.
 */
const RESIZE_SETTLE = 300;

export type UseWindowsArgs = {
	defaultOpen: readonly string[];
};

export type UseWindowsState = {
	/**
	 * For windows mounted during the first-load intro: they wait for it to
	 * complete, then a window and its trigger appear after this long (s), one
	 * after another. `null` if there's nothing to wait for, or the window has
	 * been opened or closed.
	 */
	getRevealDelay: (value: string) => number | null;
	/** A window's state, with defaults for windows that haven't been interacted with. */
	getWindow: (value: string) => WindowState;
	/** The offset range that keeps a window inside the area; `null` before both are mounted. */
	getBounds: (value: string) => { min: Offset; max: Offset } | null;
	getPanelElement: (value: string) => HTMLElement | null;
};

export type UseWindowsActions = {
	bringToFront: (value: string) => void;
	close: (value: string) => void;
	/** Animates a window back to its slot. */
	reset: (value: string) => void;
	toggleFullscreen: (value: string) => void;
	toggleOpen: (value: string) => void;

	getAreaProps: () => Pick<ComponentProps<typeof WindowsArea>, "ref">;
	/** `null` unless the window is fullscreen and needs its place in the dock held. */
	getPlaceholderProps: (
		value: string,
	) => Pick<ComponentProps<"div">, "aria-hidden" | "style"> | null;
	getTriggerProps: (value: string) => Pick<
		WindowsTriggerProps,
		"aria-controls" | "aria-expanded" | "onClick"
	> & {
		"data-state": "closed" | "open";
	};
	getWindowProps: (
		value: string,
		position: WindowPosition,
	) => Pick<
		WindowsPanelProps,
		| "animate"
		| "id"
		| "inert"
		| "initial"
		| "layout"
		| "onAnimationComplete"
		| "onLayoutAnimationComplete"
		| "onPointerDown"
		| "ref"
		| "style"
		| "transition"
		| "variants"
	> & { "data-fullscreen": boolean; "data-state": "closed" | "open" };
};

export type UseWindows = [state: UseWindowsState, actions: UseWindowsActions];

export function useWindows({ defaultOpen }: UseWindowsArgs): UseWindows {
	const id = useId();
	const [{ isPlaying }] = useIntroContext();
	// Mounted during the intro: windows wait for it to complete before appearing
	const [isWaitingForIntro] = useState(isPlaying);
	const [state, setState] = useState<State>(() => ({ defaultOpen, order: [], windows: {} }));

	/** Bounds for dragging, and what a fullscreen window fills. */
	const area = useRef<HTMLElement | null>(null);
	const panels = useRef(new Map<string, Panel>());
	const fullscreen = useRef(new Map<string, Fullscreen>());

	// Helpers
	//
	// Pure, and memoized with no dependencies so the actions built on them stay
	// stable too (the area's ref in particular: a new one would recreate its
	// resize observer).

	const getWindowState = useCallback(
		(s: State, value: string): WindowState =>
			s.windows[value] ?? {
				isFullscreen: false,
				isOpen: s.defaultOpen.includes(value),
				slot: null,
			},
		[],
	);

	const updateWindow = useCallback(
		(s: State, value: string, patch: Partial<WindowState>): State => ({
			...s,
			windows: { ...s.windows, [value]: { ...getWindowState(s, value), ...patch } },
		}),
		[getWindowState],
	);

	const moveToFront = useCallback(
		(s: State, value: string): State =>
			s.order.at(-1) === value
				? s
				: { ...s, order: [...s.order.filter((v) => v !== value), value] },
		[],
	);

	const closeWindow = useCallback(
		(s: State, value: string): State =>
			updateWindow(s, value, { isFullscreen: false, isOpen: false, slot: null }),
		[updateWindow],
	);

	const getOffset = useCallback(
		(panel: WindowPosition): Offset => ({ x: panel.x.get(), y: panel.y.get() }),
		[],
	);

	const animateOffset = useCallback((panel: WindowPosition, to: Offset) => {
		animate(panel.x, to.x, PANEL_ANIMATIONS.transition);
		animate(panel.y, to.y, PANEL_ANIMATIONS.transition);
	}, []);

	/**
	 * The offset range that keeps the whole window inside the area. If the window is
	 * bigger than the area, `clamp` favors `min`, keeping its header in view.
	 */
	const getOffsetBounds = useCallback(
		(panel: Panel, bounds: Element) => {
			const { x, y } = getOffset(panel);
			const rect = panel.element.getBoundingClientRect();
			const outer = bounds.getBoundingClientRect();

			return {
				min: { x: x - (rect.left - outer.left), y: y - (rect.top - outer.top) },
				max: { x: x + (outer.right - rect.right), y: y + (outer.bottom - rect.bottom) },
			};
		},
		[getOffset],
	);

	const getWindowID = useCallback(
		(value: string) => `${id}-window-${value.replaceAll(/\s+/g, "-")}`,
		[id],
	);

	// State
	//

	const getWindow = useCallback(
		(value: string) => getWindowState(state, value),
		[getWindowState, state],
	);

	// A window has no state entry until it's opened or closed, so only its first
	// appearance waits
	const getRevealDelay = useCallback(
		(value: string) =>
			isWaitingForIntro && !(value in state.windows)
				? Math.max(state.defaultOpen.indexOf(value), 0) * PANEL_ANIMATIONS.stagger
				: null,
		[isWaitingForIntro, state.defaultOpen, state.windows],
	);

	const getBounds = useCallback(
		(value: string) => {
			const panel = panels.current.get(value);
			return panel && area.current ? getOffsetBounds(panel, area.current) : null;
		},
		[getOffsetBounds],
	);

	const getPanelElement = useCallback(
		(value: string) => panels.current.get(value)?.element ?? null,
		[],
	);

	// Fullscreen
	//

	// While a window is fullscreen its dock is pinned as-is: every child keeps its
	// size and a fixed placeholder takes the window's. (A flexible placeholder
	// can't reproduce the dock's flex layout exactly.) Released only once the
	// window has landed back in its slot: Motion snapshots layouts during the
	// commit, so releasing earlier hands it a reflowed layout to animate from.
	const pinDock = useCallback(
		(value: string, panel: Panel): CSSProperties => {
			// Re-entering before a restore has landed: still pinned, keep the originals
			const existing = fullscreen.current.get(value);
			if (existing) {
				existing.offset = getOffset(panel);
				return existing.slot;
			}

			const dock = panel.element.parentElement;
			const isRow = !!dock && getComputedStyle(dock).flexDirection.startsWith("row");
			// Fractional sizes; offsetWidth/offsetHeight round
			const size = (element: Element) => {
				const rect = element.getBoundingClientRect();
				return isRow ? [rect.width, rect.height] : [rect.height, rect.width];
			};

			const pinned = [...(dock?.children ?? [])]
				.filter((child): child is HTMLElement => child instanceof HTMLElement)
				.map((element) => {
					const entry = { element, flex: element.style.flex };
					element.style.flex = `0 0 ${size(element)[0]}px`;
					return entry;
				});

			const [main, cross] = size(panel.element);
			const slot = { flex: `0 0 ${main}px`, [isRow ? "height" : "width"]: cross };

			fullscreen.current.set(value, { offset: getOffset(panel), pinned, slot });
			return slot;
		},
		[getOffset],
	);

	const unpinDock = useCallback((value: string) => {
		for (const { element, flex } of fullscreen.current.get(value)?.pinned ?? []) {
			element.style.flex = flex;
		}
		fullscreen.current.delete(value);
	}, []);

	const exitFullscreen = useCallback(
		(value: string, panel: Panel, offset: Offset) => {
			animateOffset(panel, offset);
			setState((s) =>
				moveToFront(updateWindow(s, value, { isFullscreen: false, slot: null }), value),
			);
		},
		[animateOffset, moveToFront, updateWindow],
	);

	// Area
	//

	const areaRef = useCallback(
		(element: HTMLElement | null) => {
			area.current = element;
			if (!element) {
				return;
			}

			// A resize leaves a fullscreen window's pinned dock stale, so once resizing
			// settles it exits, animated like Restore, back to where it was dragged.
			// Until then it just keeps filling the area. A window still landing from a
			// restore may have had its animation finished early by Motion, so it gets
			// released here too.
			let settle: ReturnType<typeof setTimeout> | undefined;
			const exitAfterResize = () => {
				for (const [value, { offset }] of fullscreen.current) {
					const panel = panels.current.get(value);
					unpinDock(value);
					if (!panel) {
						continue;
					}

					if (panel.element.dataset.fullscreen !== "true") {
						delete panel.element.dataset.resizing;
						continue;
					}

					panel.element.dataset.resizing = "";
					exitFullscreen(value, panel, offset);

					// Once it has landed: show the contents (in case Motion doesn't report the
					// animation as finished), and if its dragged spot no longer fits at the
					// new size, slide it the rest of the way inside
					setTimeout(
						() => {
							delete panel.element.dataset.resizing;

							const { x, y } = getOffset(panel);
							const { min, max } = getOffsetBounds(panel, element);
							const inside = { x: clamp(x, min.x, max.x), y: clamp(y, min.y, max.y) };
							if (inside.x !== x || inside.y !== y) {
								animateOffset(panel, inside);
							}
						},
						PANEL_ANIMATIONS.transition.duration * 1000 + 50,
					);
				}
			};

			// Also pulls dragged windows back inside when the area shrinks. Windows in
			// their slot (closed and fullscreen ones included) are where the layout put them.
			const observer = new ResizeObserver(() => {
				clearTimeout(settle);
				settle = setTimeout(exitAfterResize, RESIZE_SETTLE);

				for (const panel of panels.current.values()) {
					const { x, y } = getOffset(panel);
					if ((x === 0 && y === 0) || "dragging" in panel.element.dataset) {
						continue;
					}

					const { min, max } = getOffsetBounds(panel, element);
					panel.x.set(clamp(x, min.x, max.x));
					panel.y.set(clamp(y, min.y, max.y));
				}
			});
			observer.observe(element);

			return () => {
				observer.disconnect();
				clearTimeout(settle);
				area.current = null;
			};
		},
		[animateOffset, exitFullscreen, getOffset, getOffsetBounds, unpinDock],
	);

	// Actions
	//

	const bringToFront = useCallback(
		(value: string) => setState((s) => moveToFront(s, value)),
		[moveToFront],
	);

	const close = useCallback(
		(value: string) => setState((s) => closeWindow(s, value)),
		[closeWindow],
	);

	const reset = useCallback(
		(value: string) => {
			const panel = panels.current.get(value);
			if (panel) {
				setState((s) => moveToFront(s, value));
				animateOffset(panel, ORIGIN);
			}
		},
		[animateOffset, moveToFront],
	);

	const toggleFullscreen = useCallback(
		(value: string) => {
			const panel = panels.current.get(value);
			if (!panel) {
				return;
			}

			// Contents hide while it scales (they'd squash and stretch); cleared once it lands
			panel.element.dataset.resizing = "";

			// The offset animates alongside the layout animation, so it scales up from
			// where it is and restores to where it was dragged
			if (getWindow(value).isFullscreen) {
				exitFullscreen(value, panel, fullscreen.current.get(value)?.offset ?? ORIGIN);
				return;
			}

			const slot = pinDock(value, panel);
			animateOffset(panel, ORIGIN);
			setState((s) => moveToFront(updateWindow(s, value, { isFullscreen: true, slot }), value));
		},
		[animateOffset, exitFullscreen, getWindow, moveToFront, pinDock, updateWindow],
	);

	const toggleOpen = useCallback(
		(value: string) =>
			setState((s) =>
				getWindowState(s, value).isOpen
					? closeWindow(s, value)
					: moveToFront(updateWindow(s, value, { isOpen: true }), value),
			),
		[closeWindow, getWindowState, moveToFront, updateWindow],
	);

	// Prop getters
	//

	const getAreaProps = useCallback<UseWindowsActions["getAreaProps"]>(
		() => ({ ref: areaRef }),
		[areaRef],
	);

	/** Props for the element holding a fullscreen window's place in its dock, if it needs one. */
	const getPlaceholderProps = useCallback<UseWindowsActions["getPlaceholderProps"]>(
		(value: string) => {
			const { isFullscreen, slot } = getWindow(value);
			return isFullscreen && slot ? { "aria-hidden": true, style: slot } : null;
		},
		[getWindow],
	);

	const getTriggerProps = useCallback<UseWindowsActions["getTriggerProps"]>(
		(value: string) => {
			const { isOpen } = getWindow(value);

			return {
				"aria-controls": getWindowID(value),
				"aria-expanded": isOpen,
				"data-state": isOpen ? "open" : "closed",
				onClick: () => toggleOpen(value),
			};
		},
		[getWindow, getWindowID, toggleOpen],
	);

	const getWindowProps = useCallback<UseWindowsActions["getWindowProps"]>(
		(value: string, position: WindowPosition) => {
			const { isFullscreen, isOpen } = getWindow(value);
			const delay = getRevealDelay(value);
			// Hidden while the intro plays, then revealed
			const isShown = isOpen && !(isPlaying && delay !== null);

			return {
				id: getWindowID(value),
				ref: (element: HTMLElement | null) => {
					if (!element) {
						return;
					}

					panels.current.set(value, { element, ...position });
					return () => {
						panels.current.delete(value);
					};
				},
				"data-fullscreen": isFullscreen,
				"data-state": isShown ? "open" : "closed",
				inert: !isShown,

				// Animates size and position changes: fullscreen scales up from where the
				// window is, and back down into its slot
				layout: true,
				onLayoutAnimationComplete: () => {
					const panel = panels.current.get(value);
					if (!panel) {
						return;
					}

					delete panel.element.dataset.resizing;
					// Back in its slot (restored, or closed while fullscreen)
					if (panel.element.dataset.fullscreen !== "true") {
						unpinDock(value);
					}
				},

				// Windows open on load animate in too
				initial: "closed",
				animate: isShown ? "open" : "closed",
				variants: PANEL_ANIMATIONS.variants,
				transition: { ...PANEL_ANIMATIONS.transition, delay: delay ?? 0 },
				onAnimationComplete: (definition: unknown) => {
					// Snap back to its slot once it has zoomed out, so it reopens there
					if (definition === "closed") {
						position.x.set(0);
						position.y.set(0);
					}
				},

				onPointerDown: () => bringToFront(value),
				style: {
					x: position.x,
					y: position.y,
					zIndex: state.order.indexOf(value) + 1,
				},
			};
		},
		[bringToFront, getRevealDelay, getWindow, getWindowID, isPlaying, state, unpinDock],
	);

	return [
		{
			getRevealDelay,
			getBounds,
			getPanelElement,
			getWindow,
		},
		{
			bringToFront,
			close,
			reset,
			toggleFullscreen,
			toggleOpen,

			getAreaProps,
			getPlaceholderProps,
			getTriggerProps,
			getWindowProps,
		},
	];
}
