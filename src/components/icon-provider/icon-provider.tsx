import { ComponentProps } from "react";

import { LucideProvider } from "lucide-react";

export type IconProviderProps = Pick<ComponentProps<typeof LucideProvider>, "children">;

/**
 * Design-system defaults for lucide icons. strokeWidth 2 (lucide's default)
 * reads heavy next to this theme's hairline borders, so it is dialled back once
 * here rather than per icon.
 *
 * Set as a prop rather than in CSS on purpose: `stroke-width` in a stylesheet is
 * a length, so it renders at a fixed px regardless of icon size. The attribute
 * is unitless and scales with the icon's viewBox, which is what you want.
 */
export function IconProvider({ children }: IconProviderProps) {
	return <LucideProvider strokeWidth={1.5}>{children}</LucideProvider>;
}
