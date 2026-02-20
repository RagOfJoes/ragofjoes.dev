import { For, Match, Switch } from "solid-js";

import { cn } from "@/lib/cn";
import { GALLERIES } from "@/lib/constants";
import type { Token } from "@/lib/parser";

import { DialogContent, DialogHeader, DialogRoot, DialogTrigger } from "./dialog";
import { Image } from "./image";

export type TokenRendererProps = {
	token: Token;
};

export function TokenRenderer(props: TokenRendererProps) {
	return (
		<Switch>
			{/* Default */}
			<Match when={props.token.type === "text" && props.token}>
				{(token) => {
					return token().text;
				}}
			</Match>

			<Match when={props.token.type === "gallery" && props.token}>
				{(token) => {
					const gallery = () => {
						return GALLERIES[token().key]!;
					};

					return (
						<>
							<DialogRoot lazyMount>
								<DialogTrigger
									class={cn(
										"cursor-pointer underline",

										"focus-visible:bg-foreground focus-visible:text-background focus-visible:no-underline focus-visible:outline-hidden",
										"hover:bg-foreground hover:text-background hover:no-underline hover:outline-hidden",
									)}
								>
									<For each={token().children}>{(child) => <TokenRenderer token={child} />}</For>
								</DialogTrigger>

								<DialogContent class="h-full max-h-[90dvh] w-auto overflow-hidden pb-2">
									<DialogHeader>{gallery().title}</DialogHeader>

									<div
										class={cn(
											"no-scrollbar bg-background min-h-0 flex-1 overflow-y-auto overscroll-none rounded-sm border p-1",

											"focus-visible:ring-foreground focus-visible:ring-1 focus-visible:outline-hidden",
										)}
									>
										<ul
											class={cn(
												"w-full columns-4 gap-x-1",

												"max-sm:columns-2",
												"max-md:columns-3",
											)}
										>
											<For each={gallery().images}>
												{(image) => {
													return (
														<li
															class={cn(
																"bg-striped group/gallery-image mb-1 inline-flex w-full break-inside-avoid flex-col overflow-hidden rounded-sm border outline-none",

																"focus-within:ring-foreground focus-within:ring-1",
															)}
														>
															<Image
																alt={image.alt}
																decoding="async"
																loading="lazy"
																palette={image.palette}
																src={image.src}
															/>

															<p class="px-1 py-2 font-mono text-xs leading-none font-medium">
																{image.alt}
															</p>
														</li>
													);
												}}
											</For>
										</ul>
									</div>
								</DialogContent>
							</DialogRoot>
						</>
					);
				}}
			</Match>
			<Match when={props.token.type === "link" && props.token}>
				{(token) => {
					return (
						<a
							class={cn(
								"underline",

								"focus-visible:bg-foreground focus-visible:text-background focus-visible:no-underline focus-visible:outline-hidden",
								"hover:bg-foreground hover:text-background hover:no-underline hover:outline-hidden",
							)}
							href={token().href}
							rel="noopener noreferrer"
							target="_blank"
						>
							<For each={token().children}>{(child) => <TokenRenderer token={child} />}</For>
						</a>
					);
				}}
			</Match>
			<Match when={props.token.type === "strong" && props.token}>
				{(token) => {
					return (
						<strong class="font-semibold">
							<For each={token().children}>
								{(child) => {
									return <TokenRenderer token={child} />;
								}}
							</For>
						</strong>
					);
				}}
			</Match>
		</Switch>
	);
}
