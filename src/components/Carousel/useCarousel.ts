import { createSignal } from 'solid-js';

import type { CarouselProps, UseCarousel } from './types';

const useCarousel = (props: CarouselProps): UseCarousel => {
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
};

export default useCarousel;
