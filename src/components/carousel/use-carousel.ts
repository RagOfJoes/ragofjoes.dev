import type { Accessor } from "solid-js";
import { createSignal } from "solid-js";

import type { CarouselProps } from "./carousel";

export type UseCarousel = [
	state: {
		current: Accessor<number>;
	},
	actions: {
		next: () => void;
		previous: () => void;
	},
];

export function useCarousel(props: CarouselProps): UseCarousel {
	const [current, setCurrent] = createSignal(0);

	const next = () => {
		if (current() === props.slides.length - 1) {
			setCurrent(0);
			return;
		}

		setCurrent(current() + 1);
	};
	const previous = () => {
		if (current() === 0) {
			setCurrent(props.slides.length - 1);
			return;
		}

		setCurrent(current() - 1);
	};

	return [{ current }, { next, previous }];
}
