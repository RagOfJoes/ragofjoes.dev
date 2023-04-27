import { For } from "solid-js";

import { Motion } from "@motionone/solid";
import type { Options } from "@motionone/solid";
import clsx from "clsx";
import { OcArrowleft2, OcArrowright2 } from "solid-icons/oc";

import { useCarouselContext } from "./Context";
import type { CarouselSlideProps } from "./types";

const horizontalVariants: Options = {
	initial: {
		opacity: 0,
		x: 40,
	},
	animate: {
		opacity: 1,
		x: 0,
	},
	exit: {
		opacity: 0,
		x: -80,
	},
};

const verticalVariants: Options = {
	initial: {
		opacity: 0,
		y: 40,
	},
	animate: {
		opacity: 1,
		y: 0,
	},
	exit: {
		opacity: 0,
		y: -80,
	},
};

export function CarouselSlide(props: CarouselSlideProps) {
	const { description, image, tags, title, url } = props;

	const [, { next, previous }] = useCarouselContext();

	return (
		<article
			lang="en"
			class={clsx(
				"absolute left-0 top-0 grid h-full w-full grid-cols-[2fr_1fr] grid-rows-[2fr_1fr]",

				// Large Breakpoint
				"max-lg:min-h-[calc(900px+8rem)] max-lg:grid-cols-none max-lg:grid-rows-[1.5fr_repeat(3,0.75fr)_0.25fr]"
			)}
		>
			<div
				class={clsx(
					"flex h-full flex-col items-center justify-center gap-4 px-16 py-12",

					// Large Breakpoint
					"max-lg:order-1 max-lg:px-8 max-lg:py-10"
				)}
			>
				<Motion.div
					{...horizontalVariants}
					class="relative h-full w-full overflow-hidden rounded-[10px] border"
				>
					<div class="flex h-4 w-full items-center gap-1.5 bg-rsp-surface px-4 py-3">
						<For each={Array.from({ length: 3 })}>
							{() => <span class="h-2.5 w-2.5 rounded-full bg-rsp-muted/30" />}
						</For>
					</div>

					<div
						class={clsx(
							"h-full w-full bg-cover bg-center object-cover opacity-40 transition-opacity duration-300",

							// Hover
							"hover:opacity-100"
						)}
						style={{
							"background-image": `url(${image})`,
						}}
					/>
				</Motion.div>

				<div class="flex w-full flex-wrap gap-2">
					<For each={tags}>
						{(tag, index) => (
							<Motion.ul
								{...horizontalVariants}
								transition={{
									delay: 0.05 * index(),
								}}
								class="rounded-full border border-rsp-rose px-2 py-1"
							>
								<li class="text-xs text-rsp-rose">{tag}</li>
							</Motion.ul>
						)}
					</For>
				</div>
			</div>

			<div
				class={clsx(
					"flex h-full flex-col justify-end border-l px-16 py-12",

					// Large Breakpoint
					"max-lg:order-3 max-lg:border-l-0 max-lg:border-t max-lg:px-8"
				)}
			>
				<Motion.p {...verticalVariants} class="text-rsp-subtle">
					{description}
				</Motion.p>
			</div>

			<a
				href={url}
				class={clsx(
					"flex h-full w-full",

					// Large Breakpoint
					"max-lg:order-2"
				)}
			>
				<div
					class={clsx(
						"flex h-full w-full items-center justify-between gap-4 border-t px-16 py-8",

						// Hover
						"hover:bg-rsp-muted/10",

						// Large Breakpoint
						"max-lg:px-8"
					)}
				>
					<Motion.h1
						{...horizontalVariants}
						class={clsx(
							"font-sans-serif text-5xl font-black",

							// Large Breakpoint
							"max-lg:text-4xl"
						)}
					>
						{title}
					</Motion.h1>

					<Motion.svg
						{...horizontalVariants}
						transition={{ delay: 0.1 }}
						width={40}
						height={40}
						stroke-width="0"
						fill="currentColor"
						viewBox="0 0 16 16"
						style="overflow: visible;"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							d="M10.604 1h4.146a.25.25 0 01.25.25v4.146a.25.25 0 01-.427.177L13.03 4.03 9.28 7.78a.75.75 0 01-1.06-1.06l3.75-3.75-1.543-1.543A.25.25 0 0110.604 1zM3.75 2A1.75 1.75 0 002 3.75v8.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 12.25v-3.5a.75.75 0 00-1.5 0v3.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-8.5a.25.25 0 01.25-.25h3.5a.75.75 0 000-1.5h-3.5z"
						></path>
					</Motion.svg>
				</div>
			</a>

			<div
				class={clsx(
					"flex h-full border-l border-t",

					// Large Breakpoint
					"max-lg:order-4 max-lg:border-b max-lg:border-l-0"
				)}
			>
				<Motion.button
					aria-label="Go to previous project"
					initial={{ width: "50%" }}
					hover={{ width: "60%" }}
					animate={{ width: "50%" }}
					onClick={previous}
					class={clsx(
						"flex items-center justify-center",

						// Hover
						"hover:bg-rsp-muted/10"
					)}
				>
					<OcArrowleft2 size={44} />
				</Motion.button>

				<Motion.button
					aria-label="Go to next project"
					initial={{ width: "50%" }}
					hover={{ width: "60%" }}
					animate={{ width: "50%" }}
					onClick={next}
					class={clsx(
						"flex items-center justify-center border-l",

						// Hover
						"hover:bg-rsp-muted/10"
					)}
				>
					<OcArrowright2 size={44} />
				</Motion.button>
			</div>
		</article>
	);
}
