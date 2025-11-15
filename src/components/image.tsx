import { Show, createEffect, createSignal, onCleanup, onMount, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { Motion, Presence } from "solid-motionone";

import { cn } from "@/lib/cn";

export type ImageProps = JSX.ImgHTMLAttributes<HTMLImageElement> & {
	palette: [one: string, two: string, three: string, four: string, five: string];
};

export function Image(props: ImageProps) {
	const [split, local] = splitProps(props, ["class", "palette"]);

	let ref!: HTMLImageElement;

	const [isOpen, toggleIsOpen] = createSignal(false);
	const [isReady, toggleIsReady] = createSignal(false);

	const onBackdropClick = (e: MouseEvent) => {
		if (e.target !== e.currentTarget) {
			return;
		}

		toggleIsOpen(false);
	};
	const onClose = () => {
		toggleIsOpen(false);
	};
	const onImageClick = () => {
		toggleIsOpen(true);
	};

	createEffect(() => {
		if (!isOpen()) {
			return;
		}

		const onEscapeKey = (e: KeyboardEvent) => {
			if (e.key !== "Escape") {
				return;
			}

			onClose();
		};

		document.addEventListener("keydown", onEscapeKey);

		onCleanup(() => {
			document.removeEventListener("keydown", onEscapeKey);
		});
	});

	onMount(() => {
		if (!ref.complete || ref.naturalWidth <= 0) {
			return;
		}

		toggleIsReady(true);
	});

	return (
		<>
			<div
				class={cn(
					"group/image relative cursor-pointer",

					split.class,
				)}
				data-is-loading={!isReady()}
				onClick={onImageClick}
			>
				<img
					{...local}
					class={cn(
						"h-full w-auto bg-(--palette-one) bg-cover bg-center object-cover",

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

			<Presence>
				<Show when={isOpen()}>
					<Motion.div
						animate={{ opacity: 1 }}
						class="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/90 p-4"
						exit={{ opacity: 0 }}
						initial={{ opacity: 0 }}
						onClick={onBackdropClick}
						transition={{ duration: 0.2 }}
					>
						<Motion.img
							alt={local.alt}
							animate={{ scale: 1, opacity: 1 }}
							class="max-h-full max-w-full cursor-zoom-out object-contain"
							exit={{ scale: 0.9, opacity: 0 }}
							initial={{ scale: 0.9, opacity: 0 }}
							onClick={(e) => {
								e.stopPropagation();

								onClose();
							}}
							src={local.src}
							transition={{ duration: 0.3, easing: [0.4, 0, 0.2, 1] }}
						/>
					</Motion.div>
				</Show>
			</Presence>
		</>
	);
}
