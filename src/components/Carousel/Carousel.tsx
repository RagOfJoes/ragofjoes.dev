import { Show } from 'solid-js';

import { Presence } from '@motionone/solid';

import Rerun from '../Rerun';
import CarouselSlide from './CarouselSlide';
import { CarouselProvider } from './Context';
import type { CarouselProps } from './types';
import useCarousel from './useCarousel';
import addEventListener from '@/lib/addEventListener';

const Carousel = (props: CarouselProps) => {
  const context = useCarousel(props);

  if (!import.meta.env.SSR) {
    addEventListener(window, 'keydown', (e: KeyboardEvent) => {
      switch (e.key) {
        case 'h':
        case 'ArrowLeft':
          context.previous();
          break;
        case 'l':
        case 'ArrowRight':
          context.next();
          break;
        default:
          break;
      }
    });
  }

  return (
    <CarouselProvider value={context}>
      <div class="relative h-screen overflow-y-visible pt-32">
        <Presence initial={false} exitBeforeEnter>
          <Rerun on={context.current()}>
            <div class="relative h-full overflow-y-visible">
              {props.slides.map((slide, index) => {
                return (
                  <Show when={index === context.current()}>
                    <CarouselSlide
                      url={slide.url}
                      tags={slide.tags}
                      image={slide.image}
                      title={slide.title}
                      description={slide.description}
                    />
                  </Show>
                );
              })}
            </div>
          </Rerun>
        </Presence>
      </div>
    </CarouselProvider>
  );
};

export default Carousel;
