import { For, createEffect, createSignal } from "solid-js";

import Dialog from "@corvu/dialog";
import Drawer from "@corvu/drawer";
import { useWindowSize } from "@solid-primitives/resize-observer";
import clsx from "clsx";
import { IoCloseSharp } from "solid-icons/io";

import { Logo } from "@/components/logo";
import { useWindowScrollPosition } from "@/hooks/use-window-scroll-position";
import { ROUTES, SOCIALS } from "@/lib/constants";
import { isCurrentLink } from "@/lib/is-current-link";
import { transform } from "@/lib/transform";

export type HeaderProps = {
	url: URL;
};

export function Header(props: HeaderProps) {
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
		<header class="bg-background fixed inset-0 bottom-auto z-9999 flex justify-center border-b transition-[backdrop-filter,background-color] ease-linear">
			<div
				class={clsx(
					"flex w-full duration-120 will-change-[width,height]",

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
							"group ring-offset-background outline-hidden transition-colors duration-120 ease-linear",

							"focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
						)}
						aria-label="Go to home page"
					>
						<Logo
							class={clsx(
								"opacity-65 transition",

								"group-hover:opacity-100",
							)}
							size={40}
						/>

						<span class="sr-only">Go to home page</span>
					</a>
				</div>

				<nav
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
										aria-current={isCurrentLink(props.url, route.slug) && "page"}
										class={clsx(
											"text-foreground/45 ring-offset-background font-medium uppercase transition-colors",

											"aria-[current=page]:text-foreground",
											"focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
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
						<Dialog>
							<Dialog.Trigger
								aria-label="Open socials menu"
								class={clsx(
									"text-foreground/45 ring-offset-background font-medium uppercase transition-colors",

									"focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
									"hover:text-foreground",
								)}
							>
								Socials
							</Dialog.Trigger>

							<Dialog.Portal>
								<Dialog.Overlay class="bg-background/40 fixed inset-0 z-9999" />

								<Dialog.Content
									class={clsx(
										"bg-background ring-offset-background fixed top-1/2 left-1/2 z-9999 min-w-[320px] -translate-x-1/2 -translate-y-1/2 border p-8",

										"data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:duration-200",
										"data-open:animate-in data-open:fade-in-0 data-open:zoom-in-[85%] data-open:duration-300",
										"focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
									)}
								>
									<h1 class="mt-4 text-xl leading-none font-bold uppercase">Socials</h1>
									<h2 class="text-primary font-medium tracking-tight">Stalk me</h2>

									<ul class="mt-8 flex list-inside list-none justify-between gap-12">
										<For each={SOCIALS}>
											{(social) => (
												<li class="flex items-center">
													<a
														class={clsx(
															"text-foreground/45 ring-offset-background text-2xl font-semibold transition-colors",

															"aria-[current=page]:text-foreground",
															"focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
															"hover:text-foreground",
														)}
														href={social.href}
														rel="me noopener noreferrer"
														target="_blank"
													>
														{social.icon({
															size: 24,
														})}
													</a>
												</li>
											)}
										</For>
									</ul>

									<Dialog.Close
										class={clsx(
											"text-foreground ring-offset-background absolute top-0 right-0 flex h-10 w-10 items-center justify-center border-b border-l",

											"focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
										)}
									>
										<IoCloseSharp class="h-4 w-4" />
									</Dialog.Close>
								</Dialog.Content>
							</Dialog.Portal>
						</Dialog>
					</div>

					<div
						class={clsx(
							"flex grow items-center justify-center border-l px-8",

							"max-lg:hidden",
						)}
					>
						<a
							aria-current={isCurrentLink(props.url, "jiji") && "page"}
							class={clsx(
								"text-foreground/45 ring-offset-background font-medium uppercase transition-colors",

								"aria-[current=page]:text-foreground",
								"focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
								"hover:text-foreground",
							)}
							href="/Resume.pdf"
							rel="me noopener noreferrer"
							target="_blank"
						>
							Resume
							<span class="sr-only">Download my resume</span>
						</a>
					</div>
				</nav>

				<div
					class={clsx(
						"hidden border-l px-8",

						"max-lg:flex max-lg:basis-1/4 max-lg:items-center max-lg:justify-center",
					)}
				>
					<Drawer
						breakPoints={[1]}
						initialFocusEl={
							document.querySelector<HTMLElement>(
								'div[data-role="dialog"] a[aria-current="page"]',
							) ?? undefined
						}
					>
						{(drawerProps) => (
							<>
								<Drawer.Trigger
									aria-label={
										drawerProps.openPercentage === 1
											? "Close navigation menu"
											: "Open navigation menu"
									}
									class={clsx(
										"text-foreground/45 ring-offset-background font-medium uppercase transition-colors",

										"focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
										"hover:text-foreground",
									)}
								>
									{drawerProps.openPercentage === 1 ? "Close" : "Menu"}
								</Drawer.Trigger>

								<Drawer.Portal>
									<Drawer.Content
										class={clsx(
											"bg-background fixed inset-0 top-[calc(var(--nav-height)+1px)] z-9999 flex h-[calc(100vh-var(--nav-height))] flex-col justify-center",

											"after:absolute after:inset-x-0 after:top-[calc(100%-1px)] after:h-1/2 after:bg-inherit",
											"data-transitioning:transition-transform data-transitioning:duration-500 data-transitioning:ease-in-out",
										)}
										style={{
											"--nav-height": `${navHeight()}rem`,
										}}
									>
										<div class="bg-foreground/45 absolute top-4 h-1 w-10 self-center rounded-full" />

										<div class="bg-background grid h-full w-full overflow-y-auto p-8">
											<nav class="flex w-full flex-col justify-center gap-24">
												<ul class="flex flex-col justify-center gap-8">
													<For each={ROUTES}>
														{(route) => (
															<li class="flex items-center">
																<a
																	aria-current={isCurrentLink(props.url, route.slug) && "page"}
																	class={clsx(
																		"text-foreground/45 ring-offset-background text-4xl font-semibold uppercase transition-colors",

																		"aria-[current=page]:text-foreground",
																		"focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
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

													<li class="flex items-center">
														<a
															aria-current={isCurrentLink(props.url, "jiji") && "page"}
															class={clsx(
																"text-foreground/45 ring-offset-background text-4xl font-semibold uppercase transition-colors",

																"aria-[current=page]:text-foreground",
																"focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
																"hover:text-foreground",
															)}
															href="/Resume.pdf"
															rel="me noopener noreferrer"
															target="_blank"
														>
															Resume
															<span class="sr-only">Download my resume</span>
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
																		"text-foreground/45 ring-offset-background text-4xl font-medium transition-colors",

																		"aria-[current=page]:text-foreground",
																		"focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
																		"hover:text-foreground",
																	)}
																	href={link.href}
																	rel="me noopener noreferrer"
																	target="_blank"
																>
																	{link.icon({
																		class: "fill-foreground/45",
																		size: 24,
																	})}

																	<span class="sr-only">Go to my {link.title} profile</span>
																</a>
															</li>
														)}
													</For>
												</ul>
											</nav>
										</div>
									</Drawer.Content>
								</Drawer.Portal>
							</>
						)}
					</Drawer>
				</div>
			</div>
		</header>
	);
}
