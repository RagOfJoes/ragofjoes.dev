import type { ComponentProps } from "react";

import { ScrollArea } from "@base-ui/react/scroll-area";
import { Maximize2Icon, Minimize2Icon, MoveIcon, RotateCcwIcon, XIcon } from "lucide-react";
import { type HTMLMotionProps, motion, useMotionValue } from "motion/react";

import { cn } from "@/lib/cn";

import { useWindowsPanelDrag } from "./use-windows-panel-drag";
import {
	useWindowHandleProps,
	useWindowsContext,
	useWindowValue,
	WindowProvider,
} from "./windows-context";

export type WindowsPanelProps = HTMLMotionProps<"figure"> & {
	value: string;
};

export function WindowsPanel({ children, className, value, ...props }: WindowsPanelProps) {
	const [, { getPlaceholderProps, getWindowProps }] = useWindowsContext();
	const placeholder = getPlaceholderProps(value);

	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const handleProps = useWindowsPanelDrag(value, { x, y });

	return (
		<WindowProvider value={{ handleProps, value }}>
			{/* Keeps the window's spot in its dock while it's fullscreen (absolute) */}
			{placeholder && <div {...placeholder} />}

			<motion.figure
				{...getWindowProps(value, { x, y })}
				className={cn(
					"group/window isolate inline-flex min-h-32 flex-col border border-foreground/70 bg-striped px-2 pb-2 text-foreground",

					"*:transition-opacity *:duration-150",

					// Fills the area. Important, since the dock sizes its children with selectors
					// that are just as specific and may come later in the stylesheet.
					"data-[fullscreen=true]:absolute data-[fullscreen=true]:inset-0 data-[fullscreen=true]:w-auto! data-[fullscreen=true]:max-w-none!",
					// Only the frame shows while fullscreen scales; contents fade back in after
					"data-resizing:*:opacity-0 data-resizing:*:transition-none",

					className,
				)}
				{...props}
			>
				{children}
			</motion.figure>
		</WindowProvider>
	);
}

export function WindowsHeader({ className, ...props }: ComponentProps<"div">) {
	const handleProps = useWindowHandleProps();

	return (
		<div
			{...props}
			{...handleProps}
			className={cn(
				"relative isolate inline-flex h-6 w-full shrink-0 cursor-grab touch-none items-center justify-between gap-2 select-none",

				// Grab area: the panel's whole top bar, out over its side padding and top
				// border, so a fingertip anywhere up there starts a drag. Kept behind the
				// header's contents (its own stacking context) so their taps still land
				"before:absolute before:-inset-x-2 before:-top-px before:bottom-0 before:-z-10",
				"group-data-[fullscreen=true]/window:cursor-default",
				"group-data-dragging/window:cursor-grabbing",

				className,
			)}
		/>
	);
}

export function WindowsTitle({ children, className, ...props }: ComponentProps<"h2">) {
	const value = useWindowValue();

	return (
		<div className="inline-flex h-full items-center gap-1">
			<MoveIcon
				className={cn(
					"size-3.5",

					"group-data-[fullscreen=true]/window:hidden",
				)}
			/>

			<h2
				{...props}
				className={cn(
					"font-mono text-xs leading-none font-semibold",

					className,
				)}
			>
				{children ?? value}
			</h2>
		</div>
	);
}

export function WindowsControls({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			{...props}
			className={cn(
				"inline-flex h-full items-center gap-1",

				className,
			)}
		/>
	);
}

export function WindowsReset() {
	const [{ getWindow }, { reset }] = useWindowsContext();
	const value = useWindowValue();

	return (
		<button
			aria-label="Reset position"
			className={cn(
				"inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full border border-foreground/50 bg-background text-foreground transition-colors",

				"disabled:cursor-not-allowed disabled:border-muted-foreground disabled:bg-muted-foreground/40 disabled:text-muted-foreground",
				"focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-hidden",
				"hover:bg-foreground hover:text-background hover:outline-hidden",
			)}
			disabled={getWindow(value).isFullscreen}
			onClick={() => reset(value)}
			type="button"
		>
			<RotateCcwIcon className="size-2.5" />
		</button>
	);
}

export function WindowsFullscreen() {
	const [{ getWindow }, { toggleFullscreen }] = useWindowsContext();
	const value = useWindowValue();

	return (
		<button
			aria-label={getWindow(value).isFullscreen ? "Restore window" : "Maximize window"}
			className={cn(
				"inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full border border-foreground/50 bg-background text-foreground transition-colors",

				"disabled:cursor-not-allowed disabled:border-muted-foreground disabled:bg-muted-foreground/40 disabled:text-muted-foreground",
				"focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-hidden",
				"hover:bg-foreground hover:text-background hover:outline-hidden",
			)}
			onClick={() => toggleFullscreen(value)}
			type="button"
		>
			<Maximize2Icon
				className={cn(
					"size-2.5",

					"group-data-[fullscreen=true]/window:hidden",
				)}
			/>
			<Minimize2Icon
				className={cn(
					"hidden size-2.5",

					"group-data-[fullscreen=true]/window:block",
				)}
			/>
		</button>
	);
}

export function WindowsClose() {
	const [, { close }] = useWindowsContext();
	const value = useWindowValue();

	return (
		<button
			aria-label="Close window"
			className={cn(
				"inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full border border-foreground/50 bg-background text-foreground transition-colors",

				"disabled:cursor-not-allowed disabled:border-muted-foreground disabled:bg-muted-foreground/40 disabled:text-muted-foreground",
				"focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-hidden",
				"hover:bg-foreground hover:text-background hover:outline-hidden",
			)}
			onClick={() => close(value)}
			type="button"
		>
			<XIcon className="size-3" />
		</button>
	);
}

export function WindowsContent({ children, className, ...props }: ComponentProps<"div">) {
	return (
		<ScrollArea.Root className="relative flex min-h-0 w-full flex-1 rounded-sm border bg-background">
			<ScrollArea.Viewport
				className={cn(
					"min-h-0 w-full overscroll-none rounded-sm",

					"focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-foreground",
				)}
			>
				<ScrollArea.Content
					{...props}
					className={cn(
						"flex flex-col gap-2 p-1 font-sans text-xs font-medium",

						// Room for the scrollbar track, only when there's one
						"data-has-overflow-y:pr-2",

						className,
					)}
				>
					{children}
				</ScrollArea.Content>
			</ScrollArea.Viewport>

			<ScrollArea.Scrollbar className="m-0.5 flex w-1 justify-center rounded-full bg-foreground/10">
				<ScrollArea.Thumb className="w-full rounded-full bg-foreground/60" />
			</ScrollArea.Scrollbar>
		</ScrollArea.Root>
	);
}
