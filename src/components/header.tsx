import { createEffect, createSignal, For } from "solid-js";

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
	const { url } = props;

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
		<header class="fixed inset-0 bottom-auto z-[9999] flex justify-center border-b bg-background transition-[backdrop-filter,background-color] ease-linear">
			<div
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
							"duration-120 group outline-none ring-offset-background transition-colors ease-linear",

							"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
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
										aria-current={isCurrentLink(url, route.slug) && "page"}
										class={clsx(
											"font-medium text-foreground/45 ring-offset-background transition-colors",

											"aria-[current=page]:text-foreground",
											"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
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
									"font-medium uppercase text-foreground/45 ring-offset-background transition-colors",

									"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
									"hover:text-foreground",
								)}
							>
								Socials
							</Dialog.Trigger>

							<Dialog.Portal>
								<Dialog.Overlay class="fixed inset-0 z-[9999] bg-background/40" />

								<Dialog.Content
									class={clsx(
										"fixed left-1/2 top-1/2 z-[9999] min-w-[320px] -translate-x-1/2 -translate-y-1/2 border bg-background p-8 ring-offset-background",

										"data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:slide-out-to-left-1/2 data-[closed]:slide-out-to-bottom-2 data-[closed]:duration-200",
										"data-[open]:animate-in data-[open]:fade-in-0 data-[open]:slide-in-from-left-1/2 data-[open]:slide-in-from-bottom-4 data-[open]:duration-300",
										"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
									)}
								>
									<h1 class="mt-4 text-xl font-bold uppercase leading-none">
										Socials
									</h1>
									<h2 class="font-medium tracking-tight text-primary">
										Stalk me
									</h2>

									<ul class="mt-8 flex list-inside list-none justify-between gap-12">
										{SOCIALS.map((social) => (
											<li class="flex items-center">
												<a
													class={clsx(
														"text-2xl font-semibold text-foreground/45 ring-offset-background transition-colors",

														"aria-[current=page]:text-foreground",
														"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
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
										))}
									</ul>

									<Dialog.Close
										class={clsx(
											"absolute right-0 top-0 flex h-10 w-10 items-center justify-center border-b border-l text-foreground ring-offset-background",

											"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
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
							class={clsx(
								"font-medium text-foreground/45 ring-offset-background transition-colors",

								"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
								"hover:text-foreground",
							)}
							href="/Resume.pdf"
							rel="me noopener noreferrer"
							target="_blank"
						>
							RESUME
							<span class="sr-only">View resume</span>
						</a>
					</div>
				</nav>

				<div
					class={clsx(
						"hidden border-l",

						"max-lg:flex max-lg:basis-1/4",
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
										drawerProps.open
											? "Close navigation menu"
											: "Open navigation menu"
									}
									class={clsx(
										"w-full px-8 font-medium uppercase text-foreground/45 ring-offset-background transition-colors",

										"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
										"hover:text-foreground",
									)}
								>
									{drawerProps.open ? "Close" : "Menu"}
								</Drawer.Trigger>

								<Drawer.Portal>
									<Drawer.Content
										class={clsx(
											"fixed inset-0 top-[calc(var(--nav-height)_+_1px)] z-[9999] flex h-[calc(100vh_-_var(--nav-height))] flex-col justify-center bg-background",

											"after:absolute after:inset-x-0 after:top-[calc(100%-1px)] after:h-1/2 after:bg-inherit",
											"data-[transitioning]:transition-transform data-[transitioning]:duration-500 data-[transitioning]:ease-in-out",
										)}
										style={{
											"--nav-height": `${navHeight()}rem`,
										}}
									>
										<div class="absolute top-4 h-1 w-10 self-center rounded-full bg-foreground/45" />

										<div class="grid h-full w-full overflow-y-auto bg-background p-8">
											<nav class="flex w-full flex-col justify-center gap-24">
												<ul class="flex flex-col justify-center gap-8">
													<For each={ROUTES}>
														{(route) => (
															<li class="flex items-center">
																<a
																	aria-current={
																		isCurrentLink(url, route.slug) && "page"
																	}
																	class={clsx(
																		"text-4xl font-semibold text-foreground/45 ring-offset-background transition-colors",

																		"aria-[current=page]:text-foreground",
																		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
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
																"text-4xl font-semibold text-foreground/45 ring-offset-background transition-colors",

																"aria-[current=page]:text-foreground",
																"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
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
																		"text-4xl font-medium text-foreground/45 ring-offset-background transition-colors",

																		"aria-[current=page]:text-foreground",
																		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
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

																	<span class="sr-only">
																		Go to my {link.title} profile
																	</span>
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
