function clamp(min: number, max: number, v: number) {
	return Math.min(Math.max(v, min), max);
}

function mix(min: number, max: number, percentage: number) {
	return -percentage * min + percentage * max + min;
}

function progress(min: number, max: number, value: number) {
	return max - min === 0 ? 1 : (value - min) / (max - min);
}

/**
 * Transforms value by mapping input range to output range
 */
export function transform(input: number[], output: number[]) {
	if (input.length !== output.length) {
		throw new Error("[transform]: Input must have the same length as output");
	}

	return (t: number) => {
		let i = 0;
		for (; i < output.length - 2; i += 1) {
			if (t < input[i + 1]!) {
				break;
			}
		}

		return mix(
			output[i]!,
			output[i + 1]!,
			clamp(0, 1, progress(input[i]!, input[i + 1]!, t)),
		);
	};
}
