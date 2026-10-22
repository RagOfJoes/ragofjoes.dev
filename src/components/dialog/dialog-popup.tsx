import { type ComponentProps, useCallback } from "react";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { ScrollArea } from "@base-ui/react/scroll-area";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/cn";

import { useDialogContext } from "./dialog-context";

export type DialogPopupProps = BaseDialog.Popup.Props;

/**
 * A window over the page: same frame as the home page's windows, centred over a
 * dimmed backdrop. Zooms out of the trigger that opened it, and back into it on
 * close; without one (e.g. opened through `open`), from its own centre.
 *
 * Sets `--dialog-x`/`--dialog-y` on the trigger: the popup's centre relative to
 * the trigger's. A trigger can use them to animate in step with the popup, e.g.
 * reappearing from the popup's direction as it zooms back in.
 */
export function DialogPopup({ className, ...props }: DialogPopupProps) {
	const { trigger } = useDialogContext();

	// Runs on mount, before the first paint, so the opening zoom already starts
	// from the trigger. `offsetLeft`/`offsetTop` are the popup's laid-out spot in
	// the full-screen viewport, unaffected by the zoom's scale.
	const ref = useCallback(
		(popup: HTMLDivElement | null) => {
			if (!popup || !trigger) {
				return;
			}

			const rect = trigger.getBoundingClientRect();
			const x = rect.left + rect.width / 2 - popup.offsetLeft;
			const y = rect.top + rect.height / 2 - popup.offsetTop;
			popup.style.transformOrigin = `${x}px ${y}px`;

			if (trigger instanceof HTMLElement) {
				trigger.style.setProperty("--dialog-x", `${popup.offsetWidth / 2 - x}px`);
				trigger.style.setProperty("--dialog-y", `${popup.offsetHeight / 2 - y}px`);
			}
		},
		[trigger],
	);

	return (
		<BaseDialog.Portal>
			<BaseDialog.Backdrop
				className={cn(
					"fixed inset-0 z-50 bg-background/70 transition-opacity duration-300 ease-out",

					"data-ending-style:opacity-0",
					"data-starting-style:opacity-0",
					"motion-reduce:transition-none",
				)}
			/>

			{/* Scaled rather than the popup when a nested dialog opens: the popup's
			    transform origin is its trigger, so it would shrink towards that instead
			    of in place */}
			<BaseDialog.Viewport
				className={cn(
					"fixed inset-0 z-50 grid place-items-center overflow-hidden p-4 transition-[scale] duration-300 ease-out",

					// Steps back behind a dialog opened from it
					"data-nested-dialog-open:scale-[0.98]",
					"motion-reduce:transition-none",
				)}
			>
				<BaseDialog.Popup
					{...props}
					className={cn(
						"flex max-h-full min-h-32 w-full max-w-lg flex-col border border-foreground/70 bg-striped px-2 pb-2 text-foreground transition-[scale] duration-300 ease-out",

						// Like a window going fullscreen: only the frame shows while it zooms, and
						// the contents fade in once it lands (hidden straight away on close)
						"*:transition-opacity *:delay-300 *:duration-150",
						"data-ending-style:scale-0 data-ending-style:*:opacity-0 data-ending-style:*:transition-none",
						"data-starting-style:scale-0 data-starting-style:*:opacity-0",
						"motion-reduce:transition-none motion-reduce:*:transition-none",

						className,
					)}
					ref={ref}
				/>
			</BaseDialog.Viewport>
		</BaseDialog.Portal>
	);
}

export function DialogHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			{...props}
			className={cn(
				"inline-flex h-6 w-full shrink-0 items-center justify-between gap-2",

				className,
			)}
		/>
	);
}

export function DialogTitle({ className, ...props }: BaseDialog.Title.Props) {
	return (
		<BaseDialog.Title
			{...props}
			className={cn(
				"truncate font-mono text-xs leading-none font-semibold",

				className,
			)}
		/>
	);
}

export function DialogControls({ className, ...props }: ComponentProps<"div">) {
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

export function DialogClose({ className, ...props }: BaseDialog.Close.Props) {
	return (
		<BaseDialog.Close
			aria-label="Close dialog"
			{...props}
			className={cn(
				"inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full border border-foreground/50 bg-background text-foreground transition-colors",

				"focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-hidden",
				"hover:bg-foreground hover:text-background",

				className,
			)}
		>
			<XIcon className="size-3" />
		</BaseDialog.Close>
	);
}

export function DialogContent({ children, className, ...props }: ComponentProps<"div">) {
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
