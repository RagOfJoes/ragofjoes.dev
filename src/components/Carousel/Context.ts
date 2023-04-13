import { createContext } from "@/lib/createContext";

import type { UseCarousel } from "./types";

export const [CarouselProvider, useCarouselContext] =
	createContext<UseCarousel>({
		strict: true,
		name: "CarouselContext",
	});
