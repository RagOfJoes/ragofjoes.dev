import { For, Show } from "solid-js";

import { VsFolder, VsFolderOpened } from "solid-icons/vs";

import { cn } from "@/lib/cn";
import { WINDOWS } from "@/lib/constants";

import { useWindows } from "./use-windows";
import { Window } from "./window";
import { WindowsProvider } from "./windows-context";

export type WindowsProps = {};

export function Windows(props: WindowsProps) {
	const value = useWindows(props);

	return (
		<WindowsProvider value={value}>
			<div class="relative h-full w-full overflow-hidden border" ref={value[1].setContainer}>
				<ul class="grid w-fit grid-cols-2 gap-2 px-2 pt-2 pb-0">
					<For each={value[0].windows()}>
						{(w) => {
							return (
								<li class="inline-flex h-full items-center">
									<button
										class={cn(
											"inline-flex cursor-pointer items-center gap-2",

											"focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-hidden",
										)}
										onClick={() => {
											value[1].toggleIsWindowOpen(w.name);
										}}
									>
										<Show fallback={<VsFolder class="h-4 w-4" />} when={w.isOpen}>
											<VsFolderOpened class="h-4 w-4" />
										</Show>
										<span class="sr-only">
											{w.isOpen ? "Close" : "Open"} {w.name} Window
										</span>
										<span class="font-sans text-sm font-medium select-none">{w.name}</span>
									</button>
								</li>
							);
						}}
					</For>
				</ul>

				<For each={WINDOWS}>
					{(w) => {
						return <Window {...w} />;
					}}
				</For>
			</div>
		</WindowsProvider>
	);
}
