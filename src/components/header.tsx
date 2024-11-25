import { createEffect, createSignal, For, Show } from "solid-js";

import type { Options } from "@motionone/solid";
import { Motion, Presence } from "@motionone/solid";
import { useWindowSize } from "@solid-primitives/resize-observer";
import clsx from "clsx";
import { HiSolidXMark } from "solid-icons/hi";

import {
	Dialog,
	DialogContent,
	DialogPortal,
	DialogTrigger,
} from "@/components/dialog";
import { Logo } from "@/components/logo";
import { useWindowScrollPosition } from "@/hooks/use-window-scroll-position";
import { ROUTES, SOCIALS } from "@/lib/constants";
import { isCurrentLink } from "@/lib/is-current-link";
import { transform } from "@/lib/transform";

export type HeaderProps = {
	url: URL;
};

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
		<header class="bg-background fixed inset-0 bottom-auto z-[9999] flex justify-center border-b transition-[backdrop-filter,background-color] ease-linear">
			<nav
				class={clsx(
					"duration-120 flex w-full will-change-[width,height]",

					"max-md:justify-between",
				)}
				style={{
					height: `${navHeight()}rem`,
				}}
			>
				<div
					class={clsx(
						"flex basis-1/3 items-center px-8",

						"max-lg:basis-1/2",
					)}
				>
					<a
						href="/"
						class={clsx(
							"duration-120 ring-offset-background group outline-none transition-colors ease-linear",

							"focus-visible:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
						)}
						aria-label="Go to home page"
					>
						<Logo
							class={clsx(
								"opacity-40 transition",

								"group-hover:opacity-100",
							)}
							size={40}
						/>

						<span class="sr-only">Go to home page</span>
					</a>
				</div>

				<div
					class={clsx(
						"flex basis-2/3",

						"max-lg:basis-1/4",
						"max-md:hidden",
					)}
				>
					<ul
						class={clsx(
							"flex basis-1/2 items-center justify-center gap-24 border-l px-8",

							"max-lg:hidden max-lg:basis-1/3 max-lg:gap-12",
						)}
					>
						<For each={ROUTES}>
							{(route) => (
								<li class="flex items-center">
									<a
										aria-current={isCurrentLink(url, route.slug) && "page"}
										class={clsx(
											"text-muted-foreground ring-offset-background font-medium transition-colors",

											"aria-[current=page]:text-foreground",
											"focus-visible:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
											"hover:text-foreground",
										)}
										href={route.href}
									>
										{route.title}

										<span class="sr-only">{route.description}</span>
									</a>
								</li>
							)}
						</For>
					</ul>

					<div
						class={clsx(
							"flex grow items-center justify-center gap-12 border-l px-8",

							"max-lg:gap-10",
						)}
					>
						<For each={SOCIALS}>
							{(link) => (
								<a
									aria-label={`Go to my ${link.title} profile`}
									class={clsx(
										"text-muted-foreground ring-offset-background flex min-w-0 items-center justify-center font-medium transition-colors",

										"focus-visible:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
										"hover:text-foreground",
									)}
									href={link.href}
									rel="me noopener noreferrer"
									target="_blank"
								>
									{link.icon({ class: "fill-muted-foreground" })}

									<span class="sr-only">Go to my {link.title} profile</span>
								</a>
							)}
						</For>
					</div>

					<div
						class={clsx(
							"flex grow items-center justify-center border-l px-8",

							"max-lg:hidden",
						)}
					>
						<a
							class={clsx(
								"text-muted-foreground ring-offset-background font-medium transition-colors",

								"focus-visible:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
								"hover:text-foreground",
							)}
							href="/Resume.pdf"
						>
							RESUME
							<span class="sr-only">View resume</span>
						</a>
					</div>
				</div>

				<div
					class={clsx(
						"hidden border-l",

						"max-lg:flex max-lg:basis-1/4",
					)}
				>
					<Dialog
						onClose={() => {
							document.body.style.cssText = "";

							toggleIsOpen(false);
						}}
						onOpen={() => {
							document.body.style.cssText = "overflow:hidden";
							toggleIsOpen(true);
						}}
					>
						<DialogTrigger
							aria-label="Open navigation menu"
							class={clsx(
								"text-muted-foreground ring-offset-background w-full font-medium transition-colors",

								"aria-[current=page]:text-foreground",
								"focus-visible:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
								"hover:text-foreground",
							)}
						>
							<Presence exitBeforeEnter initial={false}>
								<Show
									fallback={
										<Motion.div
											{...triggerVariant}
											class="flex w-full items-center justify-center gap-2 px-8 py-0 font-medium"
										>
											<p>MENU</p>

											<svg
												fill="none"
												height="1em"
												stroke-width="0"
												stroke="currentColor"
												style="overflow: visible;"
												viewBox="0 0 24 24"
												width="1em"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													clip-rule="evenodd"
													d="M3 9a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9Zm0 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
													fill-rule="evenodd"
													fill="currentColor"
												/>
											</svg>
										</Motion.div>
									}
									when={isOpen()}
								>
									<Motion.div
										{...triggerVariant}
										class="flex w-full items-center justify-center gap-2 px-8 py-0 font-medium"
									>
										<p>CLOSE</p>

										<HiSolidXMark />
									</Motion.div>
								</Show>
							</Presence>
						</DialogTrigger>

						<DialogPortal>
							<DialogContent
								class={clsx(
									"bg-background fixed inset-0 flex w-screen overflow-y-auto",
								)}
								style={{
									height: `calc(100vh - ${navHeight()}rem)`,
									transform: `translate3d(0, ${navHeight()}rem, 0)`,
								}}
							>
								<Presence initial={false} exitBeforeEnter>
									<Show when={isOpen()}>
										<Motion.div
											class="bg-background my-auto flex w-screen flex-col justify-center gap-24 p-8"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -20 }}
											transition={{
												duration: 0.12,
											}}
										>
											<ul class="flex flex-col justify-center gap-8">
												<For each={ROUTES}>
													{(route) => (
														<li class="flex items-center">
															<a
																aria-current={
																	isCurrentLink(url, route.slug) && "page"
																}
																class={clsx(
																	"text-muted-foreground ring-offset-background text-4xl font-semibold transition-colors",

																	"aria-[current=page]:text-foreground",
																	"focus-visible:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
																	"hover:text-foreground",
																)}
																href={route.href}
															>
																{route.title}
															</a>
														</li>
													)}
												</For>

												<li class="flex items-center">
													<a
														class={clsx(
															"text-muted-foreground ring-offset-background text-4xl font-semibold transition-colors",

															"aria-[current=page]:text-foreground",
															"focus-visible:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
															"hover:text-foreground",
														)}
														href="/Resume.pdf"
													>
														RESUME
													</a>
												</li>
											</ul>

											<ul class="flex items-center justify-between gap-12 px-8">
												<For each={SOCIALS}>
													{(link) => (
														<li class="flex items-center">
															<a
																aria-label={`Go to my ${link.title} profile`}
																class={clsx(
																	"text-muted-foreground ring-offset-background text-4xl font-medium transition-colors",

																	"aria-[current=page]:text-foreground",
																	"focus-visible:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
																	"hover:text-foreground",
																)}
																href={link.href}
																rel="me noopener noreferrer"
																target="_blank"
															>
																{link.icon({
																	class: "fill-muted-foreground",
																	size: 24,
																})}

																<span class="sr-only">
																	Go to my {link.title} profile
																</span>
															</a>
														</li>
													)}
												</For>
											</ul>
										</Motion.div>
									</Show>
								</Presence>
							</DialogContent>
						</DialogPortal>
					</Dialog>
				</div>
			</nav>
		</header>
	);
}
