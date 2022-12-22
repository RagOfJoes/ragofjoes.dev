/**
 * Clone of https://github.com/solidjs-community/solid-primitives/blob/main/packages/resize-observer/src/index.ts
 * Fixed to use vite's `import.meta` instead of `process.env`
 */

import {
  $PROXY,
  $TRACK,
  Accessor,
  createEffect,
  on,
  onCleanup,
} from 'solid-js';

import { makeEventListener } from '@solid-primitives/event-listener';
import { createSharedRoot } from '@solid-primitives/rootless';
import {
  asArray,
  createStaticStore,
  handleDiffArray,
  Many,
  MaybeAccessor,
} from '@solid-primitives/utils';

export type ResizeHandler = (
  rect: DOMRectReadOnly,
  element: Element,
  entry: ResizeObserverEntry
) => void;

/**
 * Instantiate a new ResizeObserver that automatically get's disposed on cleanup.
 *
 * @param callback handler called once element size changes
 * @param options ResizeObserver options
 * @returns `observe` and `unobserve` functions
 */
export function makeResizeObserver<T extends Element>(
  callback: ResizeObserverCallback,
  options?: ResizeObserverOptions
): {
  observe: (ref: T) => void;
  unobserve: (ref: T) => void;
} {
  if (import.meta.env.SSR) {
    return {
      observe: () => {},
      unobserve: () => {},
    };
  }

  const resizeObserver = new ResizeObserver(callback);
  onCleanup(resizeObserver.disconnect.bind(resizeObserver));

  return {
    observe: (ref) => resizeObserver.observe(ref, options),
    unobserve: resizeObserver.unobserve.bind(resizeObserver),
  };
}

/**
 * Create resize observer instance, listening for changes to size of the reactive {@link targets} array.
 *
 * @param targets Elements to be observed. Can be a reactive signal or store top-level array.
 * @param onResize - Function handler to trigger on element resize
 *
 * @example
 * ```tsx
 * let ref
 * createResizeObserver(() => ref, ({ width, height }, el) => {
 *   if (el === ref) console.log(width, height)
 * });
 * <div ref={ref}/>
 * ```
 */
export function createResizeObserver(
  targets: MaybeAccessor<Many<Element>>,
  onResize: ResizeHandler,
  options?: ResizeObserverOptions
): void {
  if (import.meta.env.SSR) {
    return;
  }

  const previousMap = new WeakMap<Element, { width: number; height: number }>();

  function handleObserverCallback(entries: ResizeObserverEntry[]) {
    entries.forEach((entry) => {
      const { contentRect, target } = entry;
      const width = Math.round(contentRect.width);
      const height = Math.round(contentRect.height);
      const previous = previousMap.get(target);
      if (!previous || previous.width !== width || previous.height !== height) {
        onResize(contentRect, entry.target, entry);
        previousMap.set(target, { width, height });
      }
    });
  }

  const { observe, unobserve } = makeResizeObserver(
    handleObserverCallback,
    options
  );

  let refs: Accessor<Element[]> | undefined;
  // is an signal
  if (typeof targets === 'function') {
    refs = () => asArray(targets()).slice();
  }
  // is a store array
  else if (Array.isArray(targets) && $PROXY in targets) {
    refs = () => {
      // track top-level store array
      return (targets as any)[$TRACK].slice();
    };
  }
  // is not reactive
  else {
    asArray(targets).forEach(observe);
    return;
  }

  createEffect(
    on(refs, (current, prev = []) =>
      handleDiffArray(current, prev, observe, unobserve)
    )
  );
}

/**
 * @returns object with width and height dimensions of window, page and screen.
 */
export function getWindowSize(): {
  width: number;
  height: number;
} {
  if (import.meta.env.SSR) {
    return { width: 0, height: 0 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/**
 * Creates a reactive store-like object of current width and height dimensions of window, page and screen.
 *
 * @example
 * const size = createWindowSize();
 * createEffect(() => {
 *   console.log(size.width, size.height)
 * })
 */
export function createWindowSize(): {
  readonly width: number;
  readonly height: number;
} {
  if (import.meta.env.SSR) {
    return getWindowSize();
  }

  const [size, setSize] = createStaticStore(getWindowSize());

  const updateSize = () => setSize(getWindowSize());
  makeEventListener(window, 'resize', updateSize);

  return size;
}

/**
 * Returns a reactive store-like object of current width and height dimensions of window, page and screen.
 *
 * This is a [shared root](https://github.com/solidjs-community/solid-primitives/tree/main/packages/rootless#createSharedRoot) primitive.
 *
 * @example
 * const size = useWindowSize();
 * createEffect(() => {
 *   console.log(size.width, size.height)
 * })
 */
export const useWindowSize: typeof createWindowSize =
  /* #__PURE__ */ createSharedRoot(createWindowSize);
