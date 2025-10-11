import { createSignal, onMount, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { cn } from "@/lib/cn";

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
		<div
			class={cn(
				"group/image relative",

				split.class,
			)}
			data-is-loading={!isReady()}
		>
			<img
				{...local}
				class={cn(
					"h-full w-auto bg-cover bg-center object-cover",
					"bg-[var(--palette-one)]",

					"group-data-[is-loading=false]/image:bg-none",
				)}
				onLoad={() => {
					if (isReady()) {
						return;
					}

					toggleIsReady(true);
				}}
				ref={ref}
				style={{
					"--palette-one": split.palette[0],
					"--palette-two": split.palette[1],
					"--palette-three": split.palette[2],
					"--palette-four": split.palette[3],
					"--palette-five": split.palette[4],
				}}
			/>

			<div
				class={cn(
					"pointer-events-none absolute top-0 left-0 h-full w-full backdrop-blur-lg transition-all duration-50",

					"group-data-[is-loading=false]/image:opacity-0",
				)}
			/>
		</div>
	);
}
