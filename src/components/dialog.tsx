import { type ComponentProps, splitProps } from "solid-js";
import { Portal } from "solid-js/web";

import { Dialog as ArkDialog } from "@ark-ui/solid";
import { VsClose } from "solid-icons/vs";

import { cn } from "@/lib/cn";

export function DialogRoot(props: ArkDialog.RootProps) {
	return <ArkDialog.Root {...props} />;
}

export function DialogRootProvider(props: ArkDialog.RootProviderProps) {
	return <ArkDialog.RootProvider {...props} />;
}

export function DialogTrigger(props: ArkDialog.TriggerProps) {
	return <ArkDialog.Trigger {...props} />;
}

export function DialogBackdrop(props: ArkDialog.BackdropProps) {
	const [split, local] = splitProps(props, ["class"]);

	return (
		<ArkDialog.Backdrop
			{...local}
			class={cn(
				"bg-background/80 fixed inset-0",

				"data-[state=closed]:animate-out data-[state=closed]:fade-out",
				"data-[state=open]:animate-in data-[state=open]:fade-in",

				split.class,
			)}
		/>
	);
}

export function DialogContent(props: ArkDialog.ContentProps) {
	const [split, local] = splitProps(props, ["children", "class"]);

	return (
		<Portal>
			<DialogBackdrop />

			<ArkDialog.Positioner class="fixed inset-0 flex items-center justify-center overscroll-y-none [scrollbar-gutter:stable_both-edges]">
				<ArkDialog.Content
					{...local}
					class={cn(
						"w-auto max-w-5xl transition-all",

						"data-has-nested:scale-[calc(1-var(--nested-layer-count)*0.05)]",

						"data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-90",
						"data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-90",

						split.class,
					)}
				>
					<div class="border-foreground/70 bg-striped inline-flex h-full w-full max-w-5xl flex-col overflow-hidden border px-2 pb-2">
						{split.children}
					</div>
				</ArkDialog.Content>
			</ArkDialog.Positioner>
		</Portal>
	);
}

export function DialogCloseTrigger(props: ArkDialog.CloseTriggerProps) {
	const [split, local] = splitProps(props, ["children", "class"]);

	return (
		<ArkDialog.CloseTrigger
			{...local}
			class={cn(
				"bg-background text-foreground border-foreground/50 inline-flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors",

				"focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-hidden",
				"hover:bg-foreground hover:text-background hover:outline-hidden",

				split.class,
			)}
		>
			<span class="sr-only">Close</span>

			<VsClose class="h-3 w-3" />
		</ArkDialog.CloseTrigger>
	);
}

export function DialogHeader(props: ComponentProps<"div">) {
	const [split, local] = splitProps(props, ["children", "class"]);

	return (
		<div
			{...local}
			class={cn(
				"inline-flex h-6 w-full shrink-0 items-center justify-between",

				split.class,
			)}
		>
			<ArkDialog.Title class="font-mono text-xs leading-none font-medium">
				{split.children}
			</ArkDialog.Title>

			<DialogCloseTrigger />
		</div>
	);
}
