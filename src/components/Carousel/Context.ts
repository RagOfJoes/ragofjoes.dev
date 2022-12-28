import type { UseCarousel } from './types';
import { createContext } from '@/lib/createContext';

export const [CarouselProvider, useCarouselContext] =
  createContext<UseCarousel>({
    strict: true,
    name: 'CarouselContext',
  });
