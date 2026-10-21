import { type ReactNode, useCallback, useState } from "react";

import { createContext } from "@/lib/create-context";

export type IntroState = {
	/** True from the first page load until the intro is complete. */
	isPlaying: boolean;
};

export type IntroActions = {
	/** Ends the intro. Called by `AnimatedGrid` once it has drawn. */
	onIntroComplete: () => void;
};

export type UseIntro = [state: IntroState, actions: IntroActions];

// Not strict: rendered without the provider, components just skip the intro
const [Provider, useIntroContext] = createContext<UseIntro>({
	name: "IntroContext",
	hookName: "useIntroContext",
	providerName: "<IntroProvider>",
	strict: false,
	defaultValue: [{ isPlaying: false }, { onIntroComplete: () => {} }],
});

export { useIntroContext };

export type IntroProviderProps = {
	children: ReactNode;
};

/**
 * The first-load intro: the grid draws itself in, and once it's done
 * (`onIntroComplete`) the windows open. Anything mounting after that, like the
 * next page on a client-side navigation, shows right away. Plays once per
 * visit; sits above the routes so it survives navigation.
 */
export function IntroProvider({ children }: IntroProviderProps) {
	const [isPlaying, toggleIsPlaying] = useState(true);

	const onIntroComplete = useCallback(() => toggleIsPlaying(false), []);

	return <Provider value={[{ isPlaying }, { onIntroComplete }]}>{children}</Provider>;
}
