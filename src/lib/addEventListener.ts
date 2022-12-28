import { onRootCleanup } from '@solid-primitives/utils';

const addEventListener = <
  T extends Window | Document | HTMLElement | EventTarget
>(
  obj: T,
  ...args: Parameters<T['addEventListener']> | [string, Function | null, ...any]
): void => {
  obj.addEventListener(
    ...(args as Parameters<HTMLElement['addEventListener']>)
  );

  onRootCleanup(() => {
    obj.removeEventListener(
      ...(args as Parameters<HTMLElement['addEventListener']>)
    );
  });
};

export default addEventListener;