import { For, Show } from "solid-js";

import { Presence } from "solid-motionone";

import { Rerun } from "@/components/rerun";
import { addEventListener } from "@/lib/add-event-listener";
import { PROJECTS } from "@/lib/constants";

import { CarouselSlide } from "./carousel-slide";
import { useCarousel } from "./use-carousel";
import { CarouselProvider } from "./use-carousel-context";

export type CarouselProps = {
	slides: typeof PROJECTS;
};

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
											background={slide.background}
											description={slide.description}
											image={slide.image}
											tags={slide.tags}
											title={slide.title}
											url={slide.url}
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
