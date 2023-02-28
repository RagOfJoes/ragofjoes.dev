import { Accessor } from 'solid-js';

import { PROJECTS } from '@/lib/constants';

export type CarouselProps = {
  slides: typeof PROJECTS;
};

export type CarouselSlideProps = FlatArray<CarouselProps['slides'], 1>;

export type UseCarousel = [
  state: {
    current: Accessor<number>;
  },
  actions: {
    next: () => void;
    previous: () => void;
  }
];
