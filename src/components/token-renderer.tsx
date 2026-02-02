import { For, Match, Switch } from "solid-js";

import { cn } from "@/lib/cn";
import type { Token } from "@/lib/parser";

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
