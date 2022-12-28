const clamp = (min: number, max: number, v: number) => {
  return Math.min(Math.max(v, min), max);
};

const mix = (min: number, max: number, progress: number) => {
  return -progress * min + progress * max + min;
};

const progress = (min: number, max: number, value: number) => {
  return max - min === 0 ? 1 : (value - min) / (max - min);
};

/**
 * Transforms value by mapping input range to output range
 *
 */
const transform = (input: number[], output: number[]) => {
  if (input.length !== output.length) {
    throw new Error('[transform]: Input must have the same length as output');
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
      clamp(0, 1, progress(input[i]!, input[i + 1]!, t))
    );
  };
};

export default transform;
