import { For, Match, Show, Switch, createSignal, onCleanup, onMount } from "solid-js";
import type { JSX } from "solid-js";

import type { IconTypes } from "solid-icons";
import { IoMoveSharp } from "solid-icons/io";
import { VsClose, VsRefresh } from "solid-icons/vs";

import { cn } from "@/lib/cn";

import { Image } from "../image";
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
		icon: IconTypes;
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
	let ref: HTMLDivElement | undefined;

	// Prevent users from focusing on items that are not in viewport to prevent weird overflow
	const onFocusIn = (e: FocusEvent) => {
		const target = e.target as HTMLElement;
		const container = ref;

		if (!container) {
			return;
		}

		// Find which copy of the list this element is in
		const ul = target.closest("ul");
		// Find the item index within the list
		const li = target.closest("li");
		if (!ul || !li) {
			return;
		}

		const list = Array.from(container.querySelectorAll("ul"));
		const listIndex = list.indexOf(ul);

		const listItem = Array.from(ul.querySelectorAll("li"));
		const listItemIndex = listItem.indexOf(li);

		if (list.length < 2 || listIndex === -1) {
			return;
		}

		// Always focus the middle copy (index 1) to avoid edge issues
		const centerList = list[1];
		if (!centerList) {
			return;
		}

		const centerListItem = centerList.querySelectorAll("li");

		const centerListItemLink = centerListItem[listItemIndex]?.querySelector("a");
		if (centerListItemLink) {
			e.preventDefault();

			centerListItemLink.focus();
		}
	};

	return (
		<div
			class="no-scrollbar group/carousel inline-grid h-full w-full flex-1 overflow-x-scroll mask-[linear-gradient(to_right,transparent_0,#121113_10%,#121113_calc(100%-200px),transparent_100%)]"
			onFocusIn={onFocusIn}
			ref={ref}
		>
			<div class="inline-flex h-full w-full">
				<For each={Array.from({ length: 8 })}>
					{() => {
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
			)}
		>
			<For each={props.content.data}>
				{(content) => {
					return (
						<li class="inline-flex flex-col">
							<div class="inline-flex h-full w-full items-center justify-between">
								<h3 class="font-mono text-[11px]">[{content.title}]</h3>

								{content.icon({
									class: cn("text-foreground w-6 h-6 stroke-[1.25px]"),
								})}
							</div>

							<a
								class={cn(
									"w-fit font-mono text-[11px] underline",

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
								<h4 class="font-sans text-xs leading-none">{content.subtitle}</h4>
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
												<p class="font-sans text-xs">{body}</p>
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
	const parse = (text: string): JSX.Element => {
		const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
		const parts: (string | JSX.Element)[] = [];
		let lastIndex = 0;
		let match;

		while ((match = linkRegex.exec(text)) !== null) {
			// Add text before the link
			if (match.index > lastIndex) {
				parts.push(text.slice(lastIndex, match.index));
			}
			// Add the link
			parts.push(
				<a
					class={cn(
						"underline",

						"focus-visible:bg-foreground focus-visible:text-background focus-visible:no-underline focus-visible:outline-hidden",
						"hover:bg-foreground hover:text-background hover:no-underline hover:outline-hidden",
					)}
					href={match[2]}
					rel="noopener noreferrer"
					target="_blank"
				>
					{match[1]}
				</a>,
			);
			lastIndex = match.index + match[0].length;
		}

		// Add remaining text
		if (lastIndex < text.length) {
			parts.push(text.slice(lastIndex));
		}

		return <>{parts}</>;
	};

	return <span class="font-sans text-xs">{parse(props.content.data)}</span>;
}

export function Window(props: WindowProps): JSX.Element {
	const [state, actions] = useWindowsContext();

	const [containerSize, setContainerSize] = createSignal({ height: 0, width: 0 });
	const [isDragging, toggleIsDragging] = createSignal(false);
	const [offset, setOffset] = createSignal({ x: 0, y: 0 });

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

	const onClick = () => {
		actions.bringToFront(props.name);
	};
	const onEnd = () => {
		toggleIsDragging(false);
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
		if (isDragging()) {
			return;
		}

		actions.bringToFront(props.name);

		actions.updateWindowPosition(props.name, {
			x: 0,
			y: 0,
		});
	};
	const onResize = () => {
		const container = state.container();
		if (!container) {
			return;
		}

		setContainerSize({
			height: container.getBoundingClientRect().height,
			width: container.getBoundingClientRect().width,
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

	onMount(() => {
		if (typeof window === "undefined") {
			return;
		}

		window.addEventListener("resize", onResize);

		window.addEventListener("mousemove", onMove);
		window.addEventListener("mouseup", onEnd);

		window.addEventListener("touchcancel", onEnd);
		window.addEventListener("touchend", onEnd);
		window.addEventListener("touchmove", onMove, {
			passive: false,
		});

		onResize();

		onCleanup(() => {
			if (typeof window === "undefined") {
				return;
			}

			window.removeEventListener("resize", onResize);

			window.removeEventListener("mousemove", onMove);
			window.removeEventListener("mouseup", onEnd);

			window.removeEventListener("touchcancel", onEnd);
			window.removeEventListener("touchend", onEnd);
			window.removeEventListener("touchmove", onMove);
		});
	});

	return (
		<Show when={windowState().isOpen}>
			<div
				class="bg-background text-foreground absolute border px-1 pb-1 will-change-transform"
				onClick={onClick}
				style={{
					"--container-height": `${containerSize().height}px`,
					"--container-width": `${containerSize().width}px`,

					...(props.style ?? {}),

					transform: `translate(${windowState().position.x}px, ${windowState().position.y}px)`,
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
						<IoMoveSharp class="text-foreground h-3 w-3" />

						<h2 class="font-mono text-xs leading-none">{props.name}</h2>
					</div>

					<div class="inline-flex h-full items-center gap-1">
						<button
							class={cn(
								"inline-flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border",

								"focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-hidden",
							)}
							onClick={onReset}
						>
							<span class="sr-only">Reset position</span>

							<VsRefresh class="h-3 w-3" />
						</button>

						<button
							class={cn(
								"inline-flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border",

								"focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-hidden",
							)}
							onClick={() => {
								actions.toggleIsWindowOpen(props.name);
							}}
						>
							<span class="sr-only">Close</span>

							<VsClose class="h-3 w-3" />
						</button>
					</div>
				</div>

				<div class="inline-flex min-h-0 w-full flex-1 flex-col gap-2 rounded-sm border p-1">
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
			</div>
		</Show>
	);
}
