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
				"group/image relative block w-full outline-none",

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
					"block h-full w-auto opacity-0 transition-opacity duration-500 outline-none",

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
		</div>
	);
}
