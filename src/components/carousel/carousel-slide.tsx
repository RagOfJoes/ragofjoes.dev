import { For } from "solid-js";

import { Motion } from "@motionone/solid";
import type { Options } from "@motionone/solid";
import clsx from "clsx";
import { BiRegularChevronLeft, BiRegularChevronRight } from "solid-icons/bi";

import { CarouselProps } from "./carousel";
import { useCarouselContext } from "./use-carousel-context";

export type CarouselSlideProps = FlatArray<CarouselProps["slides"], 1>;

export function CarouselSlide({
	background,
	description,
	image,
	tags,
	title,
	url,
}: CarouselSlideProps) {
	const [, { next, previous }] = useCarouselContext();

	return (
		<article
			lang="en"
			class={clsx(
				"absolute left-0 top-0 grid h-full w-full grid-cols-[2fr_1fr] grid-rows-[2fr_1fr]",

				"max-lg:min-h-[calc(900px+8rem)] max-lg:grid-cols-none max-lg:grid-rows-[1.5fr_repeat(3,0.75fr)_0.25fr]",
			)}
		>
			<div
				class={clsx(
					"h-full gap-4 overflow-hidden px-16 py-12",

					"max-lg:order-1 max-lg:px-8 max-lg:py-10",
				)}
			>
				<Motion.div
					animate={{
						opacity: 1,
						x: 0,
					}}
					initial={{
						opacity: 0,
						x: 40,
					}}
					class="group relative h-full w-full overflow-hidden border"
				>
					<div class="flex h-4 w-full items-center gap-1.5 border-b bg-background px-4 py-3">
						<For each={Array.from({ length: 3 })}>
							{() => (
								<span class="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
							)}
						</For>
					</div>

					<div
						class={clsx(
							"inline-flex h-[calc(100%-1.5rem)] w-full items-center justify-center overflow-hidden opacity-40 transition-opacity duration-300",

							"group-hover:opacity-100",
						)}
						style={{
							"background-color": background,
						}}
					>
						<img
							alt={title}
							class="h-full w-full object-contain object-center"
							decoding="async"
							loading="lazy"
							src={image}
						/>
					</div>

					<div class="absolute bottom-4 left-4 right-4">
						<ul
							class={clsx(
								"flex w-full flex-wrap gap-2 transition-opacity duration-300",

								"group-hover:opacity-0",
							)}
						>
							<For each={tags}>
								{(tag, index) => (
									<Motion.li
										animate={{
											opacity: 1,
											x: 0,
										}}
										initial={{
											opacity: 0,
											x: 40,
										}}
										class="border bg-background px-2 py-1 text-xs font-medium leading-none tracking-wider text-foreground"
										transition={{
											delay: 0.05 * index(),
										}}
									>
										{tag}
									</Motion.li>
								)}
							</For>
						</ul>
					</div>
				</Motion.div>
			</div>

			<div
				class={clsx(
					"flex h-full flex-col justify-end border-l px-16 py-12",

					"max-lg:order-3 max-lg:border-l-0 max-lg:border-t max-lg:px-8",
				)}
			>
				<Motion.p
					animate={{
						opacity: 1,
						y: 0,
					}}
					initial={{
						opacity: 0,
						y: 40,
					}}
					class="text-lg"
				>
					{description}
				</Motion.p>
			</div>

			<div
				class={clsx(
					"h-full w-full min-w-0 border-t",

					"max-lg:order-2",
				)}
			>
				<a
					class={clsx(
						"group h-full w-full min-w-0 overflow-hidden",

						"focus-visible:outline-none",
					)}
					href={url}
				>
					<div
						class={clsx(
							"flex h-full w-full items-center justify-between gap-4 px-16 py-8",

							"group-focus-visible:bg-foreground/5",
							"hover:bg-foreground/5",
							"max-lg:px-8",
						)}
					>
						<Motion.h1
							animate={{
								opacity: 1,
								x: 0,
							}}
							initial={{
								opacity: 0,
								x: 40,
							}}
							class={clsx(
								"text-5xl font-bold tracking-wide",

								"max-lg:text-4xl",
							)}
						>
							{title}
						</Motion.h1>

						<Motion.svg
							animate={{
								opacity: 1,
								x: 0,
							}}
							initial={{
								opacity: 0,
								x: 40,
							}}
							fill="currentcolor"
							height={40}
							stroke-width="0"
							style="overflow: visible; color: currentcolor;"
							transition={{ delay: 0.1 }}
							viewBox="0 0 24 24"
							width={40}
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M15.64 7.025h-3.622v-2h7v7h-2v-3.55l-4.914 4.914-1.414-1.414 4.95-4.95Z"
								fill="currentColor"
							/>
							<path
								d="M10.982 6.975h-6v12h12v-6h-2v4h-8v-8h4v-2Z"
								fill="currentColor"
							/>
						</Motion.svg>
					</div>
				</a>
			</div>

			<div
				class={clsx(
					"flex h-full border-l border-t",

					"max-lg:order-4 max-lg:border-b max-lg:border-l-0",
				)}
			>
				<button
					aria-label="Go to previous project"
					onClick={previous}
					class={clsx(
						"flex w-1/2 items-center justify-center transition-[width] duration-300 will-change-[width]",

						"focus-visible:w-3/5 focus-visible:bg-foreground/5 focus-visible:outline-none",
						"hover:w-3/5 hover:bg-foreground/5",
					)}
				>
					<BiRegularChevronLeft size={44} />
				</button>

				<button
					aria-label="Go to next project"
					onClick={next}
					class={clsx(
						"flex w-1/2 items-center justify-center border-l transition-[width] duration-300 will-change-[width]",

						"focus-visible:w-3/5 focus-visible:bg-foreground/5 focus-visible:outline-none",
						"hover:w-3/5 hover:bg-foreground/5",
					)}
				>
					<BiRegularChevronRight size={44} />
				</button>
			</div>
		</article>
	);
}
