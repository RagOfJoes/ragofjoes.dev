import { For, Show } from "solid-js";

import { Presence } from "@motionone/solid";

import { Rerun } from "@/components/Rerun";
import addEventListener from "@/lib/addEventListener";

import { CarouselSlide } from "./CarouselSlide";
import { CarouselProvider } from "./Context";
import type { CarouselProps } from "./types";
import useCarousel from "./useCarousel";

export function Carousel(props: CarouselProps) {
	const [state, actions] = useCarousel(props);

	if (!import.meta.env.SSR) {
		addEventListener(window, "keydown", (e: KeyboardEvent) => {
			switch (e.key) {
				case "h":
				case "ArrowLeft":
					actions.previous();
					break;
				case "l":
				case "ArrowRight":
					actions.next();
					break;
				default:
					break;
			}
		});
	}

	return (
		<CarouselProvider value={[state, actions]}>
			<div class="relative h-screen pt-32">
				<Presence initial={false} exitBeforeEnter>
					<Rerun on={state.current()}>
						<div class="relative h-full">
							<For each={props.slides}>
								{(slide, i) => (
									<Show when={i() === state.current()}>
										<CarouselSlide
											url={slide.url}
											tags={slide.tags}
											image={slide.image}
											title={slide.title}
											description={slide.description}
										/>
									</Show>
								)}
							</For>
						</div>
					</Rerun>
				</Presence>
			</div>
		</CarouselProvider>
	);
}
