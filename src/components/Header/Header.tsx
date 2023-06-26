import { createEffect, createSignal, For, Show } from "solid-js";

import type { Options } from "@motionone/solid";
import { Motion, Presence } from "@motionone/solid";
import { useWindowSize } from "@solid-primitives/resize-observer";
import clsx from "clsx";
import { HiSolidXMark } from "solid-icons/hi";

import {
	Dialog,
	DialogContainer,
	DialogContent,
	DialogPortal,
	DialogTrigger,
} from "@/components/Dialog";
import { Logo } from "@/components/Logo";
import { useWindowScrollPosition } from "@/hooks/useWindowScrollPosition";
import { ROUTES, SOCIALS } from "@/lib/constants";
import isCurrentLink from "@/lib/isCurrentLink";
import transform from "@/lib/transform";

import type { HeaderProps } from "./types";

const opacity = clsx(
	"text-rsp-subtle/60",

	// aria
	"aria-[current=page]:text-rsp-rose aria-[current=page]:opacity-100",
	// hover
	"hover:text-rsp-text"
);

const triggerVariant: Options = {
	initial: { opacity: 0, y: 10 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -10 },
	transition: {
		duration: 0.08,
	},
};

export function Header(props: HeaderProps) {
	const { url } = props;

	const [isOpen, toggleIsOpen] = createSignal(false);
	const [navHeight, setNavHeight] = createSignal(8);

	const size = useWindowSize();
	const scroll = useWindowScrollPosition();

	createEffect(() => {
		if (size.height === 0) {
			return;
		}

		const convert = transform([0, size.height], [8, 6]);
		const newHeight = convert(scroll.y);

		setNavHeight(newHeight);
	});

	return (
		<header
			class={clsx(
				"fixed inset-0 bottom-auto z-[9999] flex justify-center border-b bg-rsp-base transition-[backdrop-filter,background-color] ease-linear",

				{
					"bg-transparent backdrop-blur-lg": !isOpen(),
				}
			)}
		>
			<nav
				class={clsx(
					"duration-120 flex w-full will-change-[width,height]",

					// Medium Breakpoint
					"max-md:justify-between"
				)}
				style={{
					height: `${navHeight()}rem`,
				}}
			>
				<div
					class={clsx(
						"flex basis-1/3 items-center px-8",

						// Large Breakpoint
						"max-lg:basis-1/2"
					)}
				>
					<a
						href="/"
						class={clsx(
							"duration-120 opacity-40 transition ease-linear",

							// Hover
							"hover:opacity-100"
						)}
						aria-label="Go to home page"
					>
						<Logo size={40} />
					</a>
				</div>

				<div
					class={clsx(
						"flex basis-2/3",

						// Large Breakpoint
						"max-lg:basis-1/4",
						// Medium Breakpoint
						"max-md:hidden"
					)}
				>
					<ul
						class={clsx(
							"flex basis-1/2 items-center justify-center gap-24 border-l px-8",

							// Large Breakpoint
							"max-lg:hidden max-lg:basis-1/3 max-lg:gap-12"
						)}
					>
						<For each={ROUTES}>
							{(route) => (
								<li class="flex items-center">
									<a
										class={opacity}
										href={route.href}
										aria-current={isCurrentLink(url, route.slug) && "page"}
									>
										{route.title}
									</a>
								</li>
							)}
						</For>
					</ul>

					<ul
						class={clsx(
							"flex grow items-center justify-center gap-12 border-l px-8",

							// Large Breakpoint
							"max-lg:gap-10"
						)}
					>
						<For each={SOCIALS}>
							{(link) => (
								<li class="flex items-center">
									<a
										aria-label={`Go to my ${link.title} profile`}
										class={opacity}
										href={link.href}
										rel="me noopener noreferrer"
										target="_blank"
									>
										{link.icon({ class: "fill-rsp-subtle/60" })}
									</a>
								</li>
							)}
						</For>
					</ul>

					<div
						class={clsx(
							"flex grow items-center justify-center border-l px-8",

							// Large Breakpoint
							"max-lg:hidden"
						)}
					>
						<a href="/Resume.pdf" class={opacity}>
							RESUME
						</a>
					</div>
				</div>

				<div
					class={clsx(
						"hidden border-l",

						// Large Breakpoint
						"max-lg:flex max-lg:basis-1/4"
					)}
				>
					<Dialog
						onOpen={() => {
							document.body.style.cssText = "overflow:hidden";
							toggleIsOpen(true);
						}}
						onClose={() => {
							document.body.style.cssText = "";

							toggleIsOpen(false);
						}}
					>
						<DialogTrigger
							aria-label="Open navigation menu"
							class={clsx(opacity, "w-full")}
						>
							<Presence exitBeforeEnter initial={false}>
								<Show
									when={isOpen()}
									fallback={
										<Motion.div
											{...triggerVariant}
											class="flex w-full items-center justify-center gap-2 bg-transparent fill-rsp-subtle/60 px-8 py-0"
										>
											<p>MENU</p>

											{/* On mount solid-icons doesn't fully render icon */}
											<svg
												fill="none"
												stroke-width="0"
												xmlns="http://www.w3.org/2000/svg"
												stroke="currentColor"
												viewBox="0 0 24 24"
												height="1em"
												width="1em"
												style="overflow: visible;"
											>
												<path
													fill="currentColor"
													fill-rule="evenodd"
													d="M3 9a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9Zm0 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
													clip-rule="evenodd"
												></path>
											</svg>
										</Motion.div>
									}
								>
									<Motion.div
										{...triggerVariant}
										class="flex w-full items-center justify-center gap-2 bg-transparent px-8 py-0"
									>
										<p>CLOSE</p>

										<HiSolidXMark />
									</Motion.div>
								</Show>
							</Presence>
						</DialogTrigger>

						<DialogPortal>
							<DialogContainer
								class="fixed inset-0"
								style={{
									transform: `translate3d(0, ${navHeight()}rem, 0)`,
								}}
							>
								<DialogContent
									class={clsx("flex w-screen overflow-y-auto bg-rsp-base")}
									style={{
										height: `calc(100vh - ${navHeight()}rem)`,
									}}
								>
									<Presence initial={false} exitBeforeEnter>
										<Show when={isOpen()}>
											<Motion.div
												class="my-auto flex w-screen flex-col justify-center gap-24 bg-rsp-base p-8"
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -20 }}
												transition={{
													duration: 0.12,
												}}
											>
												<ul class="flex flex-col items-center justify-center gap-8">
													<For each={ROUTES}>
														{(route) => (
															<li class="flex items-center">
																<a
																	href={route.href}
																	aria-current={
																		isCurrentLink(url, route.slug) && "page"
																	}
																	class={clsx(
																		opacity,
																		"text-center font-sans-serif text-4xl font-black"
																	)}
																>
																	{route.title}
																</a>
															</li>
														)}
													</For>

													<li class="flex items-center">
														<a
															href="/Resume.pdf"
															class={`text-center font-sans-serif text-4xl font-black ${opacity}`}
														>
															RESUME
														</a>
													</li>
												</ul>

												<div class="flex flex-col items-center gap-8">
													<ul class="flex items-center justify-center gap-12 px-8">
														<For each={SOCIALS}>
															{(link) => (
																<li class="flex items-center">
																	<a
																		aria-label={`Go to my ${link.title} profile`}
																		class={opacity}
																		href={link.href}
																		rel="me noopener noreferrer"
																		target="_blank"
																	>
																		{link.icon({
																			class: "fill-rsp-subtle/60",
																			size: 24,
																		})}
																	</a>
																</li>
															)}
														</For>
													</ul>
												</div>
											</Motion.div>
										</Show>
									</Presence>
								</DialogContent>
							</DialogContainer>
						</DialogPortal>
					</Dialog>
				</div>
			</nav>
		</header>
	);
}
