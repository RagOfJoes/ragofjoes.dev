import { For, Match, Show, Switch, createEffect, createSignal, onCleanup, onMount } from "solid-js";
import type { JSX } from "solid-js";

import { IoMoveSharp } from "solid-icons/io";
import { VsClose, VsRefresh, VsScreenFull, VsScreenNormal } from "solid-icons/vs";

import { Image } from "@/components/image";
import { TokenRenderer } from "@/components/token-renderer";
import { cn } from "@/lib/cn";
import { Parser } from "@/lib/parser";

import { useWindowsContext } from "./windows-context";

type WindowCarouselContent = {
	type: "carousel";
	data: {
		title: string;
		href: string;
		image: {
			src: string;
			height: number;
			width: number;

			palette: [one: string, two: string, three: string, four: string, five: string];
		};
	}[];
};

type WindowLinksContent = {
	type: "links";
	data: {
		href: string;
		title: string;
		description?: string;
	}[];
};

type WindowListContent = {
	type: "list";
	data: {
		title: string;
		subtitle?: string;
		heading?: string;
		subheading?: string;
		body: string[];
	}[];
};

type WindowTextContent = {
	type: "text";
	data: string;
};

type WindowContent =
	| WindowCarouselContent
	| WindowLinksContent
	| WindowListContent
	| WindowTextContent;

export type WindowProps = JSX.HTMLAttributes<HTMLDivElement> & {
	name: string;
	content: WindowContent[];

	style?: JSX.CSSProperties;
};

export function WindowCarousel(props: { content: WindowCarouselContent }): JSX.Element {
	return (
		<div class="no-scrollbar group/carousel inline-grid h-full w-full flex-1 overflow-x-visible mask-[linear-gradient(to_right,transparent_0,#5b89ff_10%,#5b89ff_calc(100%-200px),transparent_100%)]">
			<div class="inline-flex h-full w-full">
				<For each={Array.from({ length: 8 })}>
					{(_, i) => {
						return (
							<ul
								class={cn(
									"animate-slide-left flex h-full shrink-0 items-center gap-1 will-change-transform",

									"group-focus-visible/carousel:paused",
									"group-focus-within/carousel:paused",
									"group-hover/carousel:paused",
								)}
							>
								<For each={props.content.data}>
									{(slide) => {
										return (
											<li
												class={cn(
													"select-none",

													"first:ml-1",
												)}
											>
												<a
													class={cn(
														"flex h-full items-center gap-1 opacity-60",

														"focus-visible:opacity-100 focus-visible:outline-hidden",
														"hover:opacity-100",
													)}
													href={slide.href}
													tabIndex={i() !== 2 ? "-1" : 0}
												>
													<Image
														alt={slide.title}
														class="h-20 w-auto"
														decoding="async"
														fetchpriority="low"
														height={slide.image.height}
														loading="lazy"
														palette={slide.image.palette}
														src={slide.image.src}
														width={slide.image.width}
													/>
												</a>
											</li>
										);
									}}
								</For>
							</ul>
						);
					}}
				</For>
			</div>
		</div>
	);
}

export function WindowLinks(props: { content: WindowLinksContent }): JSX.Element {
	return (
		<ul
			class={cn(
				"ring-offset-background no-scrollbar inline-flex h-full max-h-66 flex-col gap-1 overflow-y-auto",

				"focus-visible:ring-foreground focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
				"group-data-[is-fullscreen=true]/window:max-h-full",
			)}
		>
			<For each={props.content.data}>
				{(content) => {
					return (
						<li
							class={cn(
								"inline-flex flex-col gap-1 pb-2",

								"not-last:border-b",
							)}
						>
							<h3 class="font-mono text-[11px] font-semibold">[{content.title}]</h3>

							<a
								class={cn(
									"w-fit font-mono text-[11px] font-medium underline",

									"focus-visible:bg-foreground focus-visible:text-background focus-visible:no-underline focus-visible:outline-hidden",
									"hover:bg-foreground hover:text-background hover:no-underline hover:outline-hidden",
								)}
								href={content.href}
								rel="me noopener noreferrer"
								target="_blank"
							>
								{content.href}
							</a>
						</li>
					);
				}}
			</For>
		</ul>
	);
}

export function WindowList(props: { content: WindowListContent }): JSX.Element {
	return (
		<ul
			class={cn(
				"ring-offset-background no-scrollbar inline-flex h-full max-h-66 flex-col gap-2 overflow-y-auto",

				"focus-visible:ring-foreground focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
				"group-data-[is-fullscreen=true]/window:max-h-full",
			)}
		>
			<For each={props.content.data}>
				{(content) => {
					return (
						<li
							class={cn(
								"inline-flex flex-col pb-2",

								"not-last:border-b",
							)}
						>
							<h3 class="font-sans leading-none font-semibold">{content.title}</h3>

							{content.subtitle && (
								<h4 class="text-muted-foreground font-sans text-xs leading-none font-medium">
									{content.subtitle}
								</h4>
							)}
							{content.heading && (
								<div class="bg-foreground text-background mt-1 inline-flex h-full w-fit items-center p-0.5">
									<span class="font-mono text-[10px] leading-none font-bold">
										{content.heading}
									</span>
								</div>
							)}

							<ul class="mt-2 inline-flex flex-col gap-2">
								<For each={content.body}>
									{(body) => {
										return (
											<li>
												<p class="font-sans text-xs font-medium">{body}</p>
											</li>
										);
									}}
								</For>
							</ul>
						</li>
					);
				}}
			</For>
		</ul>
	);
}

export function WindowText(props: { content: WindowTextContent }): JSX.Element {
	const tokens = () => {
		return new Parser(props.content.data).parse();
	};

	return (
		<span class="font-sans text-xs font-medium">
			<For each={tokens()}>
				{(token) => {
					return <TokenRenderer token={token} />;
				}}
			</For>
		</span>
	);
}

export function Window(props: WindowProps): JSX.Element {
	const [state, actions] = useWindowsContext();

	const [isDragging, toggleIsDragging] = createSignal(false);
	const [isFullscreen, toggleIsFullscreen] = createSignal(false);
	const [isResetting, toggleIsResetting] = createSignal(false);
	const [isVisible, toggleIsVisible] = createSignal(false);
	const [offset, setOffset] = createSignal({ x: 0, y: 0 });
	const [previousPosition, setPreviousPosition] = createSignal({ x: 0, y: 0 });

	const windowState = () => {
		return state.windows().find((w) => {
			return w.name === props.name;
		})!;
	};

	const getCoordinate = (e: MouseEvent | TouchEvent): { x: number; y: number } => {
		if ("touches" in e) {
			if (!e.touches[0]) {
				return {
					x: 0,
					y: 0,
				};
			}

			return { x: e.touches[0].clientX, y: e.touches[0].clientY };
		}

		return { x: e.clientX, y: e.clientY };
	};

	const onAnimationEnd = () => {
		if (windowState().isOpen) {
			return;
		}

		toggleIsVisible(false);
	};
	const onClick = () => {
		actions.bringToFront(props.name);
	};
	const onClose = () => {
		actions.toggleIsWindowOpen(props.name);

		toggleIsFullscreen(false);
		actions.updateWindowPosition(props.name, previousPosition());
	};
	const onEnd = () => {
		toggleIsDragging(false);
	};
	const onFullscreen = () => {
		actions.bringToFront(props.name);

		if (isFullscreen()) {
			toggleIsFullscreen(false);

			actions.updateWindowPosition(props.name, previousPosition());
			return;
		}

		setPreviousPosition(windowState().position);
		toggleIsFullscreen(true);

		const initialLeft = parseFloat(props.style?.left?.toString() ?? "0");
		const initialTop = parseFloat(props.style?.top?.toString() ?? "0");
		actions.updateWindowPosition(props.name, {
			x: -initialLeft,
			y: -initialTop,
		});
	};
	const onMove = (e: MouseEvent | TouchEvent) => {
		if (!isDragging()) {
			return;
		}

		const coordinate = getCoordinate(e);

		actions.updateWindowPosition(props.name, {
			x: coordinate.x - offset().x,
			y: coordinate.y - offset().y,
		});
	};
	const onReset = () => {
		if (isDragging() || isFullscreen()) {
			return;
		}

		toggleIsResetting(true);

		actions.bringToFront(props.name);
		actions.updateWindowPosition(props.name, {
			x: 0,
			y: 0,
		});
	};
	const onStart = (e: MouseEvent | TouchEvent) => {
		toggleIsDragging(true);

		actions.bringToFront(props.name);

		const coordinate = getCoordinate(e);
		setOffset({
			x: coordinate.x - windowState().position.x,
			y: coordinate.y - windowState().position.y,
		});
	};
	const onTransitionEnd = (e: TransitionEvent) => {
		if (e.propertyName !== "translate" && e.propertyName !== "transform") {
			return;
		}

		toggleIsResetting(false);
	};

	createEffect(() => {
		if (!windowState().isOpen) {
			return;
		}

		toggleIsVisible(true);
	});

	onMount(() => {
		if (typeof window === "undefined") {
			return;
		}

		window.addEventListener("mousemove", onMove);
		window.addEventListener("mouseup", onEnd);

		window.addEventListener("touchcancel", onEnd);
		window.addEventListener("touchend", onEnd);
		window.addEventListener("touchmove", onMove, {
			passive: false,
		});

		onCleanup(() => {
			if (typeof window === "undefined") {
				return;
			}

			window.removeEventListener("mousemove", onMove);
			window.removeEventListener("mouseup", onEnd);

			window.removeEventListener("touchcancel", onEnd);
			window.removeEventListener("touchend", onEnd);
			window.removeEventListener("touchmove", onMove);
		});
	});

	return (
		<Show when={isVisible()}>
			<figure
				class={cn(
					"bg-background group/window text-foreground border-foreground/70 bg-striped absolute isolate inline-flex flex-col border px-2 pb-2 transition-[height,width,max-height,max-width] will-change-transform",

					"data-[is-fullscreen=false]:translate-x-(--position-x) data-[is-fullscreen=false]:translate-y-(--position-y)",
					"data-[is-open=false]:animate-out data-[is-open=false]:fade-out data-[is-open=false]:zoom-out-90 data-[is-open=false]:transition-[opacity,scale] data-[is-open=false]:ease-in-out",
					"data-[is-open=true]:animate-in data-[is-open=true]:fade-in data-[is-open=true]:zoom-in-90 data-[is-open=true]:transition-[opacity,scale] data-[is-open=true]:ease-in-out",
					"data-[is-resetting=true]:transition-transform data-[is-resetting=true]:duration-300 data-[is-resetting=true]:ease-in-out",
				)}
				data-is-open={windowState().isOpen}
				data-is-fullscreen={isFullscreen()}
				data-is-resetting={isResetting()}
				onAnimationEnd={onAnimationEnd}
				onClick={onClick}
				onTransitionEnd={onTransitionEnd}
				style={{
					"--position-x": `${windowState().position.x}px`,
					"--position-y": `${windowState().position.y}px`,
					...(props.style ?? {}),
					...(isFullscreen()
						? {
								left: "0px",
								top: "0px",

								"max-height": "100%",
								"max-width": "100%",
								height: "100%",
								width: "100%",
							}
						: {}),

					"z-index": windowState().zIndex,
				}}
			>
				<span class="sr-only">Window</span>

				<div
					class={cn(
						"inline-flex h-6 w-full cursor-grab touch-none items-center justify-between select-none",

						"data-[is-dragging=true]:cursor-grabbing",
					)}
					data-is-dragging={isDragging()}
					onMouseDown={onStart}
					onTouchStart={onStart}
				>
					<span class="sr-only">Drag to move</span>

					<div class="inline-flex h-full items-center gap-1">
						<IoMoveSharp class="text-foreground size-3.5" />

						<h2 class="font-mono text-xs leading-none font-semibold">{props.name}</h2>
					</div>

					<div class="inline-flex h-full items-center gap-1">
						<For
							each={[
								{
									icon: VsRefresh,
									label: "Reset position",
									onClick: onReset,
								},
								{
									icon: isFullscreen() ? VsScreenNormal : VsScreenFull,
									label: isFullscreen() ? "Minimize window" : "Maximize window",
									onClick: onFullscreen,
								},
								{
									icon: VsClose,
									label: "Close",
									onClick: onClose,
								},
							]}
						>
							{(item) => {
								return (
									<button
										aria-label={item.label}
										class={cn(
											"bg-background text-foreground border-foreground/50 inline-flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors",

											"disabled:bg-muted-foreground/40 disabled:border-muted-foreground disabled:text-muted-foreground disabled:cursor-not-allowed",
											"focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-hidden",
											"hover:bg-foreground hover:text-background hover:outline-hidden",
										)}
										disabled={isFullscreen() && item.label === "Reset position"}
										onClick={item.onClick}
									>
										<span class="sr-only">{item.label}</span>

										{item.icon({ class: cn("h-3 w-3") })}
									</button>
								);
							}}
						</For>
					</div>
				</div>

				<div class="bg-background inline-flex min-h-0 w-full flex-1 flex-col gap-2 rounded-sm border p-1">
					<For each={props.content}>
						{(content) => {
							return (
								<Switch>
									<Match when={content.type === "carousel"}>
										<WindowCarousel content={content as WindowCarouselContent} />
									</Match>
									<Match when={content.type === "links"}>
										<WindowLinks content={content as WindowLinksContent} />
									</Match>
									<Match when={content.type === "list"}>
										<WindowList content={content as WindowListContent} />
									</Match>
									<Match when={content.type === "text"}>
										<WindowText content={content as WindowTextContent} />
									</Match>
								</Switch>
							);
						}}
					</For>
				</div>
			</figure>
		</Show>
	);
}
