import { createSignal, onMount, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { DialogCloseTrigger } from "@ark-ui/solid";

import { cn } from "@/lib/cn";

import { DialogContent, DialogHeader, DialogRoot, DialogTrigger } from "./dialog";

export type ImageProps = JSX.ImgHTMLAttributes<HTMLImageElement> & {
	palette: [one: string, two: string, three: string, four: string, five: string];
};

export function Image(props: ImageProps) {
	const [split, local] = splitProps(props, ["class", "palette"]);

	let ref!: HTMLImageElement;

	const [isReady, toggleIsReady] = createSignal(false);

	onMount(() => {
		if (!ref.complete || ref.naturalWidth <= 0) {
			return;
		}

		toggleIsReady(true);
	});

	return (
		<DialogRoot>
			<DialogTrigger
				aria-label="Zoom in image"
				class={cn(
					"group/image relative cursor-zoom-in outline-none",

					split.class,
				)}
				data-is-loading={!isReady()}
				style={{
					"--palette-one": split.palette[0],
					"--palette-two": split.palette[1],
					"--palette-three": split.palette[2],
					"--palette-four": split.palette[3],
					"--palette-five": split.palette[4],
				}}
			>
				<img
					{...local}
					class={cn(
						"h-full w-auto object-cover opacity-0 transition-opacity duration-500 outline-none",

						"group-data-[is-loading=false]/image:opacity-100",
					)}
					onLoad={() => {
						if (isReady()) {
							return;
						}

						toggleIsReady(true);
					}}
					ref={ref}
				/>

				<div
					class={cn(
						"pointer-events-none absolute inset-0 backdrop-blur-lg transition-opacity duration-500",

						"group-data-[is-loading=false]/image:opacity-0",
					)}
					style={{
						"background-color": "var(--palette-five)",
						"background-image": [
							"radial-gradient(ellipse at 20% 20%, var(--palette-one) 0%, transparent 60%)",
							"radial-gradient(ellipse at 80% 15%, var(--palette-two) 0%, transparent 55%)",
							"radial-gradient(ellipse at 75% 80%, var(--palette-three) 0%, transparent 60%)",
							"radial-gradient(ellipse at 15% 85%, var(--palette-four) 0%, transparent 55%)",
						].join(", "),
					}}
				/>
			</DialogTrigger>

			<DialogContent class="group/dialog-image max-h-[90dvh] overflow-hidden pb-2">
				<DialogHeader>{local.alt}</DialogHeader>

				<div class="bg-background h-full w-full overflow-hidden rounded-lg border">
					<DialogCloseTrigger class="block h-full min-h-0 cursor-zoom-out">
						<img alt={local.alt} class="max-h-[80dvh] max-w-full" src={local.src} />
					</DialogCloseTrigger>
				</div>
			</DialogContent>
		</DialogRoot>
	);
}
