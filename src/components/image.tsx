import { Show, createEffect, createSignal, onCleanup, onMount, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { VsClose } from "solid-icons/vs";
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
				aria-label="Zoom in image"
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
						class="bg-background/80 fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center p-4"
						exit={{ opacity: 0 }}
						initial={{ opacity: 0 }}
						onClick={onBackdropClick}
						transition={{ duration: 0.2 }}
					>
						<div class="border-foreground/70 bg-striped w-full max-w-5xl border px-2 pb-2">
							<div class="inline-flex h-6 w-full items-center justify-between">
								<h1 class="font-mono text-xs leading-none font-medium">{local.alt}</h1>

								<button
									class={cn(
										"bg-background text-foreground/70 inline-flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors",

										"focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-hidden",
										"hover:bg-foreground hover:text-background hover:outline-hidden",
									)}
									onClick={onClose}
								>
									<span class="sr-only">Close</span>

									<VsClose class="h-3 w-3" />
								</button>
							</div>

							<Motion.img
								alt={local.alt}
								animate={{ scale: 1, opacity: 1 }}
								class="max-h-full max-w-full cursor-zoom-out rounded-lg border object-contain"
								exit={{ scale: 0.9, opacity: 0 }}
								initial={{ scale: 0.9, opacity: 0 }}
								onClick={(e) => {
									e.stopPropagation();

									onClose();
								}}
								src={local.src}
								transition={{ duration: 0.3, easing: [0.4, 0, 0.2, 1] }}
							/>
						</div>
					</Motion.div>
				</Show>
			</Presence>
		</>
	);
}
