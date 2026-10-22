/**
 * Restricts `value` to the range `min`..`max`. If `max` is less than `min`,
 * `min` wins.
 */
export function clamp(value: number, min: number, max: number): number {
	return Math.max(Math.min(value, max), min);
}
