import { createContext } from "@/lib/create-context";

import type { UseCarousel } from "./use-carousel";

export const [CarouselProvider, useCarouselContext] = createContext<UseCarousel>({
	name: "CarouselContext",
	strict: true,
});
