import type { JSX } from "solid-js";
import { For, createSignal, onCleanup, onMount, splitProps } from "solid-js";

import { Image } from "@/components/image";
import { cn } from "@/lib/cn";

const NUM_OF_COPIES = 4;

export type ProjectInfiniteScrollProps = JSX.HTMLAttributes<HTMLDivElement> & {
	project: {
		name: string;
		slug: string;
		description: string;

		type: string;
		url: string;
		source?: string;
		developer: string;
		stack: string[];

		images: {
			alt: string;
			src: string;

			height: number;
			width: number;

			palette: [one: string, two: string, three: string, four: string, five: string];
		}[];
	};
};

export function ProjectInfiniteScroll(props: ProjectInfiniteScrollProps) {
	const [local, split] = splitProps(props, ["class", "project"]);

	let raf: number | undefined;
	let ref: HTMLDivElement | undefined;

	const [isAdjusting, toggleIsAdjusting] = createSignal(false);

	onMount(() => {
		if (!ref) {
			return;
		}

		const onScroll = () => {
			if (isAdjusting()) {
				return;
			}

			const { scrollTop, scrollHeight } = ref;
			const contentHeight = scrollHeight / NUM_OF_COPIES;

			if (scrollTop >= contentHeight) {
				toggleIsAdjusting(true);

				ref.scrollTop = scrollTop - contentHeight;

				raf = requestAnimationFrame(() => {
					toggleIsAdjusting(false);
				});
			} else if (scrollTop < contentHeight) {
				toggleIsAdjusting(true);
				ref.scrollTop = scrollTop + contentHeight;

				raf = requestAnimationFrame(() => {
					toggleIsAdjusting(false);
				});
			}
		};

		ref.addEventListener("scroll", onScroll, { passive: true });

		toggleIsAdjusting(true);
		ref.scrollTop = ref.scrollHeight / NUM_OF_COPIES;

		raf = requestAnimationFrame(() => {
			toggleIsAdjusting(false);
		});

		onCleanup(() => {
			ref.removeEventListener("scroll", onScroll);

			if (raf) {
				cancelAnimationFrame(raf);
			}
		});
	});

	return (
		<div
			{...split}
			class={cn(
				"no-scrollbar overflow-y-auto overscroll-none [overflow-anchor:none]",

				local.class,
			)}
			ref={ref}
		>
			<For each={Array.from({ length: NUM_OF_COPIES })}>
				{(_, i) => {
					const isVisible = () => {
						return i() === 1;
					};
					return (
						<div
							aria-hidden={isVisible()}
							class={cn(
								"grid grid-cols-2 gap-1",

								"not-first:mt-1",
							)}
						>
							<For each={local.project.images}>
								{(image, j) => {
									const isFirstImage = () => {
										return j() === 0;
									};

									return (
										<div class="bg-foreground/10 col-span-1 flex aspect-square items-center justify-center p-4">
											<Image
												alt={image.alt}
												class="select-none"
												decoding="async"
												fetchpriority={isFirstImage() && isVisible() ? "high" : "low"}
												height={image.height}
												loading={isFirstImage() && isVisible() ? "eager" : "lazy"}
												palette={image.palette}
												src={image.src}
												width={image.width}
											/>
										</div>
									);
								}}
							</For>
						</div>
					);
				}}
			</For>
		</div>
	);
}
